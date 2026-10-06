<script lang="ts">
	import { cn, normalizeError } from '../../utils.js';
	import InputError from './InputError.svelte';

	interface Props {
		checked?: boolean;
		label?: string;
		error?: string | null;
		errors?: string | string[] | null;
		class?: string;
		fieldsetClass?: string;
		[key: string]: any;
	}

	let {
		checked = $bindable(false),
		label,
		error,
		errors,
		class: className = '',
		fieldsetClass = '',
		...rest
	}: Props = $props();

	const normalizedError = $derived(normalizeError(error, errors));
</script>

<fieldset class={cn('fieldset', fieldsetClass)} data-error={normalizedError ? 'true' : 'false'}>
	<label class="label cursor-pointer justify-start gap-2">
		<input type="checkbox" class={cn('checkbox', className)} bind:checked {...rest} />
		{#if label}
			<span>{label}</span>
		{/if}
	</label>
	<InputError message={normalizedError} />
</fieldset>
