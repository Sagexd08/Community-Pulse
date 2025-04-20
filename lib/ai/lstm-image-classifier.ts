import * as tf from '@tensorflow/tfjs';
import { createAdminSupabaseClient } from '@/lib/supabase';

// Define the categories for classification
const CATEGORIES = [
  'infrastructure_damage',
  'flooding',
  'trash_accumulation',
  'graffiti',
  'pothole',
  'broken_streetlight',
  'fallen_tree',
  'other'
];

// Model configuration
interface ModelConfig {
  modelType: string;
  inputShape: number[];
  categories: string[];
  version: string;
  lastUpdated: string;
  accuracy?: number;
  metadata?: any;
}

// LSTM model for image classification
export class LSTMImageClassifier {
  private model: tf.LayersModel | null = null;
  private isModelLoaded: boolean = false;
  private modelConfig: ModelConfig = {
    modelType: 'lstm_cnn',
    inputShape: [224, 224, 3],
    categories: CATEGORIES,
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
  };

  constructor(loadSavedModel: boolean = true) {
    if (loadSavedModel) {
      this.loadModel().catch(() => this.initModel());
    } else {
      this.initModel();
    }
  }

  // Initialize the LSTM model
  private async initModel() {
    try {
      // Create a sequential model
      const model = tf.sequential();

      // Add layers to the model
      // Input layer for 224x224 RGB images
      model.add(tf.layers.conv2d({
        inputShape: [224, 224, 3],
        filters: 32,
        kernelSize: 3,
        activation: 'relu'
      }));
      model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

      model.add(tf.layers.conv2d({
        filters: 64,
        kernelSize: 3,
        activation: 'relu'
      }));
      model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

      model.add(tf.layers.conv2d({
        filters: 128,
        kernelSize: 3,
        activation: 'relu'
      }));
      model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

      // Add batch normalization for better training stability
      model.add(tf.layers.batchNormalization());

      // Flatten the output for the LSTM layer
      model.add(tf.layers.flatten());

      // Reshape for LSTM input [batch, timesteps, features]
      model.add(tf.layers.reshape({ targetShape: [1, 16 * 16 * 128] }));

      // Add LSTM layer
      model.add(tf.layers.lstm({
        units: 128,
        returnSequences: false
      }));

      // Add dense layers for classification
      model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
      model.add(tf.layers.dropout({ rate: 0.5 }));
      model.add(tf.layers.dense({ units: CATEGORIES.length, activation: 'softmax' }));

      // Compile the model
      model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      this.model = model;
      this.isModelLoaded = true;
      console.log('LSTM Image Classification model initialized');

      // Update model config
      this.modelConfig.lastUpdated = new Date().toISOString();
      this.modelConfig.version = '1.0.0';
    } catch (error) {
      console.error('Error initializing LSTM model:', error);
    }
  }

