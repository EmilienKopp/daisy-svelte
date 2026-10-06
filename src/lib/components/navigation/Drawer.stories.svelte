<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Drawer from './Drawer.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Drawer',
		component: Drawer,
		tags: ['autodocs'],
		argTypes: {
			end: { control: 'boolean' },
			responsive: { control: 'boolean' }
		}
	});
</script>

<script lang="ts">
	let open = $state(false);
	let endOpen = $state(false);
</script>

<Story name="Default">
	{#snippet template()}
		<div class="h-80 overflow-hidden rounded-lg border border-base-300">
			<Drawer bind:open>
				<div class="p-4">
					<button type="button" class="btn btn-primary btn-sm" onclick={() => (open = true)}>
						Open drawer (open: {open})
					</button>
					<p class="mt-4">Main page content.</p>
				</div>
				{#snippet side()}
					<ul class="menu w-full">
						<li><a href="#dashboard">Dashboard</a></li>
						<li><a href="#projects">Projects</a></li>
						<li><a href="#settings">Settings</a></li>
					</ul>
					<button type="button" class="btn btn-sm mt-4" onclick={() => (open = false)}>
						Close
					</button>
				{/snippet}
			</Drawer>
		</div>
	{/snippet}
</Story>

<Story name="End Side">
	{#snippet template()}
		<div class="h-80 overflow-hidden rounded-lg border border-base-300">
			<Drawer bind:open={endOpen} end>
				<div class="p-4">
					<button type="button" class="btn btn-secondary btn-sm" onclick={() => (endOpen = true)}>
						Open right drawer
					</button>
				</div>
				{#snippet side()}
					<p class="font-semibold">Right-side panel</p>
					<p class="mt-2 text-sm">Opens from the end (right) edge.</p>
				{/snippet}
			</Drawer>
		</div>
	{/snippet}
</Story>

<Story name="Responsive Sidebar">
	{#snippet template()}
		<div class="h-80 overflow-hidden rounded-lg border border-base-300">
			<Drawer responsive id="responsive-drawer-story">
				<div class="p-4">
					<label for="responsive-drawer-story" class="btn btn-primary btn-sm lg:hidden">
						Open sidebar
					</label>
					<p class="mt-4">On large screens the sidebar stays visible.</p>
				</div>
				{#snippet side()}
					<ul class="menu w-full">
						<li><a href="#home">Home</a></li>
						<li><a href="#reports">Reports</a></li>
						<li><a href="#billing">Billing</a></li>
					</ul>
				{/snippet}
			</Drawer>
		</div>
	{/snippet}
</Story>
