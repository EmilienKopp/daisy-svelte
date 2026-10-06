<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DeleteButton from './DeleteButton.svelte';

	const { Story } = defineMeta({
		title: 'Actions/DeleteButton',
		component: DeleteButton,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' }
		}
	});
</script>

<Story name="Icon only" args={{}} />

<Story name="With label" args={{ label: 'Delete' }} />

<Story name="Disabled" args={{ label: 'Delete', disabled: true }} />
