<script lang="ts" module>
    import { type VariantProps, tv } from "tailwind-variants";

    export const badgeVariants = tv({
        base: "focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
                    primary:
                    "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
                outline: "text-foreground",
                dark: "bg-foreground text-background",
                slate: "bg-slate-500 text-white hover:bg-slate-600 border-transparent",
                gray: "bg-gray-500 text-white hover:bg-gray-600 border-transparent",
                zinc: "bg-zinc-500 text-white hover:bg-zinc-600 border-transparent",
                neutral:
                    "bg-neutral-500 text-white hover:bg-neutral-600 border-transparent",
                stone: "bg-stone-500 text-white hover:bg-stone-600 border-transparent",
                red: "bg-red-500 text-white hover:bg-red-600 border-transparent",
                orange: "bg-orange-500 text-white hover:bg-orange-600 border-transparent",
                amber: "bg-amber-500 text-white hover:bg-amber-600 border-transparent",
                yellow: "bg-yellow-400 text-black hover:bg-yellow-500 border-transparent",
                lime: "bg-lime-500 text-white hover:bg-lime-600 border-transparent",
                green: "bg-green-500 text-white hover:bg-green-600 border-transparent",
                emerald:
                    "bg-emerald-500 text-white hover:bg-emerald-600 border-transparent",
                teal: "bg-teal-500 text-white hover:bg-teal-600 border-transparent",
                cyan: "bg-cyan-500 text-white hover:bg-cyan-600 border-transparent",
                sky: "bg-sky-500 text-white hover:bg-sky-600 border-transparent",
                blue: "bg-blue-500 text-white hover:bg-blue-600 border-transparent",
                indigo: "bg-indigo-500 text-white hover:bg-indigo-600 border-transparent",
                violet: "bg-violet-500 text-white hover:bg-violet-600 border-transparent",
                purple: "bg-purple-500 text-white hover:bg-purple-600 border-transparent",
                fuchsia:
                    "bg-fuchsia-500 text-white hover:bg-fuchsia-600 border-transparent",
                pink: "bg-pink-500 text-white hover:bg-pink-600 border-transparent",
                rose: "bg-rose-500 text-white hover:bg-rose-600 border-transparent",
                area: "bg-[#EB5E43] text-white hover:bg-[#EB5E43] border-transparent",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    });

    export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
    import { cn } from "$lib/utils.js";
    import type { WithElementRef } from "bits-ui";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    let {
        ref = $bindable(null),
        href,
        class: className,
        variant = "default",
        children,
        ...restProps
    }: WithElementRef<HTMLAnchorAttributes> & {
        variant?: BadgeVariant;
    } = $props();
</script>

<svelte:element
    this={href ? "a" : "span"}
    bind:this={ref}
    {href}
    class={cn(badgeVariants({ variant, className }))}
    {...restProps}
>
    {@render children?.()}
</svelte:element>
