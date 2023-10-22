export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			pack_progress: {
				Row: {
					pack_id: number
					puzzles_completed: boolean[]
					status: string
					user_id: string
				}
				Insert: {
					pack_id: number
					puzzles_completed: boolean[]
					status: string
					user_id?: string
				}
				Update: {
					pack_id?: number
					puzzles_completed?: boolean[]
					status?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "pack_progress_pack_id_fkey"
						columns: ["pack_id"]
						referencedRelation: "packs"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "pack_progress_user_id_fkey"
						columns: ["user_id"]
						referencedRelation: "users"
						referencedColumns: ["id"]
					}
				]
			}
			packs: {
				Row: {
					created_at: string
					id: number
					title: string
					week: number
				}
				Insert: {
					created_at?: string
					id?: number
					title: string
					week: number
				}
				Update: {
					created_at?: string
					id?: number
					title?: string
					week?: number
				}
				Relationships: [
					{
						foreignKeyName: "packs_week_fkey"
						columns: ["week"]
						referencedRelation: "weekly_challenges"
						referencedColumns: ["id"]
					}
				]
			}
			profiles: {
				Row: {
					avatar_url: string | null
					current_streak: number
					full_name: string | null
					id: string
					max_streak: number
					streak_includes_today: boolean
					username: string | null
				}
				Insert: {
					avatar_url?: string | null
					current_streak?: number
					full_name?: string | null
					id: string
					max_streak?: number
					streak_includes_today?: boolean
					username?: string | null
				}
				Update: {
					avatar_url?: string | null
					current_streak?: number
					full_name?: string | null
					id?: string
					max_streak?: number
					streak_includes_today?: boolean
					username?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey"
						columns: ["id"]
						referencedRelation: "users"
						referencedColumns: ["id"]
					}
				]
			}
			puzzles: {
				Row: {
					after: string
					before: string
					created_at: string
					id: number
					pack_id: number
					solutions: string[]
					title: string | null
					type: string
				}
				Insert: {
					after: string
					before: string
					created_at?: string
					id?: number
					pack_id: number
					solutions: string[]
					title?: string | null
					type?: string
				}
				Update: {
					after?: string
					before?: string
					created_at?: string
					id?: number
					pack_id?: number
					solutions?: string[]
					title?: string | null
					type?: string
				}
				Relationships: [
					{
						foreignKeyName: "puzzles_pack_id_fkey"
						columns: ["pack_id"]
						referencedRelation: "packs"
						referencedColumns: ["id"]
					}
				]
			}
			weekly_challenges: {
				Row: {
					id: number
					start_date: string
					title: string
				}
				Insert: {
					id?: number
					start_date: string
					title: string
				}
				Update: {
					id?: number
					start_date?: string
					title?: string
				}
				Relationships: []
			}
			weeks_completed: {
				Row: {
					on_time: boolean
					user_id: string
					week_id: number
				}
				Insert: {
					on_time: boolean
					user_id?: string
					week_id: number
				}
				Update: {
					on_time?: boolean
					user_id?: string
					week_id?: number
				}
				Relationships: [
					{
						foreignKeyName: "weeks_completed_user_id_fkey"
						columns: ["user_id"]
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "weeks_completed_week_id_fkey"
						columns: ["week_id"]
						referencedRelation: "weekly_challenges"
						referencedColumns: ["id"]
					}
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			get_weekly_challenges: {
				Args: Record<PropertyKey, never>
				Returns: Database["public"]["CompositeTypes"]["week_return_type"][]
			}
			streak_update: {
				Args: Record<PropertyKey, never>
				Returns: undefined
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			week_return_type: {
				id: number
				start_date: string
				title: string
				completed_on_time: boolean
				packs: number[]
				statuses: string[]
			}
		}
	}
}
