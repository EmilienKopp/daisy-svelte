<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tip from './Tip.svelte';

	const { Story } = defineMeta({
		title: 'Display/Tip',
		component: Tip,
		tags: ['autodocs'],
		argTypes: {
			position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
			variant: {
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

<Story name="Default" args={{ text: 'Hello there!', open: true }}>
	{#snippet template(args)}
		<div class="p-16 text-center">
			<Tip {...args}>
				<button type="button" class="btn">Hover me</button>
			</Tip>
		</div>
	{/snippet}
</Story>

<Story name="Positions">
	{#snippet template()}
		<div class="flex justify-center gap-8 p-16">
			<Tip text="Top tip" position="top" open>
				<button type="button" class="btn btn-sm">Top</button>
			</Tip>
			<Tip text="Bottom tip" position="bottom" open>
				<button type="button" class="btn btn-sm">Bottom</button>
			</Tip>
			<Tip text="Left tip" position="left" open>
				<button type="button" class="btn btn-sm">Left</button>
			</Tip>
			<Tip text="Right tip" position="right" open>
				<button type="button" class="btn btn-sm">Right</button>
			</Tip>
		</div>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex flex-wrap justify-center gap-8 p-16">
			<Tip text="Primary" variant="primary" open>
				<button type="button" class="btn btn-sm">primary</button>
			</Tip>
			<Tip text="Success" variant="success" open>
				<button type="button" class="btn btn-sm">success</button>
			</Tip>
			<Tip text="Warning" variant="warning" open>
				<button type="button" class="btn btn-sm">warning</button>
			</Tip>
			<Tip text="Error" variant="error" open>
				<button type="button" class="btn btn-sm">error</button>
			</Tip>
		</div>
	{/snippet}
</Story>

<Story name="Rich Content">
	{#snippet template()}
		<div class="p-20 text-center">
			<Tip position="bottom" open>
				{#snippet content()}
					<div class="text-left">
						<p class="font-bold">Keyboard shortcut</p>
						<p class="text-xs">Press <kbd class="kbd kbd-xs">Ctrl</kbd> + <kbd class="kbd kbd-xs">K</kbd></p>
					</div>
				{/snippet}
				<button type="button" class="btn btn-sm">Rich tooltip</button>
			</Tip>
		</div>
	{/snippet}
</Story>
