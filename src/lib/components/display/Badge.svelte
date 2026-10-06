<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../../utils.js';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** daisyUI badge color */
		variant?:
			| 'neutral'
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'info'
			| 'success'
			| 'warning'
			| 'error'
			| 'ghost';
		/** daisyUI badge style */
		style?: 'solid' | 'outline' | 'soft' | 'dash';
		/** Badge size */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		style = 'solid',
		size = 'md',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const classes = $derived(
		cn(
			'badge',
			{
				'badge-neutral': variant === 'neutral',
				'badge-primary': variant === 'primary',
				'badge-secondary': variant === 'secondary',
				'badge-accent': variant === 'accent',
				'badge-info': variant === 'info',
				'badge-success': variant === 'success',
				'badge-warning': variant === 'warning',
				'badge-error': variant === 'error',
				'badge-ghost': variant === 'ghost'
			},
			{
				'badge-outline': style === 'outline',
				'badge-soft': style === 'soft',
				'badge-dash': style === 'dash'
			},
			{
				'badge-xs': size === 'xs',
				'badge-sm': size === 'sm',
				'badge-lg': size === 'lg',
				'badge-xl': size === 'xl'
			},
			className
		)
	);
</script>

<span class={classes} {...rest}>
	{@render children?.()}
</span>
