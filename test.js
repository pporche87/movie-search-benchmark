const chai = require('chai')
const { expect } = require('chai')
require('sepia')

const { queryIMBD } = require('./movie-search')

describe('queryIMBD', function() {

	it('should return an array of movie names and dates', (done) => {
		queryIMBD('nemo', (error, results) => {
			expect(results).to.be.an('array')
			expect(results).to.eql([' Nemo (1984) ', ' Nemo (1990) (Video Game) '])
			done()
		})
	})
})
