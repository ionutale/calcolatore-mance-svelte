<script lang="ts">
	import { onMount } from 'svelte';

	// Stato dell'applicazione
	let waiters: { id: number; name: string; points: number }[] = [];
	let totalTips = '';
	let waiterName = '';
	let waiterPoints = '';
	let sortBy = 'name';
	let sortDirection = 'asc';
	let theme = 'light';

	// Elementi DOM per la notifica
	let alertMessage = '';
	let showAlert = false;

	// Funzione per mostrare notifiche
	function displayAlert(message: string) {
		alertMessage = message;
		showAlert = true;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	}

	// Funzione per formattare la valuta
	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
	}

	// Funzione per salvare nello storage
	function saveToStorage() {
		localStorage.setItem('waiters', JSON.stringify(waiters));
		localStorage.setItem('totalTips', totalTips);
		localStorage.setItem('color-theme', theme);
	}

	// Funzione per caricare dallo storage
	function loadFromStorage() {
		const storedWaiters = localStorage.getItem('waiters');
		const storedTotalTips = localStorage.getItem('totalTips');
		const storedTheme = localStorage.getItem('color-theme');

		if (storedWaiters) {
			waiters = JSON.parse(storedWaiters);
		}
		if (storedTotalTips) {
			totalTips = storedTotalTips;
		}
		if (storedTheme) {
			theme = storedTheme;
			updateTheme();
		}
	}

	// Funzione per aggiornare il tema
	function updateTheme() {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	// Funzione per aggiungere un cameriere
	function addWaiter() {
		const name = waiterName.trim();
		const points = parseInt(waiterPoints);

		if (!name) {
			displayAlert('Per favore, inserisci un nome.');
			return;
		}
		if (isNaN(points) || points < 1 || points > 10) {
			displayAlert('I punti devono essere un numero tra 1 e 10.');
			return;
		}

		waiters = [...waiters, { id: Date.now(), name, points }];
		waiterName = '';
		waiterPoints = '';
		saveToStorage();
	}

	// Funzione per rimuovere un cameriere
	function removeWaiter(id: number) {
		waiters = waiters.filter(waiter => waiter.id !== id);
		saveToStorage();
	}

	// Funzione per calcolare le quote
	function calculateShares() {
		const tips = parseFloat(totalTips);
		if (isNaN(tips) || tips <= 0 || waiters.length === 0) {
			return {};
		}

		const totalPoints = waiters.reduce((sum, waiter) => sum + waiter.points, 0);
		const tipPerPoint = totalPoints > 0 ? tips / totalPoints : 0;

		const shares: { [key: number]: string } = {};
		waiters.forEach(waiter => {
			shares[waiter.id] = formatCurrency(waiter.points * tipPerPoint);
		});

		return shares;
	}

	// Funzione per resettare tutto
	function reset() {
		waiters = [];
		totalTips = '';
		waiterName = '';
		waiterPoints = '';
		localStorage.removeItem('waiters');
		localStorage.removeItem('totalTips');
	}

	// Funzione per ordinare
	function sortWaiters(newSortBy: string) {
		if (sortBy === newSortBy) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = newSortBy;
			sortDirection = 'asc';
		}
	}

	// Funzione per toggle tema
	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		updateTheme();
		saveToStorage();
	}

	// Calcola le quote reattivamente
	$: shares = calculateShares();
	$: totalPoints = waiters.reduce((sum, waiter) => sum + waiter.points, 0);
	$: tipPerPoint = totalPoints > 0 && parseFloat(totalTips) > 0 ? parseFloat(totalTips) / totalPoints : 0;

	// Lista ordinata dei camerieri
	$: sortedWaiters = [...waiters].sort((a, b) => {
		const aValue = sortBy === 'name' ? a.name.toLowerCase() : a.points;
		const bValue = sortBy === 'name' ? b.name.toLowerCase() : b.points;
		let comparison = 0;
		if (aValue > bValue) comparison = 1;
		else if (aValue < bValue) comparison = -1;
		return sortDirection === 'asc' ? comparison : comparison * -1;
	});

	// Inizializzazione
	onMount(() => {
		loadFromStorage();
	});
</script>

