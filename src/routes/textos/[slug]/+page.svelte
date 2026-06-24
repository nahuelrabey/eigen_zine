<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte'
	import { getPostComponent, getPostBySlug } from '$lib/content'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const PostContent = $derived(getPostComponent(data.post.slug))
	const parentPosts = $derived(
		data.post.reply_to.map((slug) => getPostBySlug(slug)).filter((p) => p !== undefined)
	)
</script>

<svelte:head>
	<title>{data.post.title} — EigenZine</title>
</svelte:head>

<a class="back-link" href="/feed">← Feed</a>

<article>
	<span class="tipo">{data.post.type}</span>
	<h1>{data.post.title}</h1>
	<p class="meta">{data.post.author} · {data.post.date_published}</p>

	{#if parentPosts.length > 0}
		<p class="respuesta-a">
			En respuesta a:
			{#each parentPosts as parent, i}
				<a href="/textos/{parent.slug}">{parent.title}</a>{i < parentPosts.length - 1 ? ', ' : ''}
			{/each}
		</p>
	{/if}

	<div class="post-content">
		{#if PostContent}
			<PostContent />
		{/if}
	</div>
</article>

{#if data.replies.length > 0}
	<section>
		<h2>
			{data.replies.length === 1 ? '1 respuesta' : `${data.replies.length} respuestas`}
		</h2>
		{#each data.replies as reply}
			<PostCard post={reply} />
		{/each}
	</section>
{/if}
