module.exports = {
  branches: ['main', { 'name': 'rc/*', 'channel': 'rc', 'prerelease': 'rc' }],
  preset: 'conventionalcommits',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `./CHANGELOG.md`,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: `VERSION=\${nextRelease.version} npx nx run-many -t release && VERSION=\${nextRelease.version} npx -p replace-json-property rjp ./package.json version \${nextRelease.version}`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [`packages/**/package.json`, `package.json`, `CHANGELOG.md`],
        message:
          'chore(release): -v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
