const chai = require('chai')
const { expect } = require('chai')
require('sepia')

const { queryIMBD } = require('./movie-search')

describe('queryIMBD', function() {

	it('should return an array of movie names and dates', (done) => {
		queryIMBD('nemo')
		.then(function ($) {
			const movieNames = $('.findSection').first()
				.find('.result_text')
				.map((i, ele) => $(ele).text())
				.toArray()
			console.log(movieNames.join('\n'))
		})
		.catch(function (err) {
			console.log('You have an error: ' + err)
			throw err
		})


		, (error, results) => {
			expect(results).to.be.an('array')
			expect(results).to.eql([' Nemo (1984) ', ' Nemo (1990) (Video Game) '])
			done()
		})
	})
})
