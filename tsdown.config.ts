import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		promises: 'src/counting/promises.ts',
	},
	format: ['esm', 'cjs'],
	sourcemap: true,
	clean: true,
	dts: true,
	minify: true,
});
