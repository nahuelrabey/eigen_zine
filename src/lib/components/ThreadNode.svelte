<script lang="ts">
	import type { ThreadNode } from '$lib/types'
	import PostCard from './PostCard.svelte'
	import Self from './ThreadNode.svelte'

	let { node }: { node: ThreadNode } = $props()
</script>

<PostCard post={node} />
{#if node.replies.length > 0}
	<div class="replies">
		{#each node.replies as reply}
			<Self node={reply} />
		{/each}
	</div>
{/if}
