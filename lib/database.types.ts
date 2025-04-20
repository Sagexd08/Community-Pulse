export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
          phone_number: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          role: string | null
          badges: string[] | null
          impact_score: number | null
          issues_reported: number | null
          issues_resolved: number | null
          last_active: string | null
          preferences: Json | null
          verified: boolean
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          phone_number?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          role?: string | null
          badges?: string[] | null
          impact_score?: number | null
          issues_reported?: number | null
          issues_resolved?: number | null
          last_active?: string | null
          preferences?: Json | null
          verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
          phone_number?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          role?: string | null
          badges?: string[] | null
          impact_score?: number | null
          issues_reported?: number | null
          issues_resolved?: number | null
          last_active?: string | null
          preferences?: Json | null
          verified?: boolean
        }
      }
      issues: {
        Row: {
          id: string
          title: string
          description: string
          location: string | null
          latitude: number | null
          longitude: number | null
          category: string
          status: string
          priority: string
          created_at: string
          updated_at: string
          user_id: string
          assigned_to: string | null
          resolved_at: string | null
          image_url: string | null
          images: string[] | null
          audio_url: string | null
          votes: number
          metadata: Json | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          category: string
          status?: string
          priority?: string
          created_at?: string
          updated_at?: string
          user_id: string
          assigned_to?: string | null
          resolved_at?: string | null
          image_url?: string | null
          images?: string[] | null
          audio_url?: string | null
          votes?: number
          metadata?: Json | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          category?: string
          status?: string
          priority?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          assigned_to?: string | null
          resolved_at?: string | null
          image_url?: string | null
          images?: string[] | null
          audio_url?: string | null
          votes?: number
          metadata?: Json | null
        }
      }
      issue_comments: {
        Row: {
          id: string
          created_at: string
          issue_id: string
          user_id: string
          content: string
          parent_id: string | null
          status: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          issue_id: string
          user_id: string
          content: string
          parent_id?: string | null
          status?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          issue_id?: string
          user_id?: string
          content?: string
          parent_id?: string | null
          status?: string
          metadata?: Json | null
        }
      }
      ai_analysis: {
        Row: {
          id: string
          issue_id: string
          sentiment_score: number
          classification_result: Json
          suggestions: string
          created_at: string
          priority_recommendation: string | null
          category_recommendation: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          issue_id: string
          sentiment_score: number
          classification_result: Json
          suggestions: string
          created_at?: string
          priority_recommendation?: string | null
          category_recommendation?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          issue_id?: string
          sentiment_score?: number
          classification_result?: Json
          suggestions?: string
          created_at?: string
          priority_recommendation?: string | null
          category_recommendation?: string | null
          metadata?: Json | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone_number: string | null
          subject: string
          message: string
          created_at: string
          status: string
          callback_requested: boolean
          category: string | null
          priority: string | null
          assigned_to: string | null
          resolved_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone_number?: string | null
          subject: string
          message: string
          created_at?: string
          status?: string
          callback_requested?: boolean
          category?: string | null
          priority?: string | null
          assigned_to?: string | null
          resolved_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone_number?: string | null
          subject?: string
          message?: string
          created_at?: string
          status?: string
          callback_requested?: boolean
          category?: string | null
          priority?: string | null
          assigned_to?: string | null
          resolved_at?: string | null
          metadata?: Json | null
        }
      }
      stories: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          caption: string | null
          created_at: string
          updated_at: string
          published: boolean
          published_at: string | null
          category: string | null
          tags: string[] | null
          image_url: string | null
          views: number
          likes: number
          metadata: Json | null
          slug: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          caption?: string | null
          created_at?: string
          updated_at?: string
          published?: boolean
          published_at?: string | null
          category?: string | null
          tags?: string[] | null
          image_url?: string | null
          views?: number
          likes?: number
          metadata?: Json | null
          slug: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          caption?: string | null
          created_at?: string
          updated_at?: string
          published?: boolean
          published_at?: string | null
          category?: string | null
          tags?: string[] | null
          image_url?: string | null
          views?: number
          likes?: number
          metadata?: Json | null
          slug?: string
        }
      }
      transcriptions: {
        Row: {
          id: string
          issue_id: string
          text: string
          confidence: number
          language: string
          segments: Json | null
          created_at: string
          updated_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          issue_id: string
          text: string
          confidence: number
          language: string
          segments?: Json | null
          created_at?: string
          updated_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          issue_id?: string
          text?: string
          confidence?: number
          language?: string
          segments?: Json | null
          created_at?: string
          updated_at?: string | null
          metadata?: Json | null
        }
      }
      knowledge_base: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          tags: string[] | null
          embedding: Json | null
          created_at: string
          updated_at: string | null
          source: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: string
          tags?: string[] | null
          embedding?: Json | null
          created_at?: string
          updated_at?: string | null
          source?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string
          tags?: string[] | null
          embedding?: Json | null
          created_at?: string
          updated_at?: string | null
          source?: string | null
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      append_text: {
        Args: {
          original_text: string
          new_text: string
        }
        Returns: string
      }
      get_issue_description: {
        Args: {
          issue_id: string
        }
        Returns: string
      }
      match_documents: {
        Args: {
          query_embedding: Json
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          content: string
          similarity: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
