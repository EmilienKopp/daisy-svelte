# daisy-svelte

My personal Svelte 5 + daisyUI 5 component library, distilled from the components I kept rebuilding across projects (SPLIT-stack, lamobiguette, 123survey, qadran, splitstack, qadran-overhaul).

Framework-agnostic: no Inertia, no Laravel, no SvelteKit coupling. Links are plain anchors with optional `onNavigate` callbacks, forms take plain `error` props, and state is bindable runes.

## Stack

- Svelte 5 (runes, snippets, TypeScript)
- daisyUI 5 + Tailwind CSS 4 (peer concerns of the consuming app)
- `clsx` + `tailwind-merge` for class merging (`cn()` is exported)

## Install

Not published yet. Use it locally:

```bash
npm install /path/to/daisy-svelte
# or in package.json: "daisy-svelte": "file:../daisy-svelte"
```

Your app needs Tailwind 4 + daisyUI 5. Make sure Tailwind scans the library so its classes get generated, in your app CSS:

```css
@import 'tailwindcss';
@plugin 'daisyui';
@source '../node_modules/daisy-svelte/dist';
```

## Usage

```svelte
<script lang="ts">
	import { Button, Input, Modal, Table, toast, Toaster } from 'daisy-svelte';

	let open = $state(false);
	let email = $state('');
</script>

<Button variant="primary" onclick={() => (open = true)}>Open</Button>

<Modal bind:open>
	{#snippet title()}Edit profile{/snippet}
	<Input label="Email" type="email" bind:value={email} />
	{#snippet actions()}
		<Button onclick={() => toast.success('Saved!')}>Save</Button>
	{/snippet}
</Modal>

<Toaster position="top-end" />
```

## Components

| Category | Components |
| --- | --- |
| Actions | `Button`, `BaseButton`, `LoadingButton`, `Modal`, `Dropdown`, `Swap`, `ConfirmDialog`, `DeleteButton` |
| Data input | `Input`, `Select`, `Textarea`, `Checkbox`, `CheckboxGroup`, `Toggle`, `MultiSelect`, `PasswordInput`, `InputLabel`, `InputError`, `FileInput`, `FieldsetWrapper`, `FilterSearch` |
| Display | `Table`, `DynamicTable`, `Badge`, `DataList`, `Collapse`, `SectionCard`, `Heading`, `Tip` |
| Feedback | `Spinner`, `Alert`, `Toaster` + `toast` store, `Steps` |
| Navigation | `Pagination`, `Tabs`/`Tab`, `NavLink`, `ResponsiveNavLink`, `DropdownLink`, `DownloadLink`, `Breadcrumbs`, `Drawer` |
| Utils | `cn`, `normalizeError`, `dot`, `readable` |

## Development

```bash
npm install
npm run storybook   # browse components at localhost:6006
npm run check       # svelte-check
npm run build       # build + package to dist/
```

Storybook has a toolbar theme switcher for daisyUI themes (light, dark, cupcake, corporate, synthwave, dracula).
