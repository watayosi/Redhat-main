import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

router.post('/', async (req, res) => {
  const { origin, destination, weight } = req.body;
  // Simple example: query a function or table in Supabase
  const { data, error } = await supabase.rpc('calculate_quote', { origin, destination, weight });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
