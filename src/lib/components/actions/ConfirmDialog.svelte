<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';

	interface Props {
		title: string;
		message?: string;
		confirmText?: string;
		cancelText?: string;
		id?: string;
		disabled?: boolean;
		open?: boolean;
		onConfirm?: () => void;
		onCancel?: () => void;
		/** Trigger element; receives `disabled` and a `show` callback to open the dialog. */
		trigger?: Snippet<[{ disabled?: boolean; show: () => void }]>;
		/** Extra dialog body content, rendered under the message. */
		children?: Snippet;
	}

	let {
		title: titleText,
		message,
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		id,
		disabled = false,
		open = $bindable(false),
		onConfirm,
		onCancel,
		trigger,
		children,
	}: Props = $props();

	/**
	 * Trigger the confirm dialog from outside, on top of using the trigger snippet.
	 * Example:
	 *
	 * let confirm: ConfirmDialog;
	 *
	 * <Button onclick={() => confirm.show()}>Delete</Button>
	 * <ConfirmDialog bind:this={confirm} ... />
	 */
	export function show() {
		open = !disabled;
	}

	export function triggerConfirm() {
		show();
	}

	export function close() {
		open = false;
	}

	let confirmed = false;

	function handleConfirm() {
		confirmed = true;
		onConfirm?.();
		close();
	}

	// The dialog's close event fires for every way the modal closes (cancel
	// button, Escape, backdrop, confirm), so onCancel lives here and is
	// suppressed when the close came from a confirm.
	function handleClose() {
		if (confirmed) {
			confirmed = false;
			return;
		}
		onCancel?.();
	}
</script>

{@render trigger?.({ disabled, show })}

<Modal {id} bind:open onclose={handleClose}>
	{#snippet title()}{titleText}{/snippet}

	{#if message}
		<p>{message}</p>
	{/if}
	{@render children?.()}

	{#snippet actions()}
		<Button variant="ghost" onclick={close}>
			{cancelText}
		</Button>
		<Button onclick={handleConfirm}>
			{confirmText}
		</Button>
	{/snippet}
</Modal>