  // Load a saved model from Supabase storage
  private async loadModel(): Promise<void> {
    try {
      console.log('Attempting to load saved model...');

      // Create Supabase client
      const supabase = createAdminSupabaseClient();

      // Check if model exists in storage
      const { data: modelFiles, error: listError } = await supabase
        .storage
        .from('ai-models')
        .list('lstm-image-classifier');

      if (listError || !modelFiles || modelFiles.length === 0) {
        console.log('No saved model found, initializing new model');
        throw new Error('No saved model found');
      }

      // Get model.json URL
      const { data: { publicUrl: modelJsonUrl } } = supabase
        .storage
        .from('ai-models')
        .getPublicUrl('lstm-image-classifier/model.json');

      // Load the model
      this.model = await tf.loadLayersModel(modelJsonUrl);

      // Compile the model
      this.model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      // Get model config
      const { data: configData, error: configError } = await supabase
        .from('ai_models')
        .select('*')
        .eq('name', 'lstm-image-classifier')
        .single();

      if (!configError && configData) {
        this.modelConfig = configData.config;
      }

      this.isModelLoaded = true;
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }

  // Preprocess the image for the model
  private async preprocessImage(imageUrl: string): Promise<tf.Tensor | null> {
    try {
      // Load the image
      const image = new Image();
      image.crossOrigin = 'anonymous';

      // Wait for the image to load
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = imageUrl;
      });

      // Convert the image to a tensor
      const tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224]) // Resize to model input size
        .toFloat()
        .div(tf.scalar(255.0)) // Normalize to [0, 1]
        .expandDims(0); // Add batch dimension

      return tensor;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      return null;
    }
  }

  // Classify an image
  public async classifyImage(imageUrl: string): Promise<{ category: string, confidence: number } | null> {
    try {
      if (!this.isModelLoaded || !this.model) {
        console.error('Model not loaded');
        return null;
      }

      // Preprocess the image
      const tensor = await this.preprocessImage(imageUrl);
      if (!tensor) {
        return null;
      }

      // Make prediction
      const predictions = await this.model.predict(tensor) as tf.Tensor;

      // Get the index of the highest probability
      const argMax = predictions.argMax(1);
      const categoryIndex = (await argMax.data())[0];

      // Get the confidence score
      const confidenceData = await predictions.data();
      const confidence = confidenceData[categoryIndex];

      // Clean up tensors
      tensor.dispose();
      predictions.dispose();
      argMax.dispose();

      return {
        category: CATEGORIES[categoryIndex],
        confidence: confidence
      };
    } catch (error) {
      console.error('Error classifying image:', error);
      return null;
    }
  }

  // Train the model with new data
  public async trainModel(
    images: { url: string, category: string }[],
    options: { epochs?: number, batchSize?: number, saveModel?: boolean } = {}
  ): Promise<{ success: boolean, accuracy?: number, error?: string }> {
    try {
      if (!this.isModelLoaded || !this.model) {
        console.error('Model not loaded');
        return { success: false, error: 'Model not loaded' };
      }

      // Set default options
      const epochs = options.epochs || 10;
      const batchSize = options.batchSize || 32;
      const saveModel = options.saveModel !== undefined ? options.saveModel : true;

      // Prepare training data
      const xs: tf.Tensor[] = [];
      const ys: number[][] = [];

      // Process each image
      for (const image of images) {
        const tensor = await this.preprocessImage(image.url);
        if (tensor) {
          xs.push(tensor);

          // Create one-hot encoded label
          const label = new Array(CATEGORIES.length).fill(0);
          const categoryIndex = CATEGORIES.indexOf(image.category);
          if (categoryIndex !== -1) {
            label[categoryIndex] = 1;
          }
          ys.push(label);
        }
      }

      if (xs.length === 0) {
        console.error('No valid images for training');
        return { success: false, error: 'No valid images for training' };
      }

      // Concatenate all tensors
      const xsTensor = tf.concat(xs, 0);
      const ysTensor = tf.tensor2d(ys);

      // Train the model
      const history = await this.model.fit(xsTensor, ysTensor, {
        epochs: epochs,
        batchSize: batchSize,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch + 1}: loss = ${logs?.loss}, accuracy = ${logs?.acc}`);
          }
        }
      });

      // Get final accuracy
      const finalAccuracy = history.history.acc ?
        history.history.acc[history.history.acc.length - 1] :
        undefined;

      // Clean up tensors
      xsTensor.dispose();
      ysTensor.dispose();
      xs.forEach(tensor => tensor.dispose());

      console.log('Model training completed');

      // Update model config
      this.modelConfig.lastUpdated = new Date().toISOString();
      this.modelConfig.accuracy = finalAccuracy;

      // Save the model if requested
      if (saveModel) {
        await this.saveModel();
      }

      return {
        success: true,
        accuracy: finalAccuracy
      };
    } catch (error) {
      console.error('Error training model:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during training'
      };
    }
  }

  // Save the model to Supabase storage
  public async saveModel(): Promise<boolean> {
    try {
      if (!this.isModelLoaded || !this.model) {
        console.error('No model to save');
        return false;
      }

      // Create Supabase client
      const supabase = createAdminSupabaseClient();

      // Save model to IndexedDB first (browser storage)
      const saveResult = await this.model.save('indexeddb://lstm-image-classifier');
      console.log('Model saved to IndexedDB:', saveResult);

      // Save model to Supabase storage
      // Note: In a real implementation, you would need to export the model files
      // from IndexedDB and upload them to Supabase storage

      // For now, we'll just save the model configuration
      const { data, error } = await supabase
        .from('ai_models')
        .upsert({
          name: 'lstm-image-classifier',
          type: 'image_classification',
          config: this.modelConfig,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'name' });

      if (error) {
        console.error('Error saving model config:', error);
        return false;
      }

      console.log('Model config saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving model:', error);
      return false;
    }
  }

  // Get model information
  public getModelInfo(): ModelConfig {
    return { ...this.modelConfig };
  }
}
