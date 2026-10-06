<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: [
					'default',
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'danger',
					'destructive',
					'ghost',
					'link'
				]
			},
			size: {
				control: 'select',
				options: ['default', 'xs', 'sm', 'lg', 'xl', 'icon']
			},
			outline: {
				control: 'select',
				options: [undefined, true, 'outline', 'soft', 'dash', 'ghost']
			},
			loading: { control: 'boolean' },
			href: { control: 'text' }
		}
	});
</script>

<Story name="Primary" args={{ variant: 'primary' }}>
	{#snippet template(args)}
		<Button {...args}>Click me</Button>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex flex-wrap gap-2">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="accent">Accent</Button>
			<Button variant="neutral">Neutral</Button>
			<Button variant="info">Info</Button>
			<Button variant="success">Success</Button>
			<Button variant="warning">Warning</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-2">
			<Button size="xs">Extra small</Button>
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
			<Button size="xl">Extra large</Button>
			<Button size="icon" aria-label="Icon button">+</Button>
		</div>
	{/snippet}
</Story>

<Story name="Outline styles">
	{#snippet template()}
		<div class="flex flex-wrap gap-2">
			<Button variant="primary" outline>Outline</Button>
			<Button variant="primary" outline="soft">Soft</Button>
			<Button variant="primary" outline="dash">Dash</Button>
			<Button variant="primary" outline="ghost">Ghost</Button>
		</div>
	{/snippet}
</Story>

<Story name="Loading" args={{ variant: 'primary', loading: true }}>
	{#snippet template(args)}
		<Button {...args}>Saving</Button>
	{/snippet}
</Story>

<Story name="As link" args={{ variant: 'link', href: 'https://daisyui.com' }}>
	{#snippet template(args)}
		<Button {...args}>Visit daisyUI</Button>
	{/snippet}
</Story>
