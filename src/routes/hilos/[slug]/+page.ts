import { getAllPosts, getPostBySlug, buildThreadTree } from '$lib/content'
import { error } from '@sveltejs/kit'
import type { EntryGenerator, PageLoad } from './$types'

export const prerender = true

export const entries: EntryGenerator = () => {
	const all = getAllPosts()
	const slugsWithReplies = new Set(all.flatMap((p) => p.reply_to))
	return [...slugsWithReplies].map((slug) => ({ slug }))
}

export const load: PageLoad = ({ params }) => {
	const all = getAllPosts()
	const post = getPostBySlug(params.slug)
	if (!post) error(404, 'Hilo no encontrado')
	return { thread: buildThreadTree(post, all) }
}
