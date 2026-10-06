<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toaster from './Toaster.svelte';
	import { toast } from './toast.svelte.js';

	const { Story } = defineMeta({
		title: 'Feedback/Toaster',
		component: Toaster,
		tags: ['autodocs'],
		argTypes: {
			position: {
				control: 'select',
				options: [
					'top-start',
					'top-center',
					'top-end',
					'bottom-start',
					'bottom-center',
					'bottom-end'
				]
			},
			dismissible: { control: 'boolean' }
		}
	});
</script>

<Story name="Playground" args={{ position: 'top-end', dismissible: true }}>
	{#snippet template(args)}
		<div class="flex flex-wrap gap-2">
			<button
				type="button"
				class="btn btn-success btn-sm"
				onclick={() => toast.success('Saved successfully!')}
			>
				Success
			</button>
			<button
				type="button"
				class="btn btn-error btn-sm"
				onclick={() => toast.error('Something went wrong.')}
			>
				Error
			</button>
			<button
				type="button"
				class="btn btn-info btn-sm"
				onclick={() => toast.info('A new version is available.')}
			>
				Info
			</button>
			<button
				type="button"
				class="btn btn-warning btn-sm"
				onclick={() => toast.warning('Your session expires soon.')}
			>
				Warning
			</button>
			<button type="button" class="btn btn-ghost btn-sm" onclick={() => toast.clear()}>
				Clear all
			</button>
		</div>
		<Toaster {...args} />
	{/snippet}
</Story>

<Story name="With Hint and Duration" args={{ position: 'top-end' }}>
	{#snippet template(args)}
		<div class="flex flex-wrap gap-2">
			<button
				type="button"
				class="btn btn-sm"
				onclick={() =>
					toast.success('Profile updated', { hint: 'Changes may take a minute to propagate.' })}
			>
				With hint
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => toast.error('Payment failed', { duration: 0, hint: 'Will not auto-dismiss' })}
			>
				Sticky (duration 0)
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => toast.info('Quick note', { duration: 1500 })}
			>
				Short (1.5s)
			</button>
		</div>
		<Toaster {...args} />
	{/snippet}
</Story>

<Story name="Bottom Center Queue" args={{ position: 'bottom-center' }}>
	{#snippet template(args)}
		<button
			type="button"
			class="btn btn-primary btn-sm"
			onclick={() => {
				toast.info('First in the queue');
				toast.success('Second in the queue');
				toast.warning('Third in the queue');
			}}
		>
			Push three toasts
		</button>
		<Toaster {...args} />
	{/snippet}
</Story>

<Story name="From Flash Payload" args={{ position: 'top-end' }}>
	{#snippet template(args)}
		<div class="flex flex-wrap gap-2">
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => toast.fromFlash({ success: 'Record created!' })}
			>
				Flash success
			</button>
			<button
				type="button"
				class="btn btn-sm"
				onclick={() => toast.fromFlash({ error: 'Could not delete record.' })}
			>
				Flash error
			</button>
		</div>
		<Toaster {...args} />
	{/snippet}
</Story>
