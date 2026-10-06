<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		id?: string;
		open?: boolean;
		title?: Snippet;
		children?: Snippet;
		actions?: Snippet;
		onclose?: (e?: Event) => void;
		/** Close when clicking the backdrop. */
		closeOnBackdrop?: boolean;
		class?: string;
	}

	let dialog: HTMLDialogElement | undefined = $state();

	let {
		id,
		open = $bindable(false),
		title,
		children,
		actions,
		onclose,
		closeOnBackdrop = true,
		class: css,
	}: Props = $props();

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	});

	export function showModal() {
		open = true;
	}

	export function close() {
		open = false;
	}

	function handleClose(e: Event) {
		open = false;
		onclose?.(e);
	}
</script>

<dialog class="modal" {id} bind:this={dialog} onclose={handleClose}>
	<div class={twMerge('modal-box', css)}>
		{#if title}
			<h3 class="text-lg font-bold">
				{@render title()}
			</h3>
		{/if}
		<div class="py-4">
			{@render children?.()}
		</div>
		{#if actions}
			<div class="modal-action">
				{@render actions()}
			</div>
		{/if}
	</div>

	{#if closeOnBackdrop}
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	{/if}
</dialog>
