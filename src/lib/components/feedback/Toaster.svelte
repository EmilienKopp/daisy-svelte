<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn } from '../../utils/cn.js';
	import { toast, type ToastVariant } from './toast.svelte.js';

	type Position =
		| 'top-start'
		| 'top-center'
		| 'top-end'
		| 'bottom-start'
		| 'bottom-center'
		| 'bottom-end';

	interface Props {
		/** Corner where toasts stack. Default 'top-end'. */
		position?: Position;
		/** Show a close button on each toast. Default true. */
		dismissible?: boolean;
		class?: string;
	}

	let { position = 'top-end', dismissible = true, class: className }: Props = $props();

	const positions: Record<Position, string> = {
		'top-start': 'toast-top toast-start',
		'top-center': 'toast-top toast-center',
		'top-end': 'toast-top toast-end',
		'bottom-start': 'toast-bottom toast-start',
		'bottom-center': 'toast-bottom toast-center',
		'bottom-end': 'toast-bottom toast-end'
	};

	const alertVariants: Record<ToastVariant, string> = {
		info: 'alert-info',
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error'
	};

	const iconPaths: Record<ToastVariant, string> = {
		info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		warning:
			'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
		error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
	};

	const flyX = $derived(position.endsWith('start') ? -100 : position.endsWith('end') ? 100 : 0);
	const flyY = $derived(position.endsWith('center') ? (position.startsWith('top') ? -50 : 50) : 0);
</script>

{#if toast.items.length > 0}
	<div class={cn('toast z-[999]', positions[position], className)}>
		{#each toast.items as item (item.id)}
			<div
				role="alert"
				class={cn('alert', alertVariants[item.variant], item.class)}
				transition:fly={{ x: flyX, y: flyY }}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-5 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={iconPaths[item.variant]}
					/>
				</svg>
				<div>
					<p>{item.message}</p>
					{#if item.hint}
						<p class="text-xs opacity-70">{item.hint}</p>
					{/if}
				</div>
				{#if item.action}
					<button
						type="button"
						class="btn btn-sm"
						onclick={() => {
							item.action?.onclick();
							toast.dismiss(item.id);
						}}
					>
						{item.action.label}
					</button>
				{/if}
				{#if dismissible}
					<button
						type="button"
						class="btn btn-ghost btn-xs btn-circle"
						aria-label="Dismiss notification"
						onclick={() => toast.dismiss(item.id)}
					>
						✕
					</button>
				{/if}
			</div>
		{/each}
	</div>
{/if}
