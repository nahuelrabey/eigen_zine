export type PostType = 'nota' | 'opinion' | 'poema' | 'cancion' | 'literaria' | 'otro'

export type Post = {
	slug: string
	title: string
	author: string
	type: PostType
	date_published: string
	date_edited?: string
	reply_to: string[]
}

export type ThreadNode = Post & {
	replies: ThreadNode[]
}
