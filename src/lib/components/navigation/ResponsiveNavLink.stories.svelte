<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResponsiveNavLink from './ResponsiveNavLink.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/ResponsiveNavLink',
		component: ResponsiveNavLink,
		tags: ['autodocs'],
		argTypes: {
			active: { control: 'boolean' }
		}
	});
</script>

<Story name="Active" args={{ href: '/dashboard', active: true }}>
	{#snippet template(args)}
		<ResponsiveNavLink {...args}>Dashboard</ResponsiveNavLink>
	{/snippet}
</Story>

<Story name="Inactive" args={{ href: '/settings' }}>
	{#snippet template(args)}
		<ResponsiveNavLink {...args}>Settings</ResponsiveNavLink>
	{/snippet}
</Story>

<Story name="Mobile Menu Example">
	{#snippet template()}
		<div class="w-72 space-y-1 border border-base-300 py-2">
			<ResponsiveNavLink href="/dashboard" active>Dashboard</ResponsiveNavLink>
			<ResponsiveNavLink href="/projects">Projects</ResponsiveNavLink>
			<ResponsiveNavLink href="/team">Team</ResponsiveNavLink>
			<ResponsiveNavLink
				href="/logout"
				onNavigate={(e, href) => {
					e.preventDefault();
					alert(`Would navigate to ${href}`);
				}}
			>
				Log out (intercepted)
			</ResponsiveNavLink>
		</div>
	{/snippet}
</Story>
