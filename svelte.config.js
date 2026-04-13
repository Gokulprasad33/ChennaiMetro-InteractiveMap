import adapter from '@sveltejs/adapter-static';
import { relative, sep } from 'path';

const config = {
	compilerOptions: {
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes('node_modules');

			return isExternalLibrary ? undefined : true;
		}
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),

		paths: {
			base: '/ChennaiMetro-InteractiveMap'
		},
		alias: {
			"@/*": "./path/to/lib/*"
		}
	}
};

export default config;