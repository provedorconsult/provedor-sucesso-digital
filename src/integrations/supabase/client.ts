
import { createClient } from '@supabase/supabase-js';

// Use the actual values directly instead of .env variables since Vite
// requires VITE_ prefix for environment variables and we can't modify .gitignore
export const supabase = createClient(
  'https://gkveguviszipwusssujj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdmVndXZpc3ppcHd1c3NzdWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTgxNzcsImV4cCI6MjA2Mjk5NDE3N30.Z64n4ljClGCDh2cCesZoG_ruacXUNTCbl5j3fXj6ORQ'
);
