import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qtvjsvgrojiafyayxrmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dmpzdmdyb2ppYWZ5YXl4cm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTIyOTMsImV4cCI6MjA5MjI4ODI5M30.x3AeUcM2_Ur-NvezP8s4rluf_HM7SZIi0vWeLjZbjiY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
