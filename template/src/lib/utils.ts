import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('en-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
