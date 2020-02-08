#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const superagent = require('superagent')
const child_process = require('child_process')

const poster = 'memset0'
const default_syntax = 'text'
const default_expiration = ''
const is_open_in_browser = true

const syntax_table = {
	'.cpp': 'cpp',
	'.py': 'python3'
}

function open_in_browser(url) {
	let cmd = ''
	if (process.platform == 'wind32') {
		cmd = 'cmd /c start'
	} else if (process.platform == 'linux') {
		cmd = 'x-www-browser'
	} else if (process.platform == 'darwin') {
		cmd = 'open'
	}
	child_process.exec(`${cmd} ${url}`)
}

function post(content, syntax = default_syntax, expiration = default_expiration){
	superagent
		.post('https://paste.ubuntu.com/')
		.redirects(0)
		.send({
			poster: poster,
			syntax: syntax,
			expiration: expiration,
			content: content
		})
		.set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
		.set('content-type', 'application/x-www-form-urlencoded')
		.end((res, err) => {
			if (err.status == 302) {
				let location = err.header.location
				let url = 'https://paste.ubuntu.com' + location
				console.log('Success:', url)
				if (is_open_in_browser) {
					open_in_browser(url)
				}
			} else {
				console.error('Error, Unknown Response!')
			}
		})
}

(() => {
	let argument = process.argv.splice(2)
	if (argument.length == 0) {
		console.error('Error, Input is Required!')
		return
	}
	let input = argument[0]
	let filepath = ''
	if (path.isAbsolute(input)) {
		filepath = input
	} else {
		filepath = path.join(process.cwd(), input)
	}
	if (!fs.existsSync(filepath)) {
		console.error('Error, File not Found!')
		return
	}
	let syntax = default_syntax
	let extname = path.extname(filepath)
	if (syntax_table.hasOwnProperty(extname)) {
		syntax = syntax_table[extname]
	}
	fs.readFile(filepath, (err, data) => {
		post(data, syntax)
	})
})()
