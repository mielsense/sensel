import animate from './actions/motion-animate.js';
import MotionDiv from './components/motion-div.svelte';
import Motion from './components/motion.svelte';

export * from './types.js';

(Motion as any).Div = MotionDiv;

export { animate, Motion };
