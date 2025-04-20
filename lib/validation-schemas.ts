import { z } from 'zod';

// Contact form schema
export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
  callbackRequested: z.boolean().default(false),
});

// Issue schema
export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(5000),
  location: z.string().optional(),
  category: z.enum(['infrastructure', 'environment', 'safety', 'public_services', 'other']),
  imageUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
});

// Image classification schema
export const imageClassificationSchema = z.object({
  imageUrl: z.string().url('A valid image URL is required'),
  issueId: z.string().uuid().optional(),
});

// Sentiment analysis schema
export const sentimentAnalysisSchema = z.object({
  text: z.string().min(1, 'Text is required for analysis'),
  issueId: z.string().uuid().optional(),
});

// Story continuation schema
export const storyContinuationSchema = z.object({
  caption: z.string().min(1, 'Caption is required'),
  currentText: z.string().min(1, 'Current text is required'),
  storyId: z.string().uuid().optional(),
});

// Story schema
export const storySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  caption: z.string().min(1, 'Caption is required').max(500),
});

// File upload schema
export const fileUploadSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  issueId: z.string().uuid().optional(),
  file: z.any(),
});

// User schema
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(1, 'Full name is required').max(100),
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Password update schema
export const passwordUpdateSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password confirmation is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
