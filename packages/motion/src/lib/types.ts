export interface MotionProps {
    /** Which element to render (e.g. "div", "span", etc.). Defaults to "div". */
    as?: string;

    /** Initial CSS properties to apply immediately on mount. */
    initial?: Record<string, string | number>;

    /** The target CSS properties to animate to. */
    animate?: Record<string, string | number | (string | number)[]>;

    /** Transition options (duration, delay, easing, type, etc.). */
    transition?: TransitionOptions;

    /** CSS properties to animate to when hovered. */
    hover?: Record<string, string | number | (string | number)[]>;

    /** CSS properties to animate to when pressed/tapped. */
    tap?: Record<string, string | number | (string | number)[]>;

    children?: () => any;
    [key: string]: any;
}

export interface TransitionOptions {
    duration?: number;
    delay?: number;
    ease?: string | number[] | ((t: number) => number);
    type?: "tween" | "spring" | "inertia";
    stiffness?: number;
    damping?: number;
    mass?: number;
    bounce?: number;
    restSpeed?: number;
    restDelta?: number;
    [key: string]: any;
}
