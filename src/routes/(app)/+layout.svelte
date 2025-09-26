<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="https://fav.farm/%F0%9F%94%8C" />
</svelte:head>

<nav>
	<a href="/logout">Log Out</a>
</nav>
{@render children?.()}
