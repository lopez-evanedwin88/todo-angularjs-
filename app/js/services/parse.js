'use strict';

var servicesModule = require('./_index.js');

function ParseService($q, Parse) {

	this.intiate = function()
	{
		var object = Parse.Object.extend("TodoObject");
		var temp = new object();
		return temp;
	}

	this.intiateParse = function()
	{
		var object = Parse.Object.extend("TodoObject");
		return object;
	}

}

servicesModule.service('ParseService', ParseService);

