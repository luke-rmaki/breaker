<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';

	let { data }: PageProps = $props();

	let name = $state(data.name || '');
</script>

<h1>{data.name}</h1>
<a href="/breaker">Back</a>

<form
	action="?/update"
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				invalidate('app:breaker');
			} else {
				alert('Failed to save');
				// TODO: handle error
			}
		};
	}}
>
	<label for="name">Name</label>
	<input id="name" name="name" type="text" bind:value={name} />

	<button type="submit">Save</button>
</form>
