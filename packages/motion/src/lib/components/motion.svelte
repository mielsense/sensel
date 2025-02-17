<script lang="ts">
	/**
	 * Generic Motion component.
	 *
	 * Renders any element (via the `as` prop) and applies animations
	 * using the underlying motion library.
	 *
	 * Props are read using $props() (Svelte 5 runes) rather than export let.
	 * Interactive behaviors are defined via the `hover` and `tap` props.
	 *
	 * Note: Content passed between component tags is now provided as a snippet prop
	 * named `children` and rendered with {@render children()}.
	 */
	import { animate, hover, press } from 'motion';
	import { onDestroy, onMount } from 'svelte';
	import type { MotionProps } from '../types.js';

	// Destructure incoming props from $props()
	let {
		as = 'div',
		initial,
		animate: animateProps,
		transition,
		hover: hoverProps,
		tap: tapProps,
		children,
		...rest
	} = $props() as MotionProps;

	// Bind the rendered element
	let element: HTMLElement;

	// References for cleanup
	let hoverCleanup: (() => void) | undefined;
	let tapCleanup: (() => void) | undefined;
	let animationControl: any;

	onMount(() => {
		// Apply initial styles if provided.
		if (initial) {
			for (const key in initial) {
				element.style.setProperty(key, String(initial[key]));
			}
		}
		// Animate to target state.
		if (animateProps) {
			animationControl = animate(element, animateProps, transition);
		}
		// Setup hover animation if hover props are provided.
		if (hoverProps) {
			hoverCleanup = hover(element, () => {
				animate(element, hoverProps, transition);
				// When hover ends, revert to the animate state.
				return () => {
					if (animateProps) {
						animate(element, animateProps, transition);
					}
				};
			});
		}
		// Setup tap (press) animation if tap props are provided.
		if (tapProps) {
			tapCleanup = press(element, () => {
				animate(element, tapProps, transition);
				// When tap ends, revert to animate state.
				return () => {
					if (animateProps) {
						animate(element, animateProps, transition);
					}
				};
			});
		}
	});

	onDestroy(() => {
		hoverCleanup && hoverCleanup();
		tapCleanup && tapCleanup();
		if (animationControl && typeof animationControl.cancel === 'function') {
			animationControl.cancel();
		}
	});
</script>

<svelte:element this={as} bind:this={element} {...rest}>
	{@render children?.()}
</svelte:element>
