import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(100, 'Location must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal(''))
    .transform((val) => val === '' ? undefined : val),
  twitter_handle: z
    .string()
    .max(50, 'Twitter handle must be less than 50 characters')
    .optional()
    .or(z.literal(''))
    .transform((val) => val === '' ? undefined : val),
  github_handle: z
    .string()
    .max(50, 'GitHub handle must be less than 50 characters')
    .optional()
    .or(z.literal(''))
    .transform((val) => val === '' ? undefined : val),
  linkedin_handle: z
    .string()
    .max(50, 'LinkedIn handle must be less than 50 characters')
    .optional()
    .or(z.literal(''))
    .transform((val) => val === '' ? undefined : val),
});

export type ProfileFormData = z.infer<typeof profileSchema>;