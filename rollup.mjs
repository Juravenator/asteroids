import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	output: {
		// format: 'iife',
    format: 'es',
    compact: false,
    sourcemap: false,
	},
  plugins: [nodeResolve()]
};
