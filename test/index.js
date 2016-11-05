var chai = require('chai'),
		corequge = require('..');

describe('corequge', function() {
	it('should parse simple variable declarations', function (done) {
		var questions = corequge('var x = 42');
		done();
	});
});
