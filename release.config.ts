import type { GlobalConfig } from 'semantic-release';

const config: GlobalConfig = {
    branches: ['main'],
    plugins: [
        ['@semantic-release/commit-analyzer', {
            preset: 'angular',
            releaseRules: [
                { message: '*semver:major*', release: 'major' },
                { message: '*semver:minor*', release: 'minor' },
                { message: '*semver:patch*', release: 'patch' },
                { message: '*', release: 'patch' },
            ],
        }],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/git',
        '@semantic-release/github',
    ],
    repositoryUrl: '',
    tagFormat: ''
};

export default config;