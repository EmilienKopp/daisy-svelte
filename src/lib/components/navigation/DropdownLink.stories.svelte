<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DropdownLink from './DropdownLink.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/DropdownLink',
		component: DropdownLink,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ href: '/profile' }}>
	{#snippet template(args)}
		<DropdownLink {...args}>Profile</DropdownLink>
	{/snippet}
</Story>

<Story name="Dropdown Menu Example">
	{#snippet template()}
		<div class="dropdown dropdown-open">
			<div tabindex="0" role="button" class="btn btn-sm">Account</div>
			<div
				class="dropdown-content z-10 w-48 overflow-hidden rounded-box border border-base-300 bg-base-100 py-1 shadow"
			>
				<DropdownLink href="/profile">Profile</DropdownLink>
				<DropdownLink href="/settings">Settings</DropdownLink>
				<DropdownLink
					href="/logout"
					onNavigate={(e, href) => {
						e.preventDefault();
						alert(`Would navigate to ${href}`);
					}}
				>
					Log out (intercepted)
				</DropdownLink>
			</div>
		</div>
	{/snippet}
</Story>
