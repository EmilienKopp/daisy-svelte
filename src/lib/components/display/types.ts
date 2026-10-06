import type { Component } from 'svelte';

/** Any component usable as an inline icon (e.g. lucide-svelte icons). */
export type IconComponent = Component<{ class?: string }> | Component;

/**
 * Column header configuration for data tables and data lists.
 * @template T - The row object type
 * @template V - The raw cell value type (defaults to any)
 */
export type DataHeader<T, V = unknown> = {
	/** Dot-notation key resolved against the row (e.g. "user.name") */
	key: string;
	/** Display label for the column header */
	label: string;
	/** Format the resolved cell value for display */
	formatter?: (value: V) => string;
	/** Combine multiple fields of the row into a single display string (takes precedence over key/formatter) */
	combined?: (row: T) => string;
	/** Return an icon component to render before the value */
	icon?: (row: T) => IconComponent;
	/** Only show the icon, no text */
	iconOnly?: boolean;
	/** CSS classes for the icon wrapper */
	iconClass?: (row: T) => string;
	/** Maximum width for the column (e.g. '120px', '8rem') */
	maxWidth?: string;
};

/**
 * An action rendered in a table row's actions cell (or similar contexts).
 * @template T - The row object type
 */
export type DataAction<T> = {
	/** Display label for the action */
	label: string;
	/** Callback invoked with the row when triggered */
	callback?: (row: T) => void;
	/** Render the action as a plain link to this URL */
	href?: (row: T) => string | undefined;
	/** Return an icon component for the action */
	icon?: (row: T) => IconComponent;
	/** CSS classes for the action, per row */
	css?: (row: T) => string;
	/** Hide the action for this row */
	hidden?: (row: T) => boolean;
	/** Disable the action for this row */
	disabled?: (row: T) => boolean;
	/** Only show the icon (label becomes the title attribute) */
	iconOnly?: boolean;
	/** Ordering index when multiple actions are shown */
	position?: number;
};

/** One pagination link (Laravel-style paginator shape, framework-agnostic). */
export type PaginationLink = {
	url: string | null;
	label: string;
	active: boolean;
};

/**
 * A page of rows plus pagination links.
 * @template T - The row object type
 */
export type Paginated<T> = {
	data: T[];
	links: PaginationLink[];
	current_page?: number;
	last_page?: number;
	per_page?: number;
	total?: number;
};
