-- Create transcriptions table
CREATE TABLE IF NOT EXISTS transcriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_id UUID,
  text TEXT NOT NULL,
  confidence FLOAT NOT NULL,
  language TEXT NOT NULL,
  segments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- Create knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  embedding JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE,
  source TEXT,
  metadata JSONB
);

-- Create ai_models table
CREATE TABLE IF NOT EXISTS ai_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create append_text function
CREATE OR REPLACE FUNCTION append_text(original_text TEXT, new_text TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  IF original_text IS NULL THEN
    RETURN new_text;
  ELSE
    RETURN original_text || ' ' || new_text;
  END IF;
END;
$$;

-- Create get_issue_description function
CREATE OR REPLACE FUNCTION get_issue_description(issue_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  issue_description TEXT;
BEGIN
  SELECT description INTO issue_description FROM issues WHERE id = issue_id;
  RETURN issue_description;
EXCEPTION
  WHEN others THEN
    RETURN '';
END;
$$;

-- Create match_documents function
CREATE OR REPLACE FUNCTION match_documents(query_embedding JSONB, match_threshold FLOAT, match_count INT)
RETURNS TABLE(
  id UUID,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_base.id,
    knowledge_base.content,
    0.5 as similarity  -- Placeholder similarity calculation
  FROM knowledge_base
  LIMIT match_count;
END;
$$;
