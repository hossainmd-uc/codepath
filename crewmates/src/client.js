import { createClient } from '@supabase/supabase-js'

const URL = 'https://mljjoijkutoiojvljnay.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sampvaWprdXRvaW9qdmxqbmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjkzNzYsImV4cCI6MjA2OTUwNTM3Nn0.rq0Q_FBKc65S_ezSny6IV8IK2p_2IokCusq_HtjP4Oo'


export const supabase = createClient(URL, API_KEY)
