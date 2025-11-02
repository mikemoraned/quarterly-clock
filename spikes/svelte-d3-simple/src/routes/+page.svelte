<script lang="ts">
	import Clock from '$lib/Clock.svelte';
</script>

<Clock />

<style>
	:global(html),
	:global(body) {
		margin: 0;
		width: 100vw;
		height: 100vh;
	}
	:global(body) {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
