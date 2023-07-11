<script lang="ts">
	import type { Settings } from '$lib/types';

	export let settings: Settings;
</script>

<header class="flex w-full items-center bg-black p-2 text-white md:relative md:justify-center">
	<h1 class="grow text-xl md:grow-0 md:text-3xl">Easy Teams</h1>
	<label class="flex items-center gap-4 rounded bg-gray-800 p-1 md:absolute md:right-4 md:p-2">
		Quick Mode
		<input class="h-4 w-4 md:h-6 md:w-6" bind:checked={settings.quickMode} type="checkbox" />
	</label>
</header>
