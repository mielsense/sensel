/**
 * Svelte action to imperatively apply motion animations to an element.
 * Uses the motion library’s animate() function.
 */

import { animate } from 'motion';

export interface MotionActionParams {
	to: { [key: string]: string | number | (string | number)[] };
	options?: { [key: string]: any };
}

export default function motionAnimate(node: HTMLElement, params: MotionActionParams) {
	let animationControl = animate(node, params.to, params.options);

	return {
		update(newParams: MotionActionParams) {
			if (animationControl.cancel) animationControl.cancel();
			animationControl = animate(node, newParams.to, newParams.options);
		},
		destroy() {
			if (animationControl.cancel) animationControl.cancel();
		}
	};
}
