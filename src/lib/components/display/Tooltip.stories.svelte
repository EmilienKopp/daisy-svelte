<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Display/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		argTypes: {
			position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
			color: {
				control: 'select',
				options: [
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error'
				]
			}
		}
	});
</script>

<Story name="Default" args={{ tip: 'Hello there', open: true }}>
	{#snippet template(args)}
		<div class="p-12">
			<Tooltip {...args}>
				<button class="btn">Hover me</button>
			</Tooltip>
		</div>
	{/snippet}
</Story>

<Story name="Positions" args={{ tip: 'Tip', open: true, position: 'right' }}>
	{#snippet template(args)}
		<div class="p-12">
			<Tooltip {...args}>
				<button class="btn">Right</button>
			</Tooltip>
		</div>
	{/snippet}
</Story>
