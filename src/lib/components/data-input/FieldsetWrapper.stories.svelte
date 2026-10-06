<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FieldsetWrapper from './FieldsetWrapper.svelte';
	import Input from './Input.svelte';
	import Toggle from './Toggle.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/FieldsetWrapper',
		component: FieldsetWrapper,
		tags: ['autodocs'],
		argTypes: {
			title: { control: 'text' },
			description: { control: 'text' },
			detached: { control: 'boolean' }
		}
	});
</script>

<Story
	name="With form fields"
	args={{ title: 'Profile', description: 'This information is shown publicly.' }}
>
	{#snippet template(args)}
		<FieldsetWrapper {...args}>
			<Input label="Display name" name="display_name" />
			<Input label="Website" name="website" type="url" placeholder="https://" />
			<Toggle label="Show email publicly" />
		</FieldsetWrapper>
	{/snippet}
</Story>

<Story name="Detached" args={{ title: 'Nested section', detached: true }}>
	{#snippet template(args)}
		<FieldsetWrapper title="Outer section">
			<FieldsetWrapper {...args}>
				<Input label="Street" name="street" />
				<Input label="City" name="city" />
			</FieldsetWrapper>
		</FieldsetWrapper>
	{/snippet}
</Story>

<Story name="Title only" args={{ title: 'Settings' }}>
	{#snippet template(args)}
		<FieldsetWrapper {...args}>
			<p>Any content works here.</p>
		</FieldsetWrapper>
	{/snippet}
</Story>
