<script lang="ts">
	import type { Post } from '$lib/types'
	import { getAllPosts } from '$lib/content'

	let { post }: { post: Post } = $props()

	const posts = getAllPosts()
	const parentPosts = $derived(
		post.reply_to.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined)
	)
</script>

<article>
	<span class="tipo">{post.type}</span>
	<h2><a href="/textos/{post.slug}">{post.title}</a></h2>
	<p class="meta">{post.author} · {post.date_published}</p>
	{#if parentPosts.length > 0}
		<p class="respuesta-a">
			En respuesta a:
			{#each parentPosts as parent, i}
				<a href="/textos/{parent.slug}">{parent.title}</a>{i < parentPosts.length - 1 ? ', ' : ''}
			{/each}
		</p>
	{/if}
</article>
