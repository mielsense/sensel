<script lang="ts">
	/**
	 * MotionDiv is a convenience wrapper around Motion that always renders a <div>.
	 */
	import Motion from './motion.svelte';

	// Read all incoming props from $props()
	let props = $props();
</script>

<Motion as="div" {...props} />
