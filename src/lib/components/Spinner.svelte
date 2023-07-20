<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import Chart, { type ChartConfiguration, type ChartData } from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	import type { Settings } from '$lib/types';

	export let settings: Settings;

	let spinner: HTMLCanvasElement;
	let myChart: Chart;

	const data: ChartData = {
		datasets: [
			{
				data: new Array(settings.players.length).fill(10),
				hoverOffset: 4
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

	let angle = tweened(0, { duration: 4000, easing: cubicOut });

	const onSpin = () => {
		angle.set(0);
		angle.update((n) => n + 60 * 200);
	};
</script>

<div class="relative flex w-1/2 items-center justify-center">
	<canvas bind:this={spinner} style="transform: rotate({$angle}deg)">Spinner</canvas>
	{#if !spinning}
		<button
			on:click={onSpin}
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-black px-4 py-2 text-xl text-white hover:bg-gray-900"
			>SPIN</button
		>
	{/if}
</div>
