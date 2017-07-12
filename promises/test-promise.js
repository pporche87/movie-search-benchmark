const chai = require('chai')
const { expect } = require('chai')
require('sepia')

const testIMBD = require('./movie-search-promises')

describe('testIMBD', function() {

	it('should return a resolved promise', (done) => {
		testIMBD('nemo')
			.then(results => {
				expect(results).to.eql(' Nemo (1984) \n Nemo (1990) (Video Game) ')
				done()
			})
	})

	it('should return an empty string', (done) => {
		testIMBD('lkdjafdlfa')
			.then(results => {
				expect(results).to.eql('')
				done()
			})
	})

	it('should return an empty string', (done) => {
		testIMBD({})
			.then(results => {
				expect(results).to.eql('')
				done()
			})
	})

	it('should return an empty string', (done) => {
		testIMBD([])
			.then(results => {
				expect(results).to.eql('')
				done()
			})
	})
})
