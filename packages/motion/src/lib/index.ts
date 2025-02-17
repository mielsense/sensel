import animate from "./actions/motion-animate.js";
import MotionDiv from "./components/motion-div.svelte";
import Motion from "./components/motion.svelte";

export * from "./types.js";

const MotionWithVariants = Object.assign(Motion, { div: MotionDiv });

export { animate, MotionWithVariants as Motion };
