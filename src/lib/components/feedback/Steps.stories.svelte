<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Steps from './Steps.svelte';

	const checkoutSteps = [
		{ title: 'Cart', description: 'Review your items' },
		{ title: 'Shipping', description: 'Enter your address' },
		{ title: 'Payment', description: 'Pay securely' },
		{ title: 'Done' }
	];

	const { Story } = defineMeta({
		title: 'Feedback/Steps',
		component: Steps,
		tags: ['autodocs'],
		argTypes: {
			color: {
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
			currentStep: { control: { type: 'number', min: 0, max: 3 } }
		}
	});
</script>

<script lang="ts">
	let interactiveStep = $state(1);
</script>

<Story name="Default" args={{ steps: checkoutSteps, currentStep: 1 }} />

<Story name="Vertical" args={{ steps: checkoutSteps, currentStep: 2, vertical: true }} />

<Story
	name="Success Color"
	args={{ steps: checkoutSteps, currentStep: 3, color: 'success' }}
/>

<Story
	name="Explicit Completed Flags"
	args={{
		steps: [
			{ title: 'Sign up', completed: true },
			{ title: 'Verify email', completed: true },
			{ title: 'Add payment', completed: false },
			{ title: 'Invite team', completed: false }
		],
		currentStep: 2
	}}
/>

<Story name="Interactive">
	{#snippet template()}
		<div class="space-y-4">
			<Steps steps={checkoutSteps} currentStep={interactiveStep} />
			<div class="flex gap-2">
				<button
					type="button"
					class="btn btn-sm"
					disabled={interactiveStep <= 0}
					onclick={() => (interactiveStep -= 1)}
				>
					Back
				</button>
				<button
					type="button"
					class="btn btn-primary btn-sm"
					disabled={interactiveStep >= checkoutSteps.length - 1}
					onclick={() => (interactiveStep += 1)}
				>
					Next
				</button>
			</div>
		</div>
	{/snippet}
</Story>
