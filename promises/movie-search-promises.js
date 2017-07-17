const express = require('express')
const app = express()
const cheerio = require('cheerio')
const rp = require('request-promise')

app.get('/api/search/:query', (req, res) => {
	const query = req.params.query
	// res.send(testIMBD(query))
	testIMBD(query)
})

function testIMBD(search) {

	const options = {
		uri: `http://www.imdb.com/find`,
		qs: {
			ref_: 'nv_sr_fn',
			q: search,
			s: 'all'
		},
		transform: function (body) {
			return cheerio.load(body)
		}
	}

	return rp(options)
		.then(function ($) {
			const movieNames = $('.findSection').first()
				.find('.result_text a')
				.not('small  a')
				.map((i, ele) => $(ele).text())
				.toArray()

			const movieYears = $('.findSection').first()
				.find('.result_text')
				.not('a')
				.map((i, ele) => $(ele).text().slice(movieNames[i].length+2, movieNames[i].length+8))
				.toArray()
			let output = {"movies": []}
			for (let i = 0; i < movieNames.length; i++) {
				let movieObject = {}
				movieObject.name = movieNames[i]
				movieObject.year = movieYears[i]
				output.movies.push(movieObject)
			}
			console.log(output);
		})
		.catch(function (err) {
			console.log('You have an error: ' + err)
			throw err
	  })
}

function run() {
	const search = process.argv[2]

	testIMBD(search)
}

if (!module.parent) {
	run()
}

const port = 3000

app.listen(port, () => {
	console.log('Express server is listening on port', port)
})

module.exports = testIMBD
