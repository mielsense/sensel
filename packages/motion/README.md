# Svelte Motion Wrapper

This package provides a Svelte 5 wrapper around a motion library (such as Motion or Motion+)
to offer a Framer Motion–like API for declarative animations. It leverages Svelte 5’s new runes API,
meaning that props are obtained via the `$props()` rune rather than using `export let`.

## Components

### Motion

A generic component that accepts the following properties via `$props()`:

- **as**: _string_
  The element type to render (e.g. `"div"`, `"section"`, etc.). Defaults to `"div"`.

- **initial**: _object_
  An object containing the initial CSS properties to apply immediately on mount.

- **animate**: _object_
  The target CSS properties to animate to. Values can be a single value or an array (for keyframes).

- **transition**: _object_
  Transition options such as duration, delay, easing, and type.
  (Example: `{ duration: 0.5, ease: 'easeOut', type: 'spring' }`)

- **hover**: _object_
  CSS properties to animate to when the element is hovered.

- **tap**: _object_
  CSS properties to animate to when the element is pressed/tapped.

- **children**: _snippet_
  In Svelte 5, content placed between component tags is provided as a snippet prop named `children` and rendered using `{@render children()}`.

Any additional HTML attributes (e.g. `class`, `id`) are forwarded to the rendered element.

**Usage Example:**

```svelte
<script lang="ts">
  import { Motion } from 'your-motion-wrapper';
</script>

<Motion
  as="section"
  initial={{ opacity: 0, transform: 'translateY(20px)' }}
  animate={{ opacity: 1, transform: 'translateY(0)' }}
  transition={{ duration: 0.5, ease: 'easeOut', type: 'spring' }}
  hover={{ scale: 1.05 }}
  tap={{ scale: 0.95 }}
  class="animated-section">
  <h2>Animated Section</h2>
</Motion>
```
