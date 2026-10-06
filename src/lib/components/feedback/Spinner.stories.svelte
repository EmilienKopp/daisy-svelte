<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from './Spinner.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Spinner',
		component: Spinner,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error'
				]
			},
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
			type: {
				control: 'select',
				options: ['spinner', 'dots', 'bars', 'ring', 'ball', 'infinity']
			}
		}
	});
</script>

<Story name="Default" args={{ variant: 'primary', size: 'md', type: 'spinner' }} />

<Story name="Types">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<Spinner type="spinner" />
			<Spinner type="dots" />
			<Spinner type="bars" />
			<Spinner type="ring" />
			<Spinner type="ball" />
			<Spinner type="infinity" />
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<Spinner size="xs" />
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
			<Spinner size="xl" />
		</div>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<Spinner variant="primary" />
			<Spinner variant="secondary" />
			<Spinner variant="accent" />
			<Spinner variant="neutral" />
			<Spinner variant="info" />
			<Spinner variant="success" />
			<Spinner variant="warning" />
			<Spinner variant="error" />
		</div>
	{/snippet}
</Story>
