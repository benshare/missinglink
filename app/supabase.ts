import "react-native-url-polyfill/auto"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dkkentcrclzlonjnsunx.supabase.co"
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRra2VudGNyY2x6bG9uam5zdW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NDkzNDQsImV4cCI6MjAxMTMyNTM0NH0.ROINwvfI17tSD7TsKPk2vGept91i4F9peImcbn5emac"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
