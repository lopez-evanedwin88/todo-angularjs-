'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function WeatherService($q, $http) {

	var service = {};

	service.get = function() {
		var deferred = $q.defer();

		var api = {
			method: 'GET',
			url : 'http://api.openweathermap.org/data/2.5/weather?q=Cebu,ph&units=metric&appid=2de143494c0b295cca9337e1e96b00e0'
		};
		// $http.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0')
		$http(api).success(function(data) {
				deferred.resolve(data);
		}).error(function(err, status) {
				deferred.reject(err, status);
		});

		return deferred.promise;
	};

	return service;

}

servicesModule.service('WeatherService', WeatherService);
