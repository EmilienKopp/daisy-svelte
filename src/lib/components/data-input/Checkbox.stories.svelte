<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		argTypes: {
			checked: { control: 'boolean' }
		}
	});
</script>

<script>
	let agreed = $state(false);
</script>

<Story name="Unchecked" args={{ checked: false }} />

<Story name="Checked" args={{ checked: true }} />

<Story name="Custom color" args={{ checked: true, class: 'checkbox-accent checkbox-lg' }} />

<Story name="Bound state">
	{#snippet template()}
		<label class="flex cursor-pointer items-center gap-2">
			<Checkbox bind:checked={agreed} />
			<span>{agreed ? 'Agreed' : 'Not agreed'}</span>
		</label>
	{/snippet}
</Story>
