const Promise = require('bluebird');
var Sandbox = require('sandbox')
  , s = new Sandbox()
	, html = require('html-escaper');

var run = Promise.method(function(data, userData, bot) {
	var code = html.unescape(data.matches[3]);
	return new Promise(function(resolve,reject) {
		s.run(code, function(output) {
			bot.sendMessage({ text: "```"+output.result+"```" })
		});
	});
});

exports.load = function(registry) {
	var helpText = 'paste me some code.';
	registry.hear(/```([\s\n]*?\/\/[\s]*?(js|javascript))([^]*?)```/,run);
	// registry.register(
	// 	// NAME
	// 	'sandbox',
	// 	// TRIGGER
	// 	/```([\s\n]*?\/\/[\s]*?(js|javascript))([^]*?)```/im,
	// 	// METHOD
	// 	run,
	// 	// HELPT TEXT
	// 	helpText
	// );
	return true;
};
