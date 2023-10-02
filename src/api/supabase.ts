import "react-native-url-polyfill/auto"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Database } from "../types/supabase"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dkkentcrclzlonjnsunx.supabase.co"
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRra2VudGNyY2x6bG9uam5zdW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NDkzNDQsImV4cCI6MjAxMTMyNTM0NH0.ROINwvfI17tSD7TsKPk2vGept91i4F9peImcbn5emac"
const supabaseServiceKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRra2VudGNyY2x6bG9uam5zdW54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTc0OTM0NCwiZXhwIjoyMDExMzI1MzQ0fQ.qS8nMKa8kA910u4jUb9_FipGDJNdSdhj_SZ3XlQ-eVU"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
export const serviceSupabase = createClient<Database>(
	supabaseUrl,
	supabaseServiceKey,
	{
		auth: {
			storage: AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	}
)
