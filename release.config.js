/**
 * @type {import('semantic-release').GlobalConfig}
 */

module.exports = {
    branches: ['master'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        '@semantic-release/github',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md'
            }
        ],
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ]
    ]
}
