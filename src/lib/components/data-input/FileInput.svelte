<script lang="ts">
	import { cn, normalizeError } from '../../utils.js';
	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

	export interface ExistingFile {
		id: string | number;
		name: string;
		url?: string;
	}

	interface Props {
		label?: string;
		name?: string;
		required?: boolean;
		multiple?: boolean;
		accept?: string;
		files?: FileList | null;
		existingFiles?: ExistingFile[];
		/** Upload progress percentage (0-100). Shows a radial progress when > 0. */
		progress?: number | null;
		error?: string | null;
		errors?: string | string[] | null;
		class?: string;
		fieldsetClass?: string;
		onchange?: (files: FileList | null, e: Event) => void;
		ondelete?: (file: ExistingFile) => void;
		[key: string]: any;
	}

	let {
		label = '',
		name,
		required = false,
		multiple = false,
		accept,
		files = $bindable(null),
		existingFiles = [],
		progress = null,
		error,
		errors,
		class: className = '',
		fieldsetClass = '',
		onchange,
		ondelete,
		...rest
	}: Props = $props();

	const normalizedError = $derived(normalizeError(error, errors));
	const classes = $derived(
		cn('file-input file-input-primary w-full', normalizedError && 'file-input-error', className)
	);

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		files = target.files;
		onchange?.(target.files, e);
	}
</script>

<fieldset
	class={cn('fieldset w-full', fieldsetClass)}
	data-error={normalizedError ? 'true' : 'false'}
>
	{#if label}
		<InputLabel {required}>{label}</InputLabel>
	{/if}
	{#each existingFiles as existing (existing.id)}
		<div class="flex items-center justify-start gap-4">
			<span>{existing.name}</span>
			{#if existing.url}
				<a class="link link-primary" href={existing.url} rel="external" download={existing.name}>
					Download
				</a>
			{/if}
			{#if ondelete}
				<button type="button" class="btn btn-error btn-sm" onclick={() => ondelete(existing)}>
					Delete
				</button>
			{/if}
		</div>
	{/each}
	<div class="flex items-center justify-start gap-4">
		<input
			class={classes}
			{name}
			{accept}
			{required}
			onchange={handleChange}
			{...rest}
			type="file"
			{multiple}
		/>
		{#if progress != null && progress > 0}
			<div
				class="radial-progress text-primary"
				style="--value:{progress};--size:3rem;"
				role="progressbar"
				aria-valuenow={progress}
			>
				{progress}%
			</div>
		{/if}
	</div>
	<InputError message={normalizedError} />
</fieldset>
