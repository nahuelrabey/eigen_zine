<script lang="ts">
	import { goto } from '$app/navigation'
	import { checkPassword, setAuth } from '$lib/auth'

	let input = $state('')
	let error = $state(false)

	function submit(e: Event) {
		e.preventDefault()
		if (checkPassword(input)) {
			setAuth()
			goto('/feed')
		} else {
			error = true
			input = ''
		}
	}
</script>

<svelte:head>
	<title>EigenZine</title>
</svelte:head>

<div class="login-wrap">
	<h1>EigenZine</h1>
	<form onsubmit={submit}>
		<input
			type="password"
			bind:value={input}
			placeholder="Contraseña"
			autocomplete="current-password"
		/>
		<button type="submit">Entrar</button>
	</form>
	{#if error}
		<p class="login-error">Contraseña incorrecta.</p>
	{/if}
</div>

<style>
	.login-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		gap: 1.5rem;
	}

	h1 {
		font-size: 2rem;
		margin: 0;
	}

	form {
		display: flex;
		gap: 0.5rem;
	}

	input {
		font-family: inherit;
		font-size: 1rem;
		padding: 0.4rem 0.75rem;
		border: 1px solid #aaa;
		background: #fafaf8;
	}

	button {
		font-family: inherit;
		font-size: 1rem;
		padding: 0.4rem 1rem;
		background: #1a1a1a;
		color: #fafaf8;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background: #333;
	}

	.login-error {
		color: #c00;
		font-size: 0.9rem;
		margin: 0;
	}
</style>
