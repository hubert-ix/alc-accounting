import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel()
	},
	onwarn: (warning, handler) => {
    if (warning.code.includes("a11y")) {
      return;
    }
    handler(warning);
  }
};

export default config;
