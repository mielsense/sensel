import { type Handle, type HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const AUTH_TOKEN_COOKIE = 'auth_token';

// authentication middleware - handles user session
export const authentication: Handle = async ({ event, resolve }) => {
	// const authToken = event.cookies.get(AUTH_TOKEN_COOKIE);
	// if (authToken) {
	// 	try {
	// 		const { data, error } = await AUTH_FETCH<any>('/user/profile?includeAccounts=true', {
	// 			auth: {
	// 				type: 'Bearer',
	// 				token: authToken
	// 			}
	// 		});
	// 		if (error) {
	// 			throw error;
	// 		}

	// 		event.locals.token = authToken;
	// 		event.locals.user = data.data || null;

	// 		// random avatar if user has no image
	// 		if (!event.locals.user.image) {
	// 			event.locals.user.image = `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${event.locals.user.name}`;
	// 		}
	// 	} catch (error) {
	// 		console.error('Failed to fetch user data:', error);

	// 		event.locals.user = null;
	// 		event.locals.token = undefined;
	// 		event.cookies.delete(AUTH_TOKEN_COOKIE, { path: '/' });
	// 	}
	// } else {
	// 	event.locals.user = null;
	// 	event.locals.token = undefined;
	// 	event.cookies.delete(AUTH_TOKEN_COOKIE, { path: '/' });
	// }

	const response = await resolve(event);
	return response;
};

// route protection middleware - handles access control
export const routeProtection: Handle = async ({ event, resolve }) => {
	// const publicRoutes = ['/', '/login', '/register'];
	// const publicApiPrefixes = ['/api/auth', '/providers/callback'];

	// const isPublicRoute = publicRoutes.includes(event.url.pathname);
	// const isPublicApiRoute = publicApiPrefixes.some((prefix) =>
	// 	event.url.pathname.startsWith(prefix)
	// );

	// // Handle authenticated users accessing public routes (e.g., login page)
	// if (event.locals.user && isPublicRoute) {
	// 	throw redirect(303, '/dashboard');
	// }

	// // Handle unauthenticated users accessing protected routes
	// if (!isPublicRoute && !isPublicApiRoute && !event.locals.user) {
	// 	throw redirect(303, '/login');
	// }

	const response = await resolve(event);
	return response;
};

// fetch middleware - handles API requests
// tw:: try to fix the missing origin header bug (cf seb & sami)
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	return fetch(request);
};

export const handle = sequence(authentication, routeProtection);
