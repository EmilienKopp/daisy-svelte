<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileInput from './FileInput.svelte';

	const { Story } = defineMeta({
		title: 'Data Input/FileInput',
		component: FileInput,
		tags: ['autodocs'],
		argTypes: {
			label: { control: 'text' },
			multiple: { control: 'boolean' },
			accept: { control: 'text' },
			progress: { control: { type: 'number', min: 0, max: 100 } },
			required: { control: 'boolean' },
			error: { control: 'text' }
		}
	});

	const existing = [
		{ id: 1, name: 'report-2026.pdf', url: 'https://example.com/report-2026.pdf' },
		{ id: 2, name: 'avatar.png' }
	];
</script>

<Story name="Basic" args={{ label: 'Attachment', name: 'attachment' }} />

<Story
	name="Multiple images"
	args={{ label: 'Photos', name: 'photos', multiple: true, accept: 'image/*' }}
/>

<Story
	name="With upload progress"
	args={{ label: 'Document', name: 'document', progress: 65 }}
/>

<Story
	name="Existing files"
	args={{
		label: 'Current files',
		existingFiles: existing,
		ondelete: (file) => console.log('delete', file)
	}}
/>

<Story
	name="With error"
	args={{ label: 'Resume', name: 'resume', required: true, error: 'File is too large (max 5 MB).' }}
/>
