const { build } = require('esbuild')
var argv = require('minimist')(process.argv.slice(2));

function _getEnvFileName(env) {
  return `./.env.${env}`;
}

function _formatEnvs(variables) {
  const newObj = {};
  Object.keys(variables).forEach((key) => {
    newObj['process.env.'+key] = JSON.stringify(variables[key]);
  });

  return newObj;
}

const envs = require('dotenv').config({
  path: _getEnvFileName(argv.environment),
});

const options = {
  entryPoints: ['./src/app.tsx'],
  outfile: './public/bundle.js',
  bundle: true,
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"', 
    ..._formatEnvs(envs.parsed)
  },
}

build(options).catch(() => process.exit(1))