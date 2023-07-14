<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { Settings } from '$lib/types';

	let settings: Settings = {
		numOfTeams: 2,
		players: [
			{ id: 1, name: 'One' },
			{ id: 2, name: 'Two' },
			{ id: 3, name: 'Three' },
			{ id: 4, name: 'Four' }
		],
		teams: [],
		quickMode: false
	};
</script>

<Header bind:settings />
<Spinner bind:settings />
