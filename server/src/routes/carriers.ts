import { Router } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

router.get('/', async (_req, res) => {
  const { data, error } = await supabase.from('carriers').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { data, error } = await supabase.from('carriers').insert(req.body).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

export default router;
