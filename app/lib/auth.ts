import { Request, Response, NextFunction } from 'express';
import supabase from '../services/supabase';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get JWT token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization token' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // Add user to request object
    req.user = data.user;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};
