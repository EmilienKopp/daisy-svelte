<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PasswordInput from './PasswordInput.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/PasswordInput',
		component: PasswordInput,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			placeholder: { control: 'text' },
			revealable: { control: 'boolean' },
			required: { control: 'boolean' },
			error: { control: 'text' }
		}
	});
</script>

<Story name="Basic" args={{ label: 'Password', name: 'password' }} />

<Story
	name="Not revealable"
	args={{ label: 'PIN', name: 'pin', revealable: false, placeholder: 'Enter PIN' }}
/>

<Story
	name="With error"
	args={{
		label: 'Password',
		name: 'password',
		value: 'abc',
		error: 'Password must be at least 8 characters.'
	}}
/>

<Story
	name="Required"
	args={{ label: 'New password', name: 'new_password', required: true }}
/>
