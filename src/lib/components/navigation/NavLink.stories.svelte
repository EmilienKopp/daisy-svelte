<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NavLink from './NavLink.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/NavLink',
		component: NavLink,
		tags: ['autodocs'],
		argTypes: {
			active: { control: 'boolean' }
		}
	});
</script>

<Story name="Active" args={{ href: '/dashboard', active: true }}>
	{#snippet template(args)}
		<NavLink {...args}>Dashboard</NavLink>
	{/snippet}
</Story>

<Story name="Inactive" args={{ href: '/settings', active: false }}>
	{#snippet template(args)}
		<NavLink {...args}>Settings</NavLink>
	{/snippet}
</Story>

<Story name="Navbar Example">
	{#snippet template()}
		<nav class="flex h-16 items-center gap-6 border-b border-base-300 px-4">
			<NavLink href="/dashboard" active>Dashboard</NavLink>
			<NavLink href="/projects">Projects</NavLink>
			<NavLink href="/team">Team</NavLink>
			<NavLink
				href="/reports"
				onNavigate={(e, href) => {
					e.preventDefault();
					alert(`Would navigate to ${href}`);
				}}
			>
				Reports (intercepted)
			</NavLink>
		</nav>
	{/snippet}
</Story>
