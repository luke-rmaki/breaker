<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<title>Breaker</title>

<h2>New Breaker</h2>
<form action="?/create" method="POST" use:enhance>
	<label for="breaker">Breaker name</label>
	<input type="text" name="breaker" required />
	<button type="submit">Create Breaker</button>
</form>

<h2>Your Breakers</h2>
{#if data.breakers && data.breakers.length > 0}
	<ul>
		{#each data.breakers as breaker}
			<li>
				<a href={`/breakers/${breaker.id}`}>{breaker.name}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>You have no breakers. Create one above!</p>
{/if}
