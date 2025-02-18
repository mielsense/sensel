import type { Action } from 'svelte/action';

export interface PixelLoadOptions {
    // initial pixel factor (default: 1)
    initialFactor?: number;
    // animation duration per step in ms (default: 80)
    stepDuration?: number;
    // animation delay before starting in ms (default: 300)
    initialDelay?: number;
    // intersection observer threshold (default: 0.1)
    threshold?: number;
}

export interface PixelLoadParameters {
    // dom node to apply the action to
    node: HTMLElement;
    // (optional) action parameters
    parameters?: PixelLoadOptions;
}

export type PixelLoadAction = Action<HTMLElement, PixelLoadOptions>;
export type PixelLoadActionAttributes = {
    use: {
        pixel: PixelLoadParameters['parameters'];
    };
};
