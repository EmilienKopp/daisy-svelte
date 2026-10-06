<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils.js';

	interface Props {
		/** Tooltip text (ignored when the content snippet is given) */
		text?: string;
		/** Rich tooltip content */
		content?: Snippet;
		/** The element the tooltip wraps */
		children?: Snippet;
		/** Tooltip placement */
		position?: 'top' | 'bottom' | 'left' | 'right';
		/** daisyUI tooltip color */
		variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/** Force the tooltip open */
		open?: boolean;
		class?: string;
	}

	let {
		text,
		content,
		children,
		position = 'top',
		variant,
		open = false,
		class: className = ''
	}: Props = $props();
</script>

<div
	class={cn(
		'tooltip',
		{
			'tooltip-top': position === 'top',
			'tooltip-bottom': position === 'bottom',
			'tooltip-left': position === 'left',
			'tooltip-right': position === 'right'
		},
		{
			'tooltip-neutral': variant === 'neutral',
			'tooltip-primary': variant === 'primary',
			'tooltip-secondary': variant === 'secondary',
			'tooltip-accent': variant === 'accent',
			'tooltip-info': variant === 'info',
			'tooltip-success': variant === 'success',
			'tooltip-warning': variant === 'warning',
			'tooltip-error': variant === 'error'
		},
		open && 'tooltip-open',
		className
	)}
	data-tip={content ? undefined : text}
>
	{#if content}
		<div class="tooltip-content">
			{@render content()}
		</div>
	{/if}
	{@render children?.()}
</div>
