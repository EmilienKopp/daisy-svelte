<script lang="ts">
	import { cn } from '../../utils.js';

	interface Props {
		checked?: boolean;
		class?: string;
		[key: string]: any;
	}

	let { checked = $bindable(false), class: className = '', ...rest }: Props = $props();

	const classes = $derived(cn('checkbox checkbox-primary', className));
</script>

<input type="checkbox" bind:checked {...rest} class={classes} />
