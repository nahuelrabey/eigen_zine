<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>Feed — EigenZine</title>
</svelte:head>

<h1>Feed</h1>

{#each data.posts as post}
	<PostCard {post} />
{/each}
