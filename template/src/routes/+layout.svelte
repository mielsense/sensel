<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	// -------------------------------------

	let props = $props();

	let pageTitle = $state('');
	const toastOptions = {
		class: 'bg-snow'
	};

	// -------------------------------------

	function formatPathToTitle(path: string): string {
		const pageName = path.split('/').pop() || 'Home';
		return pageName.charAt(0).toUpperCase() + pageName.slice(1);
	}

	$effect(() => {
		pageTitle =
			page.url.pathname === '/'
				? PUBLIC_APP_NAME
				: `${PUBLIC_APP_NAME} - ${formatPathToTitle(page.url.pathname)}`;
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<ModeWatcher />
<Toaster {toastOptions} />

<main class="h-dvh w-dvw overflow-hidden relative">
	{@render props?.children()}
</main>
