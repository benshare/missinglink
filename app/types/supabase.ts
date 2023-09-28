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
				}
				Insert: {
					created_at?: string
					id?: number
					title: string
				}
				Update: {
					created_at?: string
					id?: number
					title?: string
				}
				Relationships: []
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
					id: number
					next_puzzle: number
					pack_id: number
					status: string
					user_id: string
				}
				Insert: {
					id?: number
					next_puzzle?: number
					pack_id: number
					status: string
					user_id: string
				}
				Update: {
					id?: number
					next_puzzle?: number
					pack_id?: number
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
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
