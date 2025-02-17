<script lang="ts">
    import { animate, hover, press } from 'motion';
    import { watch } from 'runed';
    import { onDestroy, onMount } from 'svelte';
    import type { MotionProps, TransitionOptions } from '../types.js';

    let {
        as = 'div',
        initial,
        animate: animateProps,
        transition,
        hover: hoverProps,
        tap: tapProps,
        children,
        ...rest
    } : MotionProps = $props();

    let element: HTMLElement | null = null;
    let hoverCleanup: (() => void) | undefined;
    let tapCleanup: (() => void) | undefined;
    let animationControl: ReturnType<typeof animate> | undefined;

    function runAnimation(target: HTMLElement, keyframes: MotionProps['animate'], options?: TransitionOptions) {
        if (!target || !keyframes) return;
        return animate(target, keyframes, options);
    }

    function applyInitialStyles() {
        if (element && initial) {
            Object.entries(initial).forEach(([key, value]) => {
                element!.style.setProperty(key, String(value));
            });
        }
    }

    onMount(() => {
        if (element?.children.length) {
            Array.from(element.children).forEach((child) => {
                if (child instanceof HTMLElement) {
                    runAnimation(child, animateProps, transition);
                }
            });
        }
    });

    $effect(() => {
        if (!element) return;
        applyInitialStyles();
        animationControl?.cancel?.();
        if (animateProps) {
            animationControl = runAnimation(element, animateProps, transition);
        }
    });

    watch(() => animateProps, () => {
        if (element) {
            animationControl?.cancel?.();
            animationControl = runAnimation(element, animateProps, transition);
            Array.from(element.children).forEach((child) => {
                if (child instanceof HTMLElement) {
                    runAnimation(child, animateProps, transition);
                }
            });
        }
    });

    watch(() => hoverProps, () => {
        if (!element || !hoverProps) return;
        hoverCleanup?.();
        hoverCleanup = hover(element, () => {
            runAnimation(element, hoverProps, transition);
            Array.from(element.children).forEach((child) => {
                if (child instanceof HTMLElement) {
                    runAnimation(child, hoverProps, transition);
                }
            });
            return () => {
                if (animateProps) {
                    runAnimation(element, animateProps, transition);
                    Array.from(element.children).forEach((child) => {
                        if (child instanceof HTMLElement) {
                            runAnimation(child, animateProps, transition);
                        }
                    });
                }
            };
        });
    });

    watch(() => tapProps, () => {
        if (!element || !tapProps) return;
        tapCleanup?.();
        tapCleanup = press(element, () => {
            runAnimation(element, tapProps, transition);
            Array.from(element.children).forEach((child) => {
                if (child instanceof HTMLElement) {
                    runAnimation(child, tapProps, transition);
                }
            });
            return () => {
                if (animateProps) {
                    runAnimation(element, animateProps, transition);
                    Array.from(element.children).forEach((child) => {
                        if (child instanceof HTMLElement) {
                            runAnimation(child, animateProps, transition);
                        }
                    });
                }
            };
        });
    });

    onDestroy(() => {
        hoverCleanup?.();
        tapCleanup?.();
        animationControl?.cancel?.();
    });
</script>

<svelte:element this={as} bind:this={element} style="display: inline-block;" {...rest}>
    {@render children?.()}
</svelte:element>

<style>
    :global(.motion-container) {
        display: inline-block;
    }
</style>
