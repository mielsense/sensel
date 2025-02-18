import type { Action } from 'svelte/action';

export interface PixelateOptions {
	id?: string;
	size?: number;
	crossLayers?: boolean;
}

export type PixelateAction = Action<HTMLElement, PixelateOptions | undefined>;
