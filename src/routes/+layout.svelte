<script lang="ts">
	import '../app.css'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { isAuthenticated } from '$lib/auth'

	let { children } = $props()
	let ready = $state(false)

	onMount(() => {
		if (page.url.pathname === '/login' || isAuthenticated()) {
			ready = true
		} else {
			goto('/login')
		}
	})
</script>

{#if ready}
	{#if page.url.pathname !== '/login'}
		<nav>
			<a class="site-title" href="/">EigenZine</a>
			<a href="/feed">Feed</a>
			<a href="/hilos">Polémicas</a>
		</nav>
	{/if}
	{@render children()}
{/if}
