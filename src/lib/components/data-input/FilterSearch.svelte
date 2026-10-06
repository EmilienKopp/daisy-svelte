<script lang="ts">
	import { onMount } from 'svelte';
	import Input from './Input.svelte';

	interface Props {
		searchHandler: (query: string) => void;
		clearHandler?: () => void;
		q?: string;
		/** URL query param to sync with (set to empty string to disable syncing). */
		paramKey?: string;
		alwaysDynamic?: boolean;
		alwaysStatic?: boolean;
		placeholder?: string;
	}

	let {
		searchHandler,
		clearHandler,
		q = $bindable(''),
		paramKey = 'q',
		alwaysDynamic = false,
		alwaysStatic = false,
		placeholder = ''
	}: Props = $props();

	let prefersReducedMotion = $state(false);
	let dynamicEnabled = $state(false);
	const title = $derived(dynamicEnabled ? 'Filter while typing' : 'Filter on Search only');
	const showToggle = $derived(!prefersReducedMotion && !alwaysDynamic && !alwaysStatic);

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		dynamicEnabled = alwaysStatic ? false : alwaysDynamic || !prefersReducedMotion;
		if (paramKey) {
			q = new URLSearchParams(window.location.search).get(paramKey) ?? q;
		}
	});

	function setParam(value: string | null) {
		if (!paramKey || typeof window === 'undefined') return;
		const url = new URL(window.location.href);
		if (value) {
			url.searchParams.set(paramKey, value);
		} else {
			url.searchParams.delete(paramKey);
		}
		history.replaceState(history.state, '', url);
	}

	function search(e?: Event) {
		e?.preventDefault();
		setParam(q || null);
		searchHandler(q);
	}

	function clear() {
		q = '';
		setParam(null);
		clearHandler?.();
	}
</script>

<form class="flex items-center gap-2" onsubmit={search}>
	{#if showToggle}
		<label class="swap swap-rotate" {title}>
			<input type="checkbox" bind:checked={dynamicEnabled} />
			<span class="swap-on">⚡️</span>
			<span class="swap-off">🔄</span>
		</label>
	{/if}
	<Input
		type="search"
		name="search"
		{placeholder}
		bind:value={q}
		oninput={() => dynamicEnabled && search()}
	/>
	<button class="btn btn-ghost" type="button" onclick={clear}>Clear</button>
	<button class="btn btn-outline" type="submit">Search</button>
</form>
