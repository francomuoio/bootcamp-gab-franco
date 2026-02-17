import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  return createSupabaseClient(supabaseUrl, supabaseKey);
}
