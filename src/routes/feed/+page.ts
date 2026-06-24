import { getAllPosts } from '$lib/content'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = () => {
	const posts = getAllPosts()
	return { posts }
}
