import axios from 'axios';

// Interface for transcription result
export interface TranscriptionResult {
  text: string;
  confidence: number;
  language?: string;
  segments?: Array<{
    start: number;
    end: number;
    text: string;
    confidence: number;
  }>;
  error?: string;
}

/**
 * Speech recognition service for transcribing audio files
 * Uses Google Cloud Speech-to-Text API
 */
export class SpeechRecognitionService {
  private apiKey: string;
  
  constructor(apiKey: string = process.env.GOOGLE_SPEECH_API_KEY || '') {
    this.apiKey = apiKey;
  }
  
  /**
   * Transcribe audio file using Google Cloud Speech-to-Text API
   * @param audioUrl URL of the audio file to transcribe
   * @param language Language code (default: 'en-US')
   * @returns Transcription result
   */
  public async transcribeAudio(audioUrl: string, language: string = 'en-US'): Promise<TranscriptionResult> {
    try {
      // For demo purposes, we're using a simple API call
      // In production, you would use the Google Cloud Speech-to-Text client library
      const response = await axios.post(
        `https://speech.googleapis.com/v1/speech:recognize?key=${this.apiKey}`,
        {
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: language,
            enableAutomaticPunctuation: true,
            model: 'default',
            useEnhanced: true,
          },
          audio: {
            uri: audioUrl,
          },
        }
      );
      
      // Process the response
      const result = response.data;
      
      if (!result.results || result.results.length === 0) {
        return {
          text: '',
          confidence: 0,
          error: 'No transcription results found',
        };
      }
      
      // Extract the transcription text and confidence
      const transcription = result.results.map((r: any) => r.alternatives[0].transcript).join(' ');
      const confidence = result.results[0].alternatives[0].confidence || 0;
      
      // Create segments if available
      const segments = result.results.map((r: any, index: number) => {
        return {
          start: index * 5, // Approximate timing
          end: (index + 1) * 5,
          text: r.alternatives[0].transcript,
          confidence: r.alternatives[0].confidence || 0,
        };
      });
      
      return {
        text: transcription,
        confidence,
        language,
        segments,
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      return {
        text: '',
        confidence: 0,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
  
  /**
   * Alternative implementation using Whisper API for better accuracy
   * @param audioUrl URL of the audio file to transcribe
   * @param language Language code (default: 'en')
   * @returns Transcription result
   */
  public async transcribeWithWhisper(audioUrl: string, language: string = 'en'): Promise<TranscriptionResult> {
    try {
      // Download the audio file
      const audioResponse = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      const audioBuffer = Buffer.from(audioResponse.data);
      
      // Create form data
      const formData = new FormData();
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mp3' });
      formData.append('file', audioBlob, 'audio.mp3');
      formData.append('model', 'whisper-1');
      formData.append('language', language);
      
      // Call OpenAI Whisper API
      const response = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return {
        text: response.data.text,
        confidence: 0.95, // Whisper doesn't provide confidence scores, so we use a default
        language,
      };
    } catch (error) {
      console.error('Error transcribing with Whisper:', error);
      return {
        text: '',
        confidence: 0,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

// Create a singleton instance
export const createSpeechRecognitionService = (): SpeechRecognitionService => {
  return new SpeechRecognitionService();
};
