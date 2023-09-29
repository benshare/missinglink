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
			packs: {
				Row: {
					created_at: string
					id: number
					title: string
					week: number | null
				}
				Insert: {
					created_at?: string
					id?: number
					title: string
					week?: number | null
				}
				Update: {
					created_at?: string
					id?: number
					title?: string
					week?: number | null
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
					full_name: string | null
					id: string
					updated_at: string | null
					username: string | null
					website: string | null
				}
				Insert: {
					avatar_url?: string | null
					full_name?: string | null
					id: string
					updated_at?: string | null
					username?: string | null
					website?: string | null
				}
				Update: {
					avatar_url?: string | null
					full_name?: string | null
					id?: string
					updated_at?: string | null
					username?: string | null
					website?: string | null
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
			progress: {
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
						foreignKeyName: "progress_pack_id_fkey"
						columns: ["pack_id"]
						referencedRelation: "packs"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "progress_user_id_fkey"
						columns: ["user_id"]
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
					solution: string
					title: string
					type: string
				}
				Insert: {
					after: string
					before: string
					created_at?: string
					id?: number
					pack_id: number
					solution: string
					title: string
					type: string
				}
				Update: {
					after?: string
					before?: string
					created_at?: string
					id?: number
					pack_id?: number
					solution?: string
					title?: string
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
					week_number: number
				}
				Insert: {
					id?: number
					week_number: number
				}
				Update: {
					id?: number
					week_number?: number
				}
				Relationships: []
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
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			week_return_type: {
				id: number
				week_number: number
				packs: number[]
				statuses: string[]
			}
		}
	}
}
