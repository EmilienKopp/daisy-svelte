<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Swap from './Swap.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Swap',
		component: Swap,
		tags: ['autodocs'],
		argTypes: {
			effect: { control: 'select', options: ['flip', 'rotate', 'none'] },
			checked: { control: 'boolean' },
			on: { control: 'text' },
			off: { control: 'text' }
		}
	});
</script>

<script>
	let liked = $state(false);
</script>

<Story name="Text" args={{ on: 'ON', off: 'OFF', effect: 'flip' }} />

<Story name="Emoji rotate" args={{ on: '🌞', off: '🌚', effect: 'rotate', class: 'text-4xl' }} />

<Story name="Snippets with bound state">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<Swap bind:checked={liked} effect="flip" title="Toggle like">
				{#snippet on()}
					<span class="text-3xl">❤️</span>
				{/snippet}
				{#snippet off()}
					<span class="text-3xl">🤍</span>
				{/snippet}
			</Swap>
			<span>{liked ? 'Liked' : 'Not liked'}</span>
		</div>
	{/snippet}
</Story>
