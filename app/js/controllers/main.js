'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function MainCtrl( $rootScope, $scope, $filter, getService) {

	// ViewModel
	var vm = this;
	
	vm.title = 'Main';
	vm.number = 1234;

	$scope.templateUrl = [];
	
	vm.container = [];
	$scope.hide = false;

	// WeatherService.get()
	// 	.then( function( value ) {
	// 		console.log(value);
	// 	})
	
	console.log(getService);

	var sec = getService.sys.sunset;
	var date = new Date(sec * 1000);
	var timestr = date.toLocaleTimeString();
	
	var sec1 = getService.sys.sunrise;
	var date1 = new Date(sec1 * 1000);
	var timestr1 = date1.toLocaleTimeString();

	console.log(date, timestr);

	// $("#d1").html(date);
	// $("#d2").html(timestr);

	if(getService.weather[0].id===802)
	{
		$scope.weatherIcon='wi wi-day-cloudy';
	}
	else if(getService.weather[0].id===800)
	{
		$scope.weatherIcon='wi wi-day-sunny';
	}
	else if(getService.weather[0].id===804)
	{
		$scope.weatherIcon='wi wi-day-sunny-overcast';
	}
	else if (getService.weather[0].id===803||getService.weather[0].id===802)
	{
		$scope.weatherIcon='wi wi-cloudy';	
	}
	else if (getService.weather[0].id===801)
	{
		$scope.weatherIcon='wi wi-cloud';
	}
	else if(getService.weather[0].id===500)
	{
		$scope.weatherIcon='wi wi-sleet';
	}
	else if(getService.weather[0].id===501)
	{
		$scope.weatherIcon='wi wi-showers';
	}
	else if(getService.weather[0].id===502)
	{
		$scope.weatherIcon='wi wi-rain-mix';
	}
	else if(getService.weather[0].id===503)
	{
		$scope.weatherIcon='wi wi-rain';
	}
	else if(getService.weather[0].id===504)
	{
		$scope.weatherIcon='wi wi-rain-wind';
	}
	else
	{
		$scope.weatherIcon='wi wi-na';
	}

	$scope.weatherName = getService.weather[0].description;

	$scope.weatherHum = getService.main.humidity;

	$scope.weatherTemp = getService.main.temp;

	$scope.weatherRise = timestr1;

	$scope.weatherSet = timestr;
	$scope.AddRow = function()
	{
		$scope.createTodo='';
		var template = {'name':'','url':'tr-layout-save.html','isDone': false,'btnSetColor': true,'btnDisable':false};
		$scope.templateUrl.push(template);
	}

	$scope.SaveTodo = function(index,created){
	
		var template = {'name':created,'url':'tr-layout-edit.html','isDone': false,'btnSetColor': true,'btnDisable':false};
		$scope.templateUrl[index] = template;
		vm.container = $scope.templateUrl;
	}

	$scope.EditRow = function(index,edited) {

		var template = {'name':edited,'url':'tr-layout-toedit.html','isDone': false,'btnSetColor': true,'btnDisable':false};
		console.log(edited);
		$scope.templateUrl[index] = template;		
		vm.container = $scope.templateUrl;
	}

	$scope.toSaveTodo = function(index, created)
	{
		// console.log(this.template);
		var template = {'name':created,'url':'tr-layout-edit.html','isDone':false,'btnSetColor': true,'btnDisable':false};
		$scope.templateUrl[index] = template;
		vm.container = $scope.templateUrl;
	}

	$scope.DeleteRow = function(index) {
		$scope.templateUrl.splice(index, 1);
		vm.container = $scope.templateUrl;
	}

	$scope.toggle = function(){
		vm.container = $scope.templateUrl;
		this.template.btnSetColor = !this.template.btnSetColor;
		this.template.btnDisable = !this.template.btnDisable;
		return this.template.isDone = !this.template.isDone;

	}

	$scope.HideRow = function(){
		var data = vm.container;

		var notDone = $filter('filter')(vm.container, {isDone:false});
		var allDone = $filter('filter')(vm.container, {isDone:true});

		console.log(notDone);
		console.log(allDone);
		console.log(vm.container);

		if($scope.hide) {
			$scope.templateUrl = data;
		} else {
			$scope.templateUrl = notDone;
		}

		$scope.hide = !$scope.hide;
	}



}

controllersModule.controller('MainCtrl', MainCtrl);
