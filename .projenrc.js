const { typescript } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'kakiyasu',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  packageName: 'kakiyasu', /* The "name" in package.json. */
  npmRegistryUrl: 'https://registry.npmjs.org/',
});

project.tsconfig.compilerOptions.lib.push('dom');
project.gitignore.addPatterns('.DS_Store', '.idea');

project.synth();