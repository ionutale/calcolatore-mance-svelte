<script>
	import TipCalculator from '$lib/TipCalculator.svelte';
</script>

<svelte:head>
	<title>Calcolatore Mance Staff</title>
	<meta name="description" content="Dividi le mance in modo equo e veloce tra i membri dello staff" />
</svelte:head>

<main class="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen p-4 transition-colors duration-300">
	<TipCalculator />
</main>
