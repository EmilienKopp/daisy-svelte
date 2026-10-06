<script lang="ts">
	import { cn } from '../../utils/cn.js';

	export interface Step {
		title: string;
		description?: string;
		completed?: boolean;
		href?: string;
	}

	interface Props {
		steps: Step[];
		/** Index of the active step. Steps before it are styled as done. */
		currentStep?: number;
		/** Stack steps vertically. */
		vertical?: boolean;
		/** daisyUI color for done/active steps. Default 'primary'. */
		color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
		class?: string;
	}

	let { steps, currentStep = 0, vertical = false, color = 'primary', class: className }: Props =
		$props();

	const colors: Record<NonNullable<Props['color']>, string> = {
		primary: 'step-primary',
		secondary: 'step-secondary',
		accent: 'step-accent',
		neutral: 'step-neutral',
		info: 'step-info',
		success: 'step-success',
		warning: 'step-warning',
		error: 'step-error'
	};

	function isDone(step: Step, index: number): boolean {
		return step.completed ?? index < currentStep;
	}
</script>

<ul class={cn('steps', vertical && 'steps-vertical', className)}>
	{#each steps as step, index (step.title)}
		<li
			class={cn('step', (isDone(step, index) || index === currentStep) && colors[color])}
			data-content={isDone(step, index) ? '✓' : `${index + 1}`}
		>
			{#if step.href}
				<a href={step.href} class="link link-hover" title={step.description}>{step.title}</a>
			{:else}
				<span title={step.description}>{step.title}</span>
			{/if}
		</li>
	{/each}
</ul>
