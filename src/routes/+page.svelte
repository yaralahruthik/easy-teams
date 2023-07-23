<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import PlayersList from '$lib/components/PlayersList.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import TeamsList from '$lib/components/TeamsList.svelte';
	import type { Settings } from '$lib/types';

	let settings: Settings = {
		numOfTeams: 2,
		players: [],
		teams: [],
		quickMode: false
	};

	let playerString = '';

	$: {
		if (playerString.trim())
			settings.players = playerString
				.split('\n')
				.filter((line) => line.trim() !== '')
				.map((item, idx) => ({ name: item, id: idx }));
		else settings.players = [{ id: 1, name: 'p1' }];
	}

	const shuffleArray = <T>(array: T[]): T[] => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const makeTeams = () => {
		settings.teams = Array.from({ length: settings.numOfTeams }, (_, i) => ({
			name: `Team ${i + 1}`,
			players: []
		}));

		settings.players = shuffleArray(settings.players);

		for (const player of settings.players) {
			const smallestTeamIndex = settings.teams.reduce(
				(minIndex, currentTeam, i, arr) =>
					currentTeam.players.length < arr[minIndex].players.length ? i : minIndex,
				0
			);

			settings.teams[smallestTeamIndex].players.push(player);
		}

		settings = { ...settings };
	};
</script>

<Header bind:settings />
<div class="grid grid-cols-1 grid-rows-3 gap-2 p-2">
	{#key playerString}
		<Spinner bind:settings onMakeTeams={makeTeams} />
	{/key}
	<PlayersList bind:settings bind:playerString />
	{#if settings.teams.length != 0}
		<TeamsList bind:teams={settings.teams} />
	{/if}
</div>
