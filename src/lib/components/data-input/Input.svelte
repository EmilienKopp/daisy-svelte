<script lang="ts">
	import { cn, normalizeError } from '../../utils.js';
	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

	interface Props {
		label?: string;
		name?: string;
		id?: string;
		required?: boolean;
		value?: string | number | File | null | Date;
		error?: string | null;
		errors?: string | string[] | null;
		class?: string;
		fieldsetClass?: string;
		hint?: string;
		placeholder?: string;
		type?:
			| 'text'
			| 'number'
			| 'file'
			| 'search'
			| 'tel'
			| 'url'
			| 'email'
			| 'password'
			| 'date'
			| 'time'
			| 'datetime-local'
			| 'month'
			| 'week'
			| 'color';
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		[key: string]: any;
	}

	let {
		label = '',
		name,
		id,
		required = false,
		value = $bindable(),
		error,
		errors,
		type = 'text',
		class: className = '',
		fieldsetClass = '',
		placeholder = '',
		hint = '',
		onchange,
		oninput,
		...rest
	}: Props = $props();

	const inputName = $derived(name ?? id);
	const inputId = $derived(id ?? name);
	const normalizedError = $derived(normalizeError(error, errors));
	const classes = $derived(cn('input w-full', normalizedError && 'input-error', className));
	const fieldsetClasses = $derived(cn('fieldset w-full', fieldsetClass));
</script>

<fieldset class={fieldsetClasses} data-error={normalizedError ? 'true' : 'false'}>
	{#if label}
		<InputLabel {required}>{label}</InputLabel>
	{/if}
	<input
		class={classes}
		name={inputName}
		id={inputId}
		bind:value
		{onchange}
		{oninput}
		{placeholder}
		{required}
		{...rest}
		{type}
	/>
	{#if hint}
		<p class="label">{hint}</p>
	{/if}
	<InputError message={normalizedError} />
</fieldset>
