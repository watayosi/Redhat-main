import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const serviceKey = process.env.SUPABASE_SERVICE_KEY as string;

export const supabase = createClient(supabaseUrl, serviceKey);
