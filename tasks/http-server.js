"use strict";

/*
 * Run a http server on grunt!

Task:
	'http-server': {
		root: <path>,
		port: 8282,
		host: "127.0.0.1",
		cache: <sec>,
		showDir : true,
		autoIndex: true,
		defaultExt: "html",
		runInBAckground: true|false
	}
*/

module.exports = function(grunt) {

	var Server = require('http-server'),
		_ = require('lodash');

	grunt.registerMultiTask(
		'http-server',
		function () {
			// grunt async task
			var done = this.async();

			var defaults = {
				root: process.cwd(),
				port: 8282,
				host: "127.0.0.1",
				cache: 20,
				showDir : true,
				autoIndex: true,
				defaultExt: "html",
				runInBAckground: false
			};

			var options = _.extend({}, defaults, this.data);

			var server = Server.createServer(options);

			server.listen(options.port, options.host, function() {
				console.log("Server running on ", options.host + ":" + options.port);
				console.log('Hit CTRL-C to stop the server');
			});

			process.on('SIGINT', function () {
				console.log('http-server stopped');
				server.close();
				done();
				process.exit();
			});

			// async support - run in background
			if(options.runInBAckground)
				done();
		}
	);
}
