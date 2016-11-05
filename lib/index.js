var esprima = require('esprima');

function corequge (source) {
	this.tree = esprima.parse(source);
	this.variables = function() {
		return this.tree;
	};
}

exports = module.exports = corequge
