<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { Team } from '$lib/types';

	export let teams: Team[];
</script>

<div
	in:fly={{ y: -200, duration: 1000 }}
	class="flex flex-wrap justify-between rounded border border-black p-1"
>
	{#each teams as team}
		<div>
			<p>{team.name}</p>
			{#each team.players as player (player.id)}
				<p in:fly={{ y: -200, duration: 1500 }}>{player.name}</p>
			{/each}
		</div>
	{/each}
</div>
