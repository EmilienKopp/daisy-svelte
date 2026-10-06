<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dropdown from './Dropdown.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Dropdown',
		component: Dropdown,
		tags: ['autodocs'],
		argTypes: {
			position: { control: 'select', options: ['bottom', 'top', 'left', 'right'] },
			align: { control: 'select', options: ['start', 'center', 'end'] }
		}
	});

	const sampleActions = [
		{ text: 'Edit', onclick: () => console.log('edit') },
		{ text: 'Duplicate', onclick: () => console.log('duplicate') },
		{ text: 'Documentation', href: 'https://daisyui.com/components/dropdown/' }
	];
</script>

<Story name="With actions" args={{ actions: sampleActions }}>
	{#snippet template(args)}
		<div class="p-8">
			<Dropdown {...args}>
				{#snippet trigger()}
					<span class="btn btn-primary">Options</span>
				{/snippet}
			</Dropdown>
		</div>
	{/snippet}
</Story>

<Story name="Positions">
	{#snippet template()}
		<div class="flex items-center justify-center gap-8 p-32">
			<Dropdown actions={sampleActions} position="top">
				{#snippet trigger()}
					<span class="btn">Top</span>
				{/snippet}
			</Dropdown>
			<Dropdown actions={sampleActions} position="bottom" align="end">
				{#snippet trigger()}
					<span class="btn">Bottom end</span>
				{/snippet}
			</Dropdown>
			<Dropdown actions={sampleActions} position="right">
				{#snippet trigger()}
					<span class="btn">Right</span>
				{/snippet}
			</Dropdown>
		</div>
	{/snippet}
</Story>

<Story name="Custom content">
	{#snippet template()}
		<div class="p-8">
			<Dropdown>
				{#snippet trigger()}
					<span class="btn btn-ghost">Custom content</span>
				{/snippet}
				<li class="menu-title">Anything goes here</li>
				<li><button type="button">Custom item A</button></li>
				<li><button type="button">Custom item B</button></li>
			</Dropdown>
		</div>
	{/snippet}
</Story>
