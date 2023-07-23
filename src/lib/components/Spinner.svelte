<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import Chart, { type ChartConfiguration, type ChartData } from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	import type { Settings } from '$lib/types';

	export let settings: Settings;
	export let onMakeTeams: () => void;

	let spinner: HTMLCanvasElement;
	let myChart: Chart;

	const data: ChartData = {
		datasets: [
			{
				data: new Array(settings.players.length).fill(10),
				hoverOffset: 2
			}
		],
		labels: settings.players.map((item) => item.name)
	};

	const config: ChartConfiguration = {
		type: 'pie',
		data: data,
		plugins: [ChartDataLabels],
		options: {
			plugins: {
				datalabels: {
					formatter: (_, context) => settings.players[context.dataIndex].name
				},
				legend: {
					display: false
				},
				tooltip: {
					enabled: false
				}
			}
		}
	};

	onMount(async () => {
		const ctx = spinner.getContext('2d');
		if (ctx) myChart = new Chart(ctx, config);
	});

	let spinning = false;
	let hasSpinned = false;

	let angle = tweened(0, { duration: 3000, easing: cubicOut });

	const onSpin = () => {
		if (settings.quickMode) {
			onMakeTeams();
			return;
		}
		spinning = true;
		hasSpinned = true;
		angle
			.update((n) => n + 360 * 10)
			.then(() => {
				spinning = false;
				onMakeTeams();
			});
	};
</script>

<div class="relative mx-auto flex w-1/2 items-center justify-center md:w-80">
	<canvas bind:this={spinner} style="transform: rotate({$angle}deg)">Spinner</canvas>
	{#if !spinning && settings.players.length > 3}
		<button
			in:fade
			out:fade
			on:click={onSpin}
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-black px-4 py-2 text-xl text-white hover:bg-gray-900"
			>{hasSpinned ? 'AGAIN!' : 'SPIN'}</button
		>
	{/if}
</div>
