<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Alert',
		component: Alert,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
			style: { control: 'select', options: ['solid', 'soft', 'outline', 'dash'] }
		}
	});
</script>

<Story
	name="Default"
	args={{ variant: 'info', messages: ['A new software update is available.'] }}
/>

<Story name="Variants">
	{#snippet template()}
		<div class="space-y-2">
			<Alert variant="info" messages={['This is an info alert.']} />
			<Alert variant="success" messages={['Your changes have been saved.']} />
			<Alert variant="warning" messages={['Your trial expires in 3 days.']} />
			<Alert variant="error" messages={['Something went wrong.']} />
		</div>
	{/snippet}
</Story>

<Story
	name="Title and Message List"
	args={{
		variant: 'error',
		title: 'Validation failed',
		messages: [
			'The email field is required.',
			'The password must be at least 8 characters.',
			'The password must be at least 8 characters.'
		]
	}}
/>

<Story name="Styles">
	{#snippet template()}
		<div class="space-y-2">
			<Alert variant="success" style="solid" messages={['Solid (default)']} />
			<Alert variant="success" style="soft" messages={['Soft']} />
			<Alert variant="success" style="outline" messages={['Outline']} />
			<Alert variant="success" style="dash" messages={['Dash']} />
		</div>
	{/snippet}
</Story>

<Story name="Custom Content, No Icon" args={{ variant: 'warning', hideIcon: true }}>
	{#snippet template(args)}
		<Alert {...args}>
			<p class="text-sm">
				Free-form children content with a <a href="#top" class="link">link</a> and no icon.
			</p>
		</Alert>
	{/snippet}
</Story>
