import type { GlobalConfig } from 'semantic-release';

const config: GlobalConfig = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{ message: '*semver:major*', release: 'major' },
					{ message: '*semver:minor*', release: 'minor' },
					{ message: '*semver:patch*', release: 'patch' },
					{ message: '*', release: 'patch' },
				],
			},
		],
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		['@semantic-release/npm', { npmPublish: false }],
		[
			'@semantic-release/git',
			{
				assets: ['package.json', 'CHANGELOG.md'],
				message: 'chore(release): ${nextRelease.version} [skip ci]',
			},
		],
		'@semantic-release/github',
	],
	repositoryUrl: 'https://github.com/hypermarinov/lucidlink-assignment.git',
	tagFormat: 'v${version}',
};

export default config;
