<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import { Menu, X } from 'lucide-svelte';

	// ------------------------------------

	interface Props {
		open: boolean;
		title?: string;
		description?: string;
		children?: any;
		class?: string;
	}

	let {
		open = $bindable(false),
		title = 'Title',
		description = 'Description',
		class: classNames = '',
		children,
		...others
	}: Props = $props();

	// ------------------------------------

	let mobile: IsMobile = new IsMobile();
</script>

{#snippet actions()}
	{#if open}
		<X class="size-6" />
	{:else}
		<Menu class="size-6" />
	{/if}
	Fermer
{/snippet}

{#if mobile.current}
	<Drawer.Root {open} onOpenChange={() => (open = !open)}>
		<Drawer.Content class={classNames}>
			<div class="mx-auto w-full max-w-sm">
				<Drawer.Header>
					<Drawer.Title>{title}</Drawer.Title>
					<Drawer.Description>{description}</Drawer.Description>
				</Drawer.Header>

				<div class="center p-5">
					{@render children?.()}
				</div>

				<Separator class="w-64 mx-auto" />

				<Drawer.Footer>
					<Drawer.Close>
						{#snippet child({ props })}
							<Button variant="outline" class="gap-2" {...props}>
								{@render actions()}
							</Button>
						{/snippet}
					</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<Dialog.Root {open} onOpenChange={() => (open = !open)}>
		<Dialog.Content class={classNames}>
			<div class="mx-auto w-full max-w-sm p-4 my-8">
				<Dialog.Header>
					<Dialog.Title>{title}</Dialog.Title>
					<Dialog.Description>{description}</Dialog.Description>
				</Dialog.Header>

				<div class="center mt-4">
					{@render children?.()}
				</div>
				<!--
            <Separator class="w-64 mx-auto" />

            <Dialog.Footer>
               <Dialog.Close asChild let:builder>
                  <Button builders={[builder]} class="w-[80%] mx-auto gap-2">
                    {@render actions()}
                  </Button>
               </Dialog.Close>
            </Dialog.Footer> -->
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}
