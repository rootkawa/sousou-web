const { createConfig } = require('semantic-release-config-gitmoji/lib/createConfig');

const config = createConfig({
  branches: ['sousou'],
  tagFormat: 'v${version}',
  changelogTitle: `<a name="readme-top"></a>
# Changelog`,
  releaseRules: [
    {
      release: 'minor',
      type: 'feat',
    },
    {
      release: 'patch',
      type: 'fix',
    },
    {
      release: 'patch',
      type: 'perf',
    },
    {
      release: 'patch',
      type: 'style',
    },
    {
      release: 'patch',
      type: 'refactor',
    },
    {
      release: 'patch',
      type: 'build',
    },
    { release: 'patch', scope: 'README', type: 'docs' },
    { release: 'patch', scope: 'README.md', type: 'docs' },
    { release: false, type: 'docs' },
    {
      release: false,
      type: 'test',
    },
    {
      release: false,
      type: 'ci',
    },
    {
      release: false,
      type: 'chore',
    },
    {
      release: false,
      type: 'wip',
    },
    {
      release: 'major',
      type: 'BREAKING CHANGE',
    },
    {
      release: 'major',
      scope: 'BREAKING CHANGE',
    },
    {
      release: 'major',
      subject: '*BREAKING CHANGE*',
    },
    { release: 'patch', subject: '*force release*' },
    { release: 'patch', subject: '*force patch*' },
    { release: 'minor', subject: '*force minor*' },
    { release: 'major', subject: '*force major*' },
    { release: false, subject: '*skip release*' },
  ],
});

// Force branches to only include 'sousou-feat' (overwriting any defaults)
config.branches = ['sousou'];

module.exports = config;
