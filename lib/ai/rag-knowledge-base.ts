import { createAdminSupabaseClient } from '@/lib/supabase-server';
import { GoogleGenerativeAI, GenerativeModel, EmbeddingModel } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Interface for knowledge base entry
export interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  embedding?: number[];
  source?: string;
  metadata?: any;
}

// Interface for retrieval result
export interface RetrievalResult {
  entries: KnowledgeBaseEntry[];
  query: string;
  totalResults: number;
}

/**
 * RAG Knowledge Base for retrieving relevant context for AI operations
 */
export class RAGKnowledgeBase {
  private embeddingModel: EmbeddingModel;
  private generativeModel: GenerativeModel;

  constructor() {
    this.embeddingModel = genAI.getGenerativeModel({ model: 'embedding-001' });
    this.generativeModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Add a new entry to the knowledge base
   * @param entry Knowledge base entry to add
   * @returns ID of the created entry
   */
  public async addEntry(entry: Omit<KnowledgeBaseEntry, 'id' | 'embedding'>): Promise<string> {
    try {
      // Generate embedding for the content
      const embedding = await this.generateEmbedding(entry.content);

      // Create Supabase client
      const supabase = createAdminSupabaseClient();

      // Insert the entry into the knowledge base
      const { data, error } = await supabase
        .from('knowledge_base')
        .insert({
          title: entry.title,
          content: entry.content,
          category: entry.category,
          tags: entry.tags || [],
          embedding: embedding,
          source: entry.source || null,
          metadata: entry.metadata || {},
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error adding knowledge base entry:', error);
        throw error;
      }

      return data.id;
    } catch (error) {
      console.error('Error in addEntry:', error);
      throw error;
    }
  }

  /**
   * Retrieve relevant entries from the knowledge base
   * @param query Query to search for
   * @param options Search options
   * @returns Retrieval results
   */
  public async retrieveRelevantContext(
    query: string,
    options: {
      category?: string;
      threshold?: number;
      limit?: number;
      includeTags?: string[];
    } = {}
  ): Promise<RetrievalResult> {
    try {
      // Generate embedding for the query
      const embedding = await this.generateEmbedding(query);

      // Create Supabase client
      const supabase = createAdminSupabaseClient();

      // Set default options
      const threshold = options.threshold || 0.7;
      const limit = options.limit || 5;

      // Build the query
      let dbQuery = supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit,
      });

      // Add category filter if provided
      if (options.category) {
        dbQuery = dbQuery.eq('category', options.category);
      }

      // Add tags filter if provided
      if (options.includeTags && options.includeTags.length > 0) {
        dbQuery = dbQuery.contains('tags', options.includeTags);
      }

      // Execute the query
      const { data, error } = await dbQuery;

      if (error) {
        console.error('Error retrieving knowledge base entries:', error);
        throw error;
      }

      // Map the results to the expected format
      const entries = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        category: item.category,
        tags: item.tags,
        source: item.source,
        metadata: item.metadata,
        similarity: item.similarity,
      }));

      return {
        entries,
        query,
        totalResults: entries.length,
      };
    } catch (error) {
      console.error('Error in retrieveRelevantContext:', error);
      return {
        entries: [],
        query,
        totalResults: 0,
      };
    }
  }

  /**
   * Generate embedding for text using Gemini API
   * @param text Text to generate embedding for
   * @returns Embedding vector
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const result = await this.embeddingModel.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  /**
   * Analyze sentiment with RAG context
   * @param text Text to analyze
   * @param category Category for context retrieval
   * @returns Sentiment analysis result
   */
  public async analyzeSentimentWithContext(
    text: string,
    category?: string
  ): Promise<{ score: number; analysis: string; context?: string }> {
    try {
      // Retrieve relevant context
      const contextResult = await this.retrieveRelevantContext(text, {
        category,
        threshold: 0.6,
        limit: 3,
      });

      // Extract context text
      const contextText = contextResult.entries
        .map((entry) => `${entry.title}: ${entry.content}`)
        .join('\n\n');

      // If no context found, fall back to regular sentiment analysis
      if (contextResult.entries.length === 0) {
        const prompt = `
          Analyze the sentiment of the following text and provide a score between -1 (very negative)
          and 1 (very positive), where 0 is neutral. Also provide a brief analysis of the sentiment.

          Text: "${text}"

          Format your response as JSON with the following structure:
          {
            "score": [sentiment score],
            "analysis": "[brief analysis]"
          }
        `;

        const result = await this.generativeModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        });

        const responseText = result.response.text();

        // Extract JSON from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonResponse = JSON.parse(jsonMatch[0]);
          return {
            score: jsonResponse.score,
            analysis: jsonResponse.analysis,
          };
        }

        throw new Error('Failed to parse sentiment analysis response');
      }

      // Use RAG for sentiment analysis
      const prompt = `
        You are analyzing the sentiment of a community issue report.
        Use the following context information about similar issues to inform your analysis:

        CONTEXT:
        ${contextText}

        Now, analyze the sentiment of the following text and provide a score between -1 (very negative)
        and 1 (very positive), where 0 is neutral. Also provide a brief analysis of the sentiment,
        referencing the context where relevant.

        TEXT TO ANALYZE:
        "${text}"

        Format your response as JSON with the following structure:
        {
          "score": [sentiment score],
          "analysis": "[brief analysis with context references]"
        }
      `;

      const result = await this.generativeModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      const responseText = result.response.text();

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        return {
          score: jsonResponse.score,
          analysis: jsonResponse.analysis,
          context: contextText,
        };
      }

      throw new Error('Failed to parse sentiment analysis response');
    } catch (error) {
      console.error('Error in analyzeSentimentWithContext:', error);
      return {
        score: 0,
        analysis: 'Failed to analyze sentiment with context',
      };
    }
  }

  /**
   * Generate suggestions with RAG context
   * @param issueDescription Issue description
   * @param category Issue category
   * @param imageClassification Image classification result
   * @returns Generated suggestions
   */
  public async generateSuggestionsWithContext(
    issueDescription: string,
    category: string,
    imageClassification?: { category: string; confidence: number }
  ): Promise<string> {
    try {
      // Retrieve relevant context
      const contextResult = await this.retrieveRelevantContext(
        `${category} ${issueDescription}`,
        {
          category,
          threshold: 0.6,
          limit: 3,
        }
      );

      // Extract context text
      const contextText = contextResult.entries
        .map((entry) => `${entry.title}: ${entry.content}`)
        .join('\n\n');

      // Build the prompt
      let prompt = `
        Generate helpful suggestions for addressing the following community issue:

        Issue Description: "${issueDescription}"
        Category: ${category}
      `;

      if (imageClassification) {
        prompt += `
          Image Classification: ${imageClassification.category} (confidence: ${imageClassification.confidence.toFixed(2)})
        `;
      }

      if (contextResult.entries.length > 0) {
        prompt += `
          CONTEXT FROM SIMILAR ISSUES:
          ${contextText}
        `;
      }

      prompt += `
        Based on the issue description, category, and context from similar issues,
        provide 3-5 actionable suggestions that could help resolve this issue.
        Format your response as a bulleted list of suggestions.
      `;

      const result = await this.generativeModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      return result.response.text();
    } catch (error) {
      console.error('Error generating suggestions with context:', error);
      return 'Failed to generate suggestions. Please try again later.';
    }
  }
}

// Create a singleton instance
export const createRAGKnowledgeBase = (): RAGKnowledgeBase => {
  return new RAGKnowledgeBase();
};
