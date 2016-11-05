var chai = require('chai'),
		corequge = require('..');

describe('corequge', function() {
	it('should parse literal variable declarations', function (done) {
		var questions = corequge('var answer = 42').variables();
		done();
	});
});
