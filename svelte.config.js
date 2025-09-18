import adapter from '@sveltejs/adapter-static';
import node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: process.env.NODE_ENV === 'production' ? adapter() : node(),
		paths: {
			relative: true
		}
	}
};

export default config;
