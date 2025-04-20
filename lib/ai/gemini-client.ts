import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai';
import { createRAGKnowledgeBase } from './rag-knowledge-base';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Default generation config
const defaultGenerationConfig: GenerationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
};

// Gemini client for text generation and analysis
export class GeminiClient {
  private model: GenerativeModel;

  constructor(modelName: string = 'gemini-pro') {
    this.model = genAI.getGenerativeModel({ model: modelName });
  }

  // Analyze sentiment of text
  public async analyzeSentiment(text: string, category?: string): Promise<{ score: number, analysis: string, context?: string }> {
    try {
      // Use RAG for sentiment analysis if category is provided
      if (category) {
        const ragKnowledgeBase = createRAGKnowledgeBase();
        return await ragKnowledgeBase.analyzeSentimentWithContext(text, category);
      }

      // Fall back to regular sentiment analysis if no category
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

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          ...defaultGenerationConfig,
          temperature: 0.1, // Lower temperature for more consistent results
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
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return {
        score: 0,
        analysis: 'Failed to analyze sentiment',
      };
    }
  }

  // Generate suggestions based on issue data and classification
  public async generateSuggestions(
    issueDescription: string,
    category: string,
    imageClassification?: { category: string, confidence: number },
    useRAG: boolean = true
  ): Promise<string> {
    try {
      // Use RAG for generating suggestions if enabled
      if (useRAG) {
        const ragKnowledgeBase = createRAGKnowledgeBase();
        return await ragKnowledgeBase.generateSuggestionsWithContext(
          issueDescription,
          category,
          imageClassification
        );
      }

      // Fall back to regular suggestion generation
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

      prompt += `
        Provide 3-5 actionable suggestions that could help resolve this issue.
        Format your response as a bulleted list of suggestions.
      `;

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: defaultGenerationConfig,
      });

      return result.response.text();
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return 'Failed to generate suggestions. Please try again later.';
    }
  }

  // Generate story continuation based on caption and current text
  public async generateStoryContinuation(
    caption: string,
    currentText: string
  ): Promise<string> {
    try {
      const prompt = `
        You are helping a user write a story based on the following caption:

        Caption: "${caption}"

        Here is what they have written so far:

        "${currentText}"

        Generate a natural continuation for this story (1-2 paragraphs).
        Make sure it flows naturally from the existing text and maintains the same style and tone.
      `;

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          ...defaultGenerationConfig,
          temperature: 0.8, // Higher temperature for more creative results
        },
      });

      return result.response.text();
    } catch (error) {
      console.error('Error generating story continuation:', error);
      return 'Failed to generate story continuation. Please try again later.';
    }
  }
}
