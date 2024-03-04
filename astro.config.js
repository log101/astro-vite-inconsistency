import fs from 'fs/promises';
import path from 'path';

export default {
	renderers: [],
	vite: {
		plugins: [
			{
				name: '@astrojs/svg-test',
				enforce: 'pre',
				apply: 'build',
				async load(id = '') {
					if (id.endsWith('.svg')) {
						const asset = {
							type: 'asset',
							name: path.basename(id),
							source: await fs.readFile(id, 'utf8'),
						};

						const referenceId = asset.name;

						const reference = `import.meta.ROLLUP_FILE_URL_${referenceId}`;

						console.log('load', { id, asset, referenceId, reference });

						return `console.log(import.meta); export default ${reference};`;
					}
				},
			},
		],
	},
};
