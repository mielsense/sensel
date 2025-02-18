import { useIntersectionObserver } from 'runed';
import type { Action } from 'svelte/action';
import type { PixelLoadOptions } from './pixel-load.js';

interface PixelLoadState {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    img: HTMLImageElement | null;
    isAnimating: boolean;
    wasInView: boolean;
    pxIndex: number;
    observer: ReturnType<typeof useIntersectionObserver> | null;
}

const DEFAULT_PIXEL_FACTORS = [1, 2, 3, 4, 5, 8, 10, 15, 100];

export const pixel: Action<HTMLElement, PixelLoadOptions | undefined> = (node, options = {}) => {
    const { stepDuration = 80, initialDelay = 300, threshold = 0.1, initialFactor = 1 } = options;

    let state = $state<PixelLoadState>({
        canvas: null,
        ctx: null,
        img: null,
        isAnimating: false,
        wasInView: false,
        pxIndex: 0,
        observer: null,
    });

    function setupCanvas() {
        state.canvas = document.createElement('canvas');
        state.canvas.style.position = 'absolute';
        state.canvas.style.top = '0';
        state.canvas.style.left = '0';
        state.canvas.style.width = '100%';
        state.canvas.style.height = '100%';
        state.canvas.style.opacity = '0';
        node.style.position = 'relative';

        state.img = node.querySelector('img');
        if (!state.img) return;

        function onImageLoad() {
            if (!state.canvas || !state.img) return;

            state.canvas.width = state.img.width;
            state.canvas.height = state.img.height;
            state.ctx = state.canvas.getContext('2d');
            node.appendChild(state.canvas);
            render();
        }

        if (state.img.complete) {
            onImageLoad();
        } else {
            state.img.addEventListener('load', onImageLoad);
        }
    }

    function initIntersectionObserver() {
        state.observer = useIntersectionObserver(
            () => node,
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                const isInView = entry.isIntersecting;

                if (isInView && !state.wasInView) {
                    startEffect();
                } else if (!isInView && state.wasInView) {
                    resetEffect();
                }

                state.wasInView = isInView;
            },
            {
                threshold,
            },
        );
    }

    function startEffect() {
        if (!state.isAnimating && state.canvas) {
            state.canvas.style.opacity = '1';
            state.pxIndex = 0;
            animatePixels();
        }
    }

    function resetEffect() {
        if (state.canvas) {
            state.canvas.style.opacity = '0';
        }
        state.isAnimating = false;
        state.pxIndex = 0;
        render();
    }

    function render() {
        if (!state.ctx || !state.img || !state.canvas) return;

        const size = DEFAULT_PIXEL_FACTORS[state.pxIndex] * 0.01;

        state.ctx.imageSmoothingEnabled = size === 1;
        state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);

        // Draw at reduced size
        state.ctx.drawImage(state.img, 0, 0, state.canvas.width * size, state.canvas.height * size);

        // Scale back up
        state.ctx.drawImage(
            state.canvas,
            0,
            0,
            state.canvas.width * size,
            state.canvas.height * size,
            0,
            0,
            state.canvas.width,
            state.canvas.height,
        );
    }

    function animatePixels() {
        state.isAnimating = true;
        if (state.pxIndex < DEFAULT_PIXEL_FACTORS.length) {
            setTimeout(
                () => {
                    render();
                    state.pxIndex++;
                    animatePixels();
                },
                state.pxIndex === 0 ? initialDelay : stepDuration,
            );
        } else {
            state.isAnimating = false;
        }
    }

    // Initialize with initial factor if provided
    if (initialFactor > 1) {
        state.pxIndex = DEFAULT_PIXEL_FACTORS.findIndex((f) => f >= initialFactor) || 0;
    }

    // Initialize
    setupCanvas();
    initIntersectionObserver();

    return {
        destroy() {
            state.observer?.stop();
            state.canvas?.remove();
        },
        update(newOptions: PixelLoadOptions = {}) {
            // Update options if they change
            const { threshold: newThreshold = threshold, initialFactor: newInitialFactor = initialFactor } = newOptions;

            if (newThreshold !== threshold) {
                state.observer?.stop();
                initIntersectionObserver();
            }

            if (newInitialFactor !== initialFactor && !state.isAnimating) {
                state.pxIndex = DEFAULT_PIXEL_FACTORS.findIndex((f) => f >= newInitialFactor) || 0;
                render();
            }
        },
    };
};
