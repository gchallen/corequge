var _ = require('underscore'),
	  esprima = require('esprima');

var defaults = {
  'verbose': true,
	'variableDeclarations': false
}

function processConfig(config, src) {
  config = config || {};
  config = _.extend(_.clone(defaults), config);
  if (src) {
    config.checkFile = path.join(src, config.checkFile);
    config.ignoreFile = path.join(src, config.ignoreFile);
    config.failFile = path.join(src, config.failFile);
  }
  return config;
}

function corequge(source) {
	this.tree = esprima.parse(source, { loc: true });
	this.variables = function() {
		return this.tree;
	};
	return this;
}

exports = module.exports = corequge
