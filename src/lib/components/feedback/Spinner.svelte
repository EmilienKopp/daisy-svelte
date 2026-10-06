<script lang="ts">
	import { cn } from '../../utils/cn.js';

	type Variant =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';
	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type Type = 'spinner' | 'dots' | 'bars' | 'ring' | 'ball' | 'infinity';

	interface Props {
		/** daisyUI color variant (maps to text-* color). */
		variant?: Variant;
		/** Loading size: xs | sm | md | lg | xl. */
		size?: Size;
		/** Loading animation type: spinner | dots | bars | ring | ball | infinity. */
		type?: Type;
		class?: string;
	}

	let { variant = 'primary', size = 'md', type = 'spinner', class: className }: Props = $props();

	const variants: Record<Variant, string> = {
		primary: 'text-primary',
		secondary: 'text-secondary',
		accent: 'text-accent',
		neutral: 'text-neutral',
		info: 'text-info',
		success: 'text-success',
		warning: 'text-warning',
		error: 'text-error'
	};

	const sizes: Record<Size, string> = {
		xs: 'loading-xs',
		sm: 'loading-sm',
		md: 'loading-md',
		lg: 'loading-lg',
		xl: 'loading-xl'
	};

	const types: Record<Type, string> = {
		spinner: 'loading-spinner',
		dots: 'loading-dots',
		bars: 'loading-bars',
		ring: 'loading-ring',
		ball: 'loading-ball',
		infinity: 'loading-infinity'
	};

	const classes = $derived(cn('loading', types[type], sizes[size], variants[variant], className));
</script>

<span class={classes} role="status" aria-label="Loading"></span>
