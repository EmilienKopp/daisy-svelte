<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		title: 'Display/Avatar',
		component: Avatar,
		tags: ['autodocs']
	});
</script>

<Story
	name="Image"
	args={{ src: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp', alt: 'Cat' }}
>
	{#snippet template(args)}
		<Avatar {...args} />
	{/snippet}
</Story>

<Story name="Placeholder" args={{ fallback: 'EK' }}>
	{#snippet template(args)}
		<Avatar {...args} />
	{/snippet}
</Story>

<Story name="Small rounded square" args={{ fallback: 'EK', class: 'w-8 rounded-lg' }}>
	{#snippet template(args)}
		<Avatar {...args} />
	{/snippet}
</Story>
