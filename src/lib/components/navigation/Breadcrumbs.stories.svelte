<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './Breadcrumbs.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Breadcrumbs',
		component: Breadcrumbs,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	args={{
		items: [
			{ label: 'Home', href: '/' },
			{ label: 'Projects', href: '/projects' },
			{ label: 'daisy-svelte' }
		]
	}}
/>

<Story name="Single Item" args={{ items: [{ label: 'Home' }] }} />

<Story
	name="Intercepted Navigation"
	args={{
		items: [
			{ label: 'Home', href: '/' },
			{ label: 'Users', href: '/users' },
			{ label: 'Ada Lovelace' }
		],
		onNavigate: (e: MouseEvent, item: { label: string; href?: string }) => {
			e.preventDefault();
			alert(`Would navigate to ${item.href} (${item.label})`);
		}
	}}
/>

<Story
	name="Deep Path"
	args={{
		items: [
			{ label: 'Home', href: '/' },
			{ label: 'Workspace', href: '/workspace' },
			{ label: 'Settings', href: '/workspace/settings' },
			{ label: 'Members', href: '/workspace/settings/members' },
			{ label: 'Invitations' }
		]
	}}
/>
