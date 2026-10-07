<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils/cn.js';

	interface Props {
		src?: string | null;
		alt?: string;
		/** Fallback text (e.g. initials) shown when there is no image. */
		fallback?: string;
		/** Classes for the sizing/shape div. Default `w-10 rounded-full`. */
		class?: string;
		/** Classes for the outer `.avatar` container. */
		containerClass?: string;
		onerror?: (e: Event) => void;
		/** Custom fallback content; wins over `fallback`. */
		children?: Snippet;
	}

	let {
		src,
		alt = '',
		fallback,
		class: className,
		containerClass,
		onerror,
		children,
	}: Props = $props();

	const showImage = $derived(!!src);
</script>

<div class={cn('avatar', !showImage && 'avatar-placeholder', containerClass)}>
	<div
		class={cn(
			!showImage && 'bg-neutral text-neutral-content',
			'w-10 rounded-full',
			className,
		)}
	>
		{#if showImage}
			<img {src} {alt} {onerror} />
		{:else if children}
			{@render children()}
		{:else}
			<span>{fallback}</span>
		{/if}
	</div>
</div>
