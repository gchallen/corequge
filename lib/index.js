var esprima = require('esprima'),
		esprima_walk = require('esprima-walk'),
		_ = require('underscore');

function corequge (source) {
	this.tree = esprima.parse(source, { loc: true });

	function filterNodes(test) {
		var nodes = [];
		esprima_walk.walkAddParent(this.tree, function (node) {
			if (test(node)) {
				nodes.push(node);
			}
		});
		return nodes;
	}

	function findParent(node, test) {
		while (node !== undefined) {
			if (test(node)) {
				return node;
			}
			node = node.parent;
		}
	}

	this.variableInitialization = function() {
		var nodes = filterNodes(function (node) {
			return node.type === "VariableDeclarator" &&
					node.init !== null &&
					node.init.type !== "FunctionExpression";
		});
		var declarations = {};
		_.chain(nodes)
			.map(function (node) {
				return findParent(node, function (node) {
					return node.type === "VariableDeclaration"
				});
			})
			.filter(function (node) {
				return (['var', 'let'].indexOf(node.kind) !== -1);
			})
			.each(function (node) {
				var hash = node.loc.start.line + "." + node.loc.start.column;
				(declarations[hash] = declarations[hash] || []).push(node);
			});
		console.log(declarations);
		return this;
	}

	return this;
}

exports = module.exports = corequge
