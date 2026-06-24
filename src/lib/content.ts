import type { Component } from 'svelte'
import type { Post, PostType, ThreadNode } from './types'

type RawFrontmatter = {
	slug: string
	title: string
	author: string
	type: string
	date_published: string
	date_edited?: string
	reply_to?: string | string[] | null
}

type RawModule = {
	metadata: RawFrontmatter
	default: Component
}

const rawModules = import.meta.glob('../content/posts/*.md', {
	eager: true
}) as Record<string, RawModule>

function normalizeReplyTo(raw: string | string[] | null | undefined): string[] {
	if (!raw) return []
	if (Array.isArray(raw)) return raw
	return [raw]
}

let _posts: Post[] | null = null

export function getAllPosts(): Post[] {
	if (_posts) return _posts
	_posts = Object.values(rawModules)
		.map((mod) => ({
			slug: mod.metadata.slug,
			title: mod.metadata.title,
			author: mod.metadata.author,
			type: mod.metadata.type as PostType,
			date_published: mod.metadata.date_published,
			date_edited: mod.metadata.date_edited,
			reply_to: normalizeReplyTo(mod.metadata.reply_to)
		}))
		.sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
	return _posts
}

export function getPostBySlug(slug: string): Post | undefined {
	return getAllPosts().find((p) => p.slug === slug)
}

export function getPostComponent(slug: string): Component | null {
	return Object.values(rawModules).find((mod) => mod.metadata?.slug === slug)?.default ?? null
}

export function buildThreadTree(root: Post, all: Post[]): ThreadNode {
	const replies = all.filter((p) => p.reply_to.includes(root.slug))
	return {
		...root,
		replies: replies
			.sort((a, b) => new Date(a.date_published).getTime() - new Date(b.date_published).getTime())
			.map((r) => buildThreadTree(r, all))
	}
}

export function countReplies(node: ThreadNode): number {
	return node.replies.length + node.replies.reduce((sum, r) => sum + countReplies(r), 0)
}

function getLatestDate(node: ThreadNode): string {
	if (node.replies.length === 0) return node.date_published
	const replyDates = node.replies.map(getLatestDate)
	return replyDates.reduce(
		(latest, d) => (new Date(d) > new Date(latest) ? d : latest),
		node.date_published
	)
}

export function getRootThreads(all: Post[]): ThreadNode[] {
	const slugsWithReplies = new Set(all.flatMap((p) => p.reply_to))
	return all
		.filter((p) => p.reply_to.length === 0 && slugsWithReplies.has(p.slug))
		.map((root) => buildThreadTree(root, all))
		.sort((a, b) => new Date(getLatestDate(b)).getTime() - new Date(getLatestDate(a)).getTime())
}
