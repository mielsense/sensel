export interface MotionProps {
	/** Which element to render (e.g. "div", "span", etc.). Defaults to "div". */
	as?: string;
	/** Initial CSS properties to apply immediately on mount. */
	initial?: { [key: string]: string | number };
	/** The target CSS properties to animate to.
	 * Values can be a single value or an array (for keyframes).
	 */
	animate?: { [key: string]: string | number | (string | number)[] };
	/** Transition options (duration, delay, easing, type, etc.). */
	transition?: TransitionOptions;
	/** CSS properties to animate to when hovered. (Replaces whileHover.) */
	hover?: { [key: string]: string | number | (string | number)[] };
	/** CSS properties to animate to when pressed/tapped. (Replaces whileTap.) */
	tap?: { [key: string]: string | number | (string | number)[] };

	children?: () => any;
	[key: string]: any;
}

export interface TransitionOptions {
	duration?: number; // in seconds
	delay?: number; // in seconds
	ease?: string | number[] | ((t: number) => number);
	type?: 'tween' | 'spring' | 'inertia';
	stiffness?: number;
	damping?: number;
	mass?: number;
	bounce?: number;
	restSpeed?: number;
	restDelta?: number;

	[key: string]: any;
}
