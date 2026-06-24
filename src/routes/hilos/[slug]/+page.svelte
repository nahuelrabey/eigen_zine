<script lang="ts">
	import ThreadNode from '$lib/components/ThreadNode.svelte'
	import { getPostComponent } from '$lib/content'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const PostContent = $derived(getPostComponent(data.thread.slug))
</script>

<svelte:head>
	<title>{data.thread.title} — EigenZine</title>
</svelte:head>

<a class="back-link" href="/hilos">← Polémicas</a>

<article>
	<span class="tipo">{data.thread.type}</span>
	<h1>{data.thread.title}</h1>
	<p class="meta">{data.thread.author} · {data.thread.date_published}</p>

	<div class="post-content">
		{#if PostContent}
			<PostContent />
		{/if}
	</div>
</article>

{#if data.thread.replies.length > 0}
	<section>
		<h2>
			{data.thread.replies.length === 1
				? '1 respuesta'
				: `${data.thread.replies.length} respuestas`}
		</h2>
		<div class="replies">
			{#each data.thread.replies as reply}
				<ThreadNode node={reply} />
			{/each}
		</div>
	</section>
{/if}
