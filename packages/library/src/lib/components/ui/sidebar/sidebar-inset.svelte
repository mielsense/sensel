<script lang="ts">
    import { cn } from "$lib/utils.js";
    import type { WithElementRef } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";
    let {
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<main
    bind:this={ref}
    class={cn(
        "bg-background relative flex min-h-svh flex-1 flex-col overflow-hidden",
        "peer-data-[variant=inset]:min-h-[calc(100svh-6svh)] md:peer-data-[variant=inset]:m-3 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:shadow",
        className
    )}
    {...restProps}
>
    {@render children?.()}
</main>
