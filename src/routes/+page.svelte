<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { Settings } from '$lib/types';

	import '../app.css';

	let settings: Settings = {
		numOfTeams: 2,
		players: [],
		teams: [],
		quickMode: false
	};

	let playerString = '';

	$: {
		settings.players = playerString
			.split('\n')
			.filter((line) => line.trim() !== '')
			.map((item, idx) => ({ name: item, id: idx }));
	}
</script>

<Header bind:settings />
<div class="grid grid-flow-row grid-cols-1 grid-rows-3 p-2">
	<div class="h-full">
		{#key playerString}
			<Spinner bind:players={settings.players} />
		{/key}
	</div>
	<textarea
		bind:value={playerString}
		class="w-full rounded border border-black p-1"
		placeholder="Enter Players seperated by a new line! Example: 
Player 1 
Player 2
		"
	/>
	<div />
</div>
