<script lang="ts">
	import { cn, normalizeError } from '../../utils.js';
	import InputError from './InputError.svelte';
	import InputLabel from './InputLabel.svelte';

	interface Props {
		options?: Array<{ name: string; value: string | number }>;
		selected?: string[];
		placeholder?: string;
		disabled?: boolean;
		label?: string;
		error?: string | null;
		errors?: string | string[] | null;
		required?: boolean;
		class?: string;
		maxBadges?: number;
		onchange?: (selected: string[]) => void;
	}

	let {
		options = [],
		selected = $bindable([]),
		placeholder = 'Select items...',
		disabled = false,
		label,
		error,
		errors,
		required = false,
		class: className = '',
		maxBadges = 3,
		onchange
	}: Props = $props();

	let isOpen = $state(false);
	let searchText = $state('');
	let rootElement: HTMLDivElement | undefined = $state();

	const normalizedError = $derived(normalizeError(error, errors));

	const filteredOptions = $derived(
		searchText
			? options.filter((option) => option.name.toLowerCase().includes(searchText.toLowerCase()))
			: options
	);

	const selectedItems = $derived(
		selected
			.map((value) => ({
				value,
				name: options.find((opt) => opt.value.toString() === value)?.name
			}))
			.filter((item): item is { value: string; name: string } => Boolean(item.name))
	);

	function toggleOption(value: string) {
		if (selected.includes(value)) {
			selected = selected.filter((v) => v !== value);
		} else {
			selected = [...selected, value];
		}
		onchange?.(selected);
	}

	function removeOption(value: string) {
		selected = selected.filter((v) => v !== value);
		onchange?.(selected);
	}

	function handleClickOutside(event: MouseEvent) {
		if (rootElement && !rootElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<fieldset
	class={cn('fieldset w-full', className)}
	data-error={normalizedError ? 'true' : 'false'}
>
	{#if label}
		<InputLabel {required}>{label}</InputLabel>
	{/if}

	<div class="dropdown dropdown-bottom w-full" bind:this={rootElement}>
		<button
			type="button"
			class={cn('btn btn-outline w-full justify-between', normalizedError && 'btn-error')}
			class:btn-disabled={disabled}
			onclick={() => !disabled && (isOpen = !isOpen)}
		>
			{#if selectedItems.length > 0}
				<span class="flex max-w-full flex-wrap gap-1 overflow-hidden">
					{#each selectedItems.slice(0, maxBadges) as item (item.value)}
						<span class="badge badge-primary badge-sm">
							{item.name}
							<span
								role="button"
								tabindex="0"
								class="ml-1 cursor-pointer text-xs"
								aria-label={`Remove ${item.name}`}
								onclick={(e) => {
									e.stopPropagation();
									removeOption(item.value);
								}}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.stopPropagation();
										removeOption(item.value);
									}
								}}
							>
								×
							</span>
						</span>
					{/each}
					{#if selectedItems.length > maxBadges}
						<span class="badge badge-ghost badge-sm">+{selectedItems.length - maxBadges}</span>
					{/if}
				</span>
			{:else}
				<span class="opacity-60">{placeholder}</span>
			{/if}
			<svg
				class={cn('h-4 w-4 transform transition-transform', isOpen && 'rotate-180')}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
				></path>
			</svg>
		</button>

		{#if isOpen && !disabled}
			<div
				class="dropdown-content menu bg-base-100 rounded-box z-[1] mt-1 w-full border p-2 shadow"
			>
				<input
					type="text"
					class="input input-sm mb-2 w-full"
					bind:value={searchText}
					placeholder="Search..."
				/>
				<div class="max-h-48 overflow-y-auto">
					{#each filteredOptions as option (option.value)}
						<label
							class="label hover:bg-base-content/5 cursor-pointer justify-start gap-2 rounded p-2"
						>
							<input
								type="checkbox"
								class="checkbox checkbox-sm"
								checked={selected.includes(option.value.toString())}
								onchange={() => toggleOption(option.value.toString())}
							/>
							<span>{option.name}</span>
						</label>
					{/each}
					{#if filteredOptions.length === 0}
						<div class="p-4 text-center opacity-60">No options found</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>

	<InputError message={normalizedError} />
</fieldset>
