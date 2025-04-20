import { OpenAI } from 'openai';
import { Database } from '@/lib/supabase';
import { errorHandler } from '@/lib/error-handler';

// Define issue categories and their descriptions
export const ISSUE_CATEGORIES = {
  INFRASTRUCTURE: 'Issues related to physical infrastructure (roads, bridges, utilities)',
  PUBLIC_SAFETY: 'Issues related to safety concerns, crime, emergency services',
  ENVIRONMENT: 'Issues related to pollution, wildlife, parks, sustainability',
  ACCESSIBILITY: 'Issues related to accessibility for disabled individuals',
  TRANSPORTATION: 'Issues related to public transit, traffic',
  HOUSING: 'Issues related to housing availability, affordability, conditions',
  EDUCATION: 'Issues related to schools, educational programs, libraries',
  HEALTH: 'Issues related to public health, healthcare access',
  OTHER: 'Other community issues not falling into the above categories'
};

export type IssueCategory = keyof typeof ISSUE_CATEGORIES;

export interface ClassificationResult {
  category: IssueCategory;
  confidence: number;
  reasoning: string;
  keywords: string[];
  severity: 'low' | 'medium' | 'high';
  estimatedImpact: 'individual' | 'neighborhood' | 'community-wide';
}

export class IssueClassifier {
  private openai: OpenAI;
  
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Classifies an issue based on its title and description
   */
  async classifyIssue(
    title: string, 
    description: string,
    location?: string
  ): Promise<ClassificationResult> {
    try {
      const prompt = this.buildClassificationPrompt(title, description, location);
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI specialized in classifying community issues. You analyze the issue description and categorize it accurately.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 800,
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return this.validateClassificationResult(result);
    } catch (error) {
      return errorHandler(error, 'Error classifying issue');
    }
  }

  /**
   * Builds a prompt for classification based on the issue details
   */
  private buildClassificationPrompt(title: string, description: string, location?: string): string {
    const categories = Object.entries(ISSUE_CATEGORIES)
      .map(([key, desc]) => `${key}: ${desc}`)
      .join('\n');
    
    return `
Please classify the following community issue into one of these categories:
${categories}

Issue Title: ${title}
Issue Description: ${description}
${location ? `Location: ${location}` : ''}

Analyze the text and return a JSON object with the following structure:
{
  "category": "The most appropriate category from the list (use the exact category name)",
  "confidence": "A number between 0 and 1 indicating your confidence in this classification",
  "reasoning": "Brief explanation of why this category was chosen",
  "keywords": ["List of key terms from the issue that informed your classification"],
  "severity": "low, medium, or high based on the issue's urgency and impact",
  "estimatedImpact": "individual, neighborhood, or community-wide"
}
`;
  }

  /**
   * Validates the classification result structure
   */
  private validateClassificationResult(result: any): ClassificationResult {
    // Ensure the category is valid
    if (!result.category || !Object.keys(ISSUE_CATEGORIES).includes(result.category)) {
      result.category = 'OTHER';
    }

    // Ensure confidence is a number between 0 and 1
    result.confidence = typeof result.confidence === 'number' 
      ? Math.max(0, Math.min(1, result.confidence))
      : 0.5;

    // Ensure other fields have default values if missing
    result.reasoning = result.reasoning || 'No reasoning provided';
    result.keywords = Array.isArray(result.keywords) ? result.keywords : [];
    result.severity = ['low', 'medium', 'high'].includes(result.severity) 
      ? result.severity 
      : 'medium';
    result.estimatedImpact = ['individual', 'neighborhood', 'community-wide'].includes(result.estimatedImpact)
      ? result.estimatedImpact
      : 'neighborhood';

    return result as ClassificationResult;
  }

  /**
   * Batch process multiple issues for classification
   */
  async batchClassify(issues: Array<{id: string, title: string, description: string, location?: string}>): Promise<Record<string, ClassificationResult>> {
    const results: Record<string, ClassificationResult> = {};
    
    // Process in batches of 5 to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < issues.length; i += batchSize) {
      const batch = issues.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (issue) => {
          const result = await this.classifyIssue(issue.title, issue.description, issue.location);
          results[issue.id] = result;
        })
      );
      
      // Simple rate limiting
      if (i + batchSize < issues.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

// Factory function to create a classifier instance
export function createIssueClassifier() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required');
  }
  return new IssueClassifier(apiKey);
}