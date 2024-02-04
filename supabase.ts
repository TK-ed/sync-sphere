import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or key is undefined.");
}
export const supabase = createClient(supabaseUrl, supabaseKey);
