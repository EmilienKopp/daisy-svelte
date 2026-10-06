<script lang="ts">
	import { cn, normalizeError } from '../../utils.js';
	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

	interface Props {
		label?: string;
		name?: string;
		required?: boolean;
		value?: string;
		error?: string | null;
		errors?: string | string[] | null;
		class?: string;
		fieldsetClass?: string;
		placeholder?: string;
		revealable?: boolean;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		[key: string]: any;
	}

	let {
		label = '',
		name,
		required = false,
		value = $bindable(''),
		error,
		errors,
		class: className = '',
		fieldsetClass = '',
		placeholder = 'Enter password',
		revealable = true,
		onchange,
		oninput,
		...rest
	}: Props = $props();

	let showPassword = $state(false);

	const normalizedError = $derived(normalizeError(error, errors));
	const classes = $derived(
		cn('input w-full', revealable && 'pr-10', normalizedError && 'input-error', className)
	);
</script>

<fieldset
	class={cn('fieldset w-full', fieldsetClass)}
	data-error={normalizedError ? 'true' : 'false'}
>
	{#if label}
		<InputLabel {required}>{label}</InputLabel>
	{/if}
	<div class="relative">
		{#if showPassword}
			<input
				type="text"
				class={classes}
				{name}
				bind:value
				{onchange}
				{oninput}
				{placeholder}
				{required}
				{...rest}
			/>
		{:else}
			<input
				type="password"
				class={classes}
				{name}
				bind:value
				{onchange}
				{oninput}
				{placeholder}
				{required}
				{...rest}
			/>
		{/if}
		{#if revealable}
			<button
				type="button"
				onclick={() => (showPassword = !showPassword)}
				class="absolute inset-y-0 right-0 z-10 flex items-center rounded-r-md px-3 opacity-60 hover:opacity-100 focus-visible:outline-none"
				aria-label={showPassword ? 'Hide password' : 'Show password'}
				tabindex={-1}
			>
				{#if showPassword}
					<!-- eye-off -->
					<svg
						class="size-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						viewBox="0 0 24 24"
					>
						<path
							d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
						/>
						<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
						<path
							d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
						/>
						<path d="m2 2 20 20" />
					</svg>
				{:else}
					<!-- eye -->
					<svg
						class="size-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						viewBox="0 0 24 24"
					>
						<path
							d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
						/>
						<circle cx="12" cy="12" r="3" />
					</svg>
				{/if}
			</button>
		{/if}
	</div>
	<InputError message={normalizedError} />
</fieldset>
