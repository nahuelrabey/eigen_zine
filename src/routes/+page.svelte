<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'

	if (browser) goto('/feed', { replaceState: true })
</script>

<meta http-equiv="refresh" content="0;url=/feed" />
