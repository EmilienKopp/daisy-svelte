<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import InputError from './InputError.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/InputError',
		component: InputError,
		tags: ['autodocs'],
		argTypes: {
			message: { control: 'text' }
		}
	});
</script>

<Story name="With message" args={{ message: 'This field is required.' }} />

<Story name="No message (renders nothing)" args={{ message: null }} />

<Story name="Custom class" args={{ message: 'Heads up!', class: 'text-warning text-sm' }} />
