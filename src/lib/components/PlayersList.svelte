<script lang="ts">
	import type { Settings } from '$lib/types';

	export let settings: Settings;
	export let playerString: string;
</script>

<div class="flex flex-col gap-1">
	<label class="flex justify-center gap-5">
		Number of Teams:
		<input
			type="number"
			class="w-24 rounded border border-black pl-1 text-center"
			bind:value={settings.numOfTeams}
			min="2"
			max={playerString.split('\n').filter((line) => line.trim() !== '').length - 1}
		/>
	</label>
	<textarea
		bind:value={playerString}
		class="h-full w-full rounded border border-black p-1"
		placeholder="Enter Players seperated by a new line! Example: 
		Player 1 
		Player 2
				"
	/>
</div>
