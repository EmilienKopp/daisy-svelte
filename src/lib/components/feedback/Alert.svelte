<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils/cn.js';

	type Variant = 'info' | 'success' | 'warning' | 'error';

	interface Props {
		/** daisyUI alert variant. */
		variant?: Variant;
		/** Bold heading shown above the messages/children. */
		title?: string;
		/** List of messages rendered as a bullet list (deduplicated). */
		messages?: string[];
		/** Visual style: solid (default) | soft | outline | dash. */
		style?: 'solid' | 'soft' | 'outline' | 'dash';
		/** Hide the default variant icon. */
		hideIcon?: boolean;
		class?: string;
		/** Replaces the default icon. */
		icon?: Snippet;
		/** Free-form body content, rendered after messages. */
		children?: Snippet;
	}

	let {
		variant = 'info',
		title,
		messages = [],
		style = 'solid',
		hideIcon = false,
		class: className,
		icon,
		children
	}: Props = $props();

	const variants: Record<Variant, string> = {
		info: 'alert-info',
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error'
	};

	const styles: Record<NonNullable<Props['style']>, string> = {
		solid: '',
		soft: 'alert-soft',
		outline: 'alert-outline',
		dash: 'alert-dash'
	};

	const uniqueMessages = $derived([...new Set(messages)]);
	const classes = $derived(cn('alert', variants[variant], styles[style], className));

	const iconPaths: Record<Variant, string> = {
		info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		warning:
			'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
		error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
	};
</script>

<div role="alert" class={classes}>
	{#if !hideIcon}
		{#if icon}
			{@render icon()}
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="size-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d={iconPaths[variant]}
				/>
			</svg>
		{/if}
	{/if}
	<div>
		{#if title}
			<p class="font-semibold">{title}</p>
		{/if}
		{#if uniqueMessages.length === 1}
			<p class={cn('text-sm', title && 'mt-1')}>{uniqueMessages[0]}</p>
		{:else if uniqueMessages.length > 1}
			<ul class={cn('list-inside list-disc text-sm', title && 'mt-1')}>
				{#each uniqueMessages as message (message)}
					<li>{message}</li>
				{/each}
			</ul>
		{/if}
		{@render children?.()}
	</div>
</div>
