import { getAllPosts, getPostBySlug } from '$lib/content'
import { error } from '@sveltejs/kit'
import type { EntryGenerator, PageLoad } from './$types'

export const prerender = true

export const entries: EntryGenerator = () => {
	return getAllPosts().map((p) => ({ slug: p.slug }))
}

export const load: PageLoad = ({ params }) => {
	const all = getAllPosts()
	const post = getPostBySlug(params.slug)
	if (!post) error(404, 'Texto no encontrado')
	const replies = all.filter((p) => p.reply_to.includes(post.slug))
	return { post, replies }
}
