<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import Chart, { type ChartConfiguration, type ChartData } from 'chart.js/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	import type { Player } from '$lib/types';

	export let players: Player[];

	let spinner: HTMLCanvasElement;
	let myChart: Chart;

	const data: ChartData = {
		datasets: [
			{
				data: new Array(players.length).fill(10),
				hoverOffset: 2
			}
		],
		labels: players.map((item) => item.name)
	};

	const config: ChartConfiguration = {
		type: 'pie',
		data: data,
		plugins: [ChartDataLabels],
		options: {
			plugins: {
				datalabels: {
					formatter: (_, context) => players[context.dataIndex].name
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

	let angle = tweened(0, { duration: 4000, easing: cubicOut });

	const onSpin = () => {
		spinning = true;
		hasSpinned = true;
		angle.set(0);
		angle
			.update((n) => n + 60 * 200)
			.then(() => {
				spinning = false;
			});
	};
</script>

<div class="relative flex w-1/2 items-center justify-center">
	<canvas bind:this={spinner} style="transform: rotate({$angle}deg)">Spinner</canvas>
	{#if !spinning && players.length > 3}
		<button
			in:fade
			out:fade
			on:click={onSpin}
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-black px-4 py-2 text-xl text-white hover:bg-gray-900"
			>{hasSpinned ? 'AGAIN!' : 'SPIN'}</button
		>
	{/if}
</div>
