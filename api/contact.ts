import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const contactFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Handle potential string body from Vercel
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const validatedData = contactFormSchema.parse(body);
    
    // In a real application, you would:
    // 1. Send an email notification
    // 2. Store the submission in a database
    // 3. Add to CRM system
    
    console.log("Contact form submission:", validatedData);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({ 
      success: true, 
      message: "Contact form submitted successfully" 
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(400).json({ 
      success: false, 
      message: "Invalid form data" 
    });
  }
}