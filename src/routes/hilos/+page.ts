import { getAllPosts, getRootThreads, countReplies } from '$lib/content'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = () => {
	const all = getAllPosts()
	const threads = getRootThreads(all).map((t) => ({
		slug: t.slug,
		title: t.title,
		author: t.author,
		type: t.type,
		date_published: t.date_published,
		reply_to: t.reply_to,
		totalReplies: countReplies(t)
	}))
	return { threads }
}
