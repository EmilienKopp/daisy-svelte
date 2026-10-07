<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		variant?:
			| 'default'
			| 'base'
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'danger'
			| 'destructive'
			| 'ghost'
			| 'link';
		outline?: 'outline' | 'soft' | 'dash' | 'ghost' | boolean;
		size?: 'default' | 'xs' | 'sm' | 'lg' | 'xl' | 'icon';
		children?: Snippet;
		href?: string;
		onclick?: (e: MouseEvent) => void;
		loading?: boolean;
		[key: string]: any;
	}

	let {
		variant = 'primary',
		outline = undefined,
		size = 'default',
		children,
		onclick,
		href,
		loading,
		type = 'button',
		...rest
	}: Props = $props();

	const variantClass = $derived(
		variant === 'ghost' || outline === 'ghost'
			? 'btn-ghost'
			: clsx({
					'btn-primary': variant === 'primary' || variant === 'default',
					'btn-secondary': variant === 'secondary',
					'btn-accent': variant === 'accent',
					'btn-neutral': variant === 'neutral',
					'btn-info': variant === 'info',
					'btn-success': variant === 'success',
					'btn-warning': variant === 'warning',
					'btn-error': variant === 'danger' || variant === 'destructive',
					'btn-link': variant === 'link',
					'btn-outline': outline === true || outline === 'outline',
					'btn-soft': outline === 'soft',
					'btn-dash': outline === 'dash',
				}),
	);

	const sizeClass = $derived(
		clsx({
			'btn-xs': size === 'xs',
			'btn-sm': size === 'sm',
			'btn-lg': size === 'lg',
			'btn-xl': size === 'xl',
			'btn-square': size === 'icon',
		}),
	);

	const className = $derived(twMerge('btn', variantClass, sizeClass, rest.class));
</script>

{#if href}
	<a
		{...rest}
		{href}
		{onclick}
		aria-disabled={loading || undefined}
		class={twMerge(className, loading ? 'btn-disabled' : '')}
	>
		{#if loading}
			<span class="loading loading-spinner"></span>
		{/if}
		{@render children?.()}
	</a>
{:else}
	<button disabled={loading} {...rest} {type} {onclick} class={className}>
		{#if loading}
			<span class="loading loading-spinner"></span>
		{/if}
		{@render children?.()}
	</button>
{/if}
