<script lang="ts">
	import { cn, normalizeError } from '../../utils.js';
	import InputError from './InputError.svelte';

	interface Props {
		label?: string;
		checked?: boolean;
		error?: string | null;
		errors?: string | string[] | null;
		required?: boolean;
		class?: string;
		fieldsetClass?: string;
		[key: string]: any;
	}

	let {
		label,
		checked = $bindable(false),
		error,
		errors,
		required = false,
		class: className = '',
		fieldsetClass = '',
		...rest
	}: Props = $props();

	const normalizedError = $derived(normalizeError(error, errors));
</script>

<fieldset
	class={cn('fieldset w-full', fieldsetClass)}
	data-error={normalizedError ? 'true' : 'false'}
>
	<label class="label cursor-pointer justify-start gap-4">
		<input type="checkbox" class={cn('toggle toggle-primary', className)} bind:checked {...rest} />
		{#if label}
			<span>
				{label}
				{#if required}
					<span class="text-error ml-1">*</span>
				{/if}
			</span>
		{/if}
	</label>
	<InputError message={normalizedError} />
</fieldset>
