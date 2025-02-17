import { createClient } from "@supabase/supabase-js";


const supabase_url:string = "https://joqjovfhiclbjetgmbec.supabase.co"
const supabase_anon_key:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcWpvdmZoaWNsYmpldGdtYmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNDgxNTksImV4cCI6MjA1MzcyNDE1OX0.r8lWVSWE5kCzerBe-btdTXH2wLL9NoEV5rPzseKESrY"
const supabase = createClient(supabase_url, supabase_anon_key)

export default supabase