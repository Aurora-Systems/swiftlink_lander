import { createClient } from "@supabase/supabase-js";


const supabase_url:string = "https://ezfkldjqvqkfwmveoftb.supabase.co"
const supabase_anon_key:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6ZmtsZGpxdnFrZndtdmVvZnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MDk2NjQsImV4cCI6MjA1Mzk4NTY2NH0.6EhWJq9ibi4lAZ938BJgG6b-Snl8S8y3qfnQ61fMMDQ"
const supabase = createClient(supabase_url, supabase_anon_key)

export default supabase