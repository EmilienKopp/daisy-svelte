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
		placeholder?: string;
		class?: string;
		fieldsetClass?: string;
		rows?: number;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		[key: string]: any;
	}

	let {
		label = '',
		name = '',
		required = false,
		value = $bindable(''),
		error,
		errors,
		class: className = '',
		fieldsetClass = '',
		placeholder = '',
		rows = 4,
		oninput,
		onchange,
		...rest
	}: Props = $props();

	const normalizedError = $derived(normalizeError(error, errors));
	const classes = $derived(cn('textarea w-full', normalizedError && 'textarea-error', className));
</script>

<fieldset
	class={cn('fieldset w-full', fieldsetClass)}
	data-error={normalizedError ? 'true' : 'false'}
>
	{#if label}
		<InputLabel {required}>{label}</InputLabel>
	{/if}
	<textarea
		class={classes}
		bind:value
		{name}
		{placeholder}
		{rows}
		{required}
		{oninput}
		{onchange}
		{...rest}
	></textarea>
	<InputError message={normalizedError} />
</fieldset>
