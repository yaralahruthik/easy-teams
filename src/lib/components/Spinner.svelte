<script lang="ts">
	import Chart, { type ChartConfiguration, type ChartData } from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	import type { Settings } from '$lib/types';
	import { onMount } from 'svelte';

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

	const onSpin = () => {};
</script>

<div class="relative w-1/2">
	<canvas bind:this={spinner}>Spinner</canvas>
	<button
		on:click={onSpin}
		class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-sm bg-black px-4 py-2 text-3xl text-white hover:bg-gray-900"
		>Spin</button
	>
</div>
