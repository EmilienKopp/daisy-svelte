<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, normalizeError, readable } from '../../utils.js';
	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

	export interface SelectOption {
		value: any;
		name?: string;
	}

	interface Props {
		label?: string;
		options?: SelectOption[] | Record<string, string | number>;
		items?: any[];
		mapping?: { valueColumn: string; labelColumn: string };
		value?: any;
		placeholder?: string;
		error?: string | null;
		errors?: string | string[] | null;
		required?: boolean;
		class?: string;
		fieldsetClass?: string;
		hidden?: boolean;
		onchange?: (e: Event) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		label,
		options = [],
		items,
		mapping,
		value = $bindable(),
		placeholder = 'Select something',
		error,
		errors,
		required = false,
		class: className = '',
		fieldsetClass = '',
		hidden = false,
		onchange,
		children,
		...rest
	}: Props = $props();

	const normalizedError = $derived(normalizeError(error, errors));
	const classes = $derived(cn('select w-full', normalizedError && 'select-error', className));

	const resolvedOptions: SelectOption[] = $derived.by(() => {
		if (Array.isArray(options) && options.length) return options;
		if (items && mapping) {
			return items.map((item) => ({
				value: item[mapping.valueColumn],
				name: item[mapping.labelColumn]
			}));
		}
		if (options && !Array.isArray(options)) {
			return Object.entries(options).map(([key, val]) => ({
				value: val.toString(),
				name: readable(key)
			}));
		}
		return Array.isArray(options) ? options : [];
	});
</script>

<fieldset
	class={cn('fieldset w-full', fieldsetClass)}
	data-error={normalizedError ? 'true' : 'false'}
>
	{#if label && !hidden}
		<InputLabel {required}>{label}</InputLabel>
	{/if}
	<select
		class={classes}
		class:hidden
		name={rest.name}
		{required}
		{...rest}
		bind:value
		onchange={(e) => onchange?.(e)}
	>
		{#if placeholder}
			<option disabled value="">{placeholder}</option>
		{/if}
		{#if children}
			{@render children()}
		{:else}
			{#each resolvedOptions as option, index (option.value)}
				<option value={option.value} id={rest.name ? `${rest.name}-option-${index}` : undefined}>
					{option.name ?? option.value}
				</option>
			{/each}
		{/if}
	</select>
	<InputError message={normalizedError} />

	{#if hidden}
		<input type="hidden" name={rest.name} {value} />
	{/if}
</fieldset>
