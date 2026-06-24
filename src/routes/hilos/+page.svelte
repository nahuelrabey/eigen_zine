<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>Polémicas — EigenZine</title>
</svelte:head>

<h1>Polémicas</h1>
<p class="meta">Textos que generaron debate. Hacé click para ver el hilo completo.</p>

{#each data.threads as thread}
	<article class="thread-root">
		<span class="tipo">{thread.type}</span>
		<h2>
			<a href="/hilos/{thread.slug}">{thread.title}</a>
			<span class="thread-count">{thread.totalReplies} {thread.totalReplies === 1 ? 'respuesta' : 'respuestas'}</span>
		</h2>
		<p class="meta">{thread.author} · {thread.date_published}</p>
	</article>
{:else}
	<p>Todavía no hay polémicas.</p>
{/each}
