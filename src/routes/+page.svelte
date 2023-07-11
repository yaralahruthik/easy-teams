<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { Settings } from '$lib/types';

	let settings: Settings = {
		numOfTeams: 2,
		players: [],
		teams: [],
		quickMode: false
	};
</script>

<Header bind:settings />
