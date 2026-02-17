import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  return createSupabaseClient<Database>(supabaseUrl, supabaseKey);
}
