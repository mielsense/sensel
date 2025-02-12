import type { Action } from 'svelte/action';

export interface PixelOptions {
    // initial pixel factor (default: 1)
    initialFactor?: number;
    // animation duration per step in ms (default: 80)
    stepDuration?: number;
    // animation delay before starting in ms (default: 300)
    initialDelay?: number;
    // intersection observer threshold (default: 0.1)
    threshold?: number;
}

export interface PixelParameters {
    // dom node to apply the action to
    node: HTMLElement;
    // (optional) action parameters
    parameters?: PixelOptions;
}

export type PixelAction = Action<HTMLElement, PixelOptions>;
export type PixelActionAttributes = {
    use: {
        pixel: PixelParameters['parameters'];
    };
};
