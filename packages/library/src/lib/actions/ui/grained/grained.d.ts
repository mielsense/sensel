import type { Action } from "svelte/action";

export interface GrainedOptions {
    animate?: boolean;
    patternWidth?: number;
    patternHeight?: number;
    grainOpacity?: number;
    grainDensity?: number;
    grainWidth?: number;
    grainHeight?: number;
    grainChaos?: number;
    grainSpeed?: number;
}

export interface GrainedParameters {
    node: HTMLElement;
    parameters?: GrainedOptions;
}

export type GrainedAction = Action<HTMLElement, GrainedOptions>;
export type GrainedActionAttributes = {
    use: {
        grainedAction: GrainedParameters["parameters"];
    };
};
