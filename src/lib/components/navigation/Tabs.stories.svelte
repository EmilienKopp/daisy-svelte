<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from './Tabs.svelte';
	import Tab from './Tab.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		argTypes: {
			variant: { control: 'select', options: ['border', 'box', 'lift'] },
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] }
		}
	});
</script>

<script lang="ts">
	let activeTab = $state<string | undefined>();
	let lastChanged = $state('');
</script>

<Story name="Default" args={{ variant: 'border' }}>
	{#snippet template(args)}
		<Tabs {...args}>
			<Tab title="Profile">
				<p>Profile settings panel.</p>
			</Tab>
			<Tab title="Security">
				<p>Password and two-factor authentication.</p>
			</Tab>
			<Tab title="Notifications">
				<p>Email and push notification preferences.</p>
			</Tab>
		</Tabs>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="space-y-8">
			<Tabs variant="border">
				<Tab title="Border A"><p>Border variant, panel A.</p></Tab>
				<Tab title="Border B"><p>Border variant, panel B.</p></Tab>
			</Tabs>
			<Tabs variant="box">
				<Tab title="Box A"><p>Box variant, panel A.</p></Tab>
				<Tab title="Box B"><p>Box variant, panel B.</p></Tab>
			</Tabs>
			<Tabs variant="lift">
				<Tab title="Lift A"><p>Lift variant, panel A.</p></Tab>
				<Tab title="Lift B"><p>Lift variant, panel B.</p></Tab>
			</Tabs>
		</div>
	{/snippet}
</Story>

<Story name="Tab States">
	{#snippet template()}
		<Tabs variant="lift">
			<Tab title="Normal">
				<p>A plain tab.</p>
			</Tab>
			<Tab title="Needs attention" attentionNeeded>
				<p>This tab's label is suffixed with * and highlighted.</p>
			</Tab>
			<Tab title="Completed" completed>
				<p>This tab's label is suffixed with a check mark.</p>
			</Tab>
			<Tab title="Disabled" disabled tooltip="You cannot open this tab">
				<p>Unreachable content.</p>
			</Tab>
		</Tabs>
	{/snippet}
</Story>

<Story name="Bound Active Tab">
	{#snippet template()}
		<div class="space-y-4">
			<div class="flex items-center gap-2">
				<button type="button" class="btn btn-sm" onclick={() => (activeTab = 'First')}>
					Go to First
				</button>
				<button type="button" class="btn btn-sm" onclick={() => (activeTab = 'Third')}>
					Go to Third
				</button>
				<span class="text-sm text-base-content/70">
					Active: {activeTab ?? '(auto)'}{#if lastChanged}, last change: {lastChanged}{/if}
				</span>
			</div>
			<Tabs bind:activeTab onTabChange={(title) => (lastChanged = title)} variant="box">
				<Tab title="First"><p>First panel.</p></Tab>
				<Tab title="Second"><p>Second panel.</p></Tab>
				<Tab title="Third"><p>Third panel.</p></Tab>
			</Tabs>
		</div>
	{/snippet}
</Story>