<div class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-6">

	<!-- Intestazione -->
	<div class="text-center relative">
		<h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Calcolatore Mance Staff</h1>
		<p class="text-gray-500 dark:text-gray-400 mt-1">Dividi le mance in modo equo e veloce.</p>
		<button
			on:click={toggleTheme}
			class="absolute top-0 right-0 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition"
			aria-label="Cambia tema {theme === 'light' ? 'scuro' : 'chiaro'}"
		>
			<svg class="h-6 w-6 {theme === 'light' ? 'hidden' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
			<svg class="h-6 w-6 {theme === 'dark' ? 'hidden' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
			</svg>
		</button>
	</div>

	<!-- Sezione Input Principale -->
	<div class="space-y-4">
		<div>
			<label for="total-tips" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Totale Mance da Dividere (€)</label>
			<input
				type="number"
				id="total-tips"
				placeholder="Es. 350.50"
				bind:value={totalTips}
				on:input={saveToStorage}
				class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
			/>
		</div>
	</div>

	<!-- Aggiungi Cameriere -->
	<div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
		<h3 class="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-3">Aggiungi Membro Staff</h3>
		<div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
			<div class="md:col-span-6">
				<label for="waiter-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
				<input
					type="text"
					id="waiter-name"
					placeholder="Mario Rossi"
					bind:value={waiterName}
					class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
				/>
			</div>
			<div class="md:col-span-3">
				<label for="waiter-points" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Punti</label>
				<input
					type="number"
					id="waiter-points"
					min="1"
					max="10"
					placeholder="1-10"
					bind:value={waiterPoints}
					on:keydown={(e) => e.key === 'Enter' && addWaiter()}
					class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
				/>
			</div>
			<div class="md:col-span-3">
				<button
					on:click={addWaiter}
					class="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:scale-105"
				>
					Aggiungi
				</button>
			</div>
		</div>
	</div>

	<!-- Lista Staff e Risultati -->
	<div>
		<div class="flex justify-between items-center mb-3">
			<h3 class="font-semibold text-lg text-gray-700 dark:text-gray-200">Staff e Quote</h3>
			<div class="flex gap-2">
				<button
					on:click={() => sortWaiters('name')}
					class="sort-btn flex items-center gap-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition {sortBy === 'name' ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white' : ''}"
				>
					Nome <span class="sort-arrow">{sortBy === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</button>
				<button
					on:click={() => sortWaiters('points')}
					class="sort-btn flex items-center gap-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition {sortBy === 'points' ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white' : ''}"
				>
					Punti <span class="sort-arrow">{sortBy === 'points' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</span>
				</button>
			</div>
		</div>
		<div id="waiters-list" class="space-y-3 min-h-[100px] bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-dashed dark:border-gray-600">
			{#if sortedWaiters.length === 0}
				<p class="text-center text-gray-500 dark:text-gray-400">Nessun membro dello staff ancora aggiunto.</p>
			{:else}
				{#each sortedWaiters as waiter}
					<div class="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border dark:border-gray-600 fade-in">
						<div class="flex items-center gap-3">
							<span class="font-semibold text-gray-800 dark:text-gray-100">{waiter.name}</span>
							<span class="text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium px-2 py-1 rounded-full">{waiter.points} Punti</span>
						</div>
						<div class="flex items-center gap-3">
							<span class="font-bold text-lg text-green-600 dark:text-green-400">{shares[waiter.id] || ''}</span>
							<button
								on:click={() => removeWaiter(waiter.id)}
								class="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-100 dark:hover:bg-gray-600 transition"
								aria-label="Rimuovi {waiter.name} dalla lista"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
							</button>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<!-- Riepilogo Calcolo -->
	{#if parseFloat(totalTips) > 0 && sortedWaiters.length > 0}
		<div class="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-lg">
			<p class="font-medium text-blue-800 dark:text-blue-300">Totale Punti: <span class="font-bold">{totalPoints}</span></p>
			<p class="font-medium text-blue-800 dark:text-blue-300">Valore per Punto: <span class="font-bold">{formatCurrency(tipPerPoint)}</span></p>
		</div>
	{/if}

	<!-- Pulsanti Azione -->
	<div class="flex flex-col sm:flex-row gap-4 pt-4 border-t dark:border-gray-700">
		<button
			on:click={() => {}}
			disabled={sortedWaiters.length === 0}
			class="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
		>
			Calcola Divisione
		</button>
		<button
			on:click={reset}
			class="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition transform hover:scale-105"
		>
			Reset
		</button>
	</div>
</div>

<!-- Notifica Toast personalizzata -->
{#if showAlert}
	<div class="fixed bottom-5 right-5 bg-red-600 text-white py-3 px-5 rounded-lg shadow-lg z-50">
		<p>{alertMessage}</p>
	</div>
{/if}