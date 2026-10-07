<script lang="ts">
	import type { Snippet } from 'svelte';
	import clsx from 'clsx';
	import { cn } from '../../utils/cn.js';

	interface Props {
		/** Tooltip text (rendered via CSS, no JS positioning). */
		tip: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		/** daisyUI tooltip color. */
		color?:
			| 'neutral'
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/** Force the tooltip visible. */
		open?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { tip, position = 'top', color, open = false, class: className, children }: Props = $props();

	const classes = $derived(
		cn(
			'tooltip',
			clsx({
				'tooltip-bottom': position === 'bottom',
				'tooltip-left': position === 'left',
				'tooltip-right': position === 'right',
				'tooltip-neutral': color === 'neutral',
				'tooltip-primary': color === 'primary',
				'tooltip-secondary': color === 'secondary',
				'tooltip-accent': color === 'accent',
				'tooltip-info': color === 'info',
				'tooltip-success': color === 'success',
				'tooltip-warning': color === 'warning',
				'tooltip-error': color === 'error',
				'tooltip-open': open,
			}),
			className,
		),
	);
</script>

<div class={classes} data-tip={tip}>
	{@render children?.()}
</div>
