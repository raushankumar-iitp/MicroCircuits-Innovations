import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase Env Vars missing!");
}

let supabaseInstance = null;

if (supabaseUrl && supabaseKey) {
    try {
        supabaseInstance = createClient(supabaseUrl, supabaseKey);
        console.log("Supabase Client Initialized");
    } catch (e) {
        console.error("Supabase init failed:", e);
        supabaseInstance = null;
    }
} else {
    console.warn("Supabase Env Vars missing! Supabase client will be null. Check Vercel Settings.");
}

export const supabase = supabaseInstance;