'use strict';

var controllersModule = require('./_index');


/**
 * @ngInject
 */
function MainCtrl( $rootScope, $scope, $filter, getService, Parse, ParseService) {
	
	// ViewModel
	var vm = this;
	vm.title = 'Main';
	vm.number = 1234;
	$scope.templateUrl = [];
	
	// $scope.templateUrl.push({'name':'','url':'tr-layout-save.html','isDone': false,'btnSetColor': true,'btnDisable':false});

	vm.container = [];
	$scope.hide = false;

	// var object = Parse.Object.extend("TestObject");
	// var temp = new object();
	// temp.set("name","evan");
	// temp.set("look","gwapo");
	// temp.save();

	var todoList = ParseService.intiateParse();
	var query = new Parse.Query(todoList);

	query.find({
		success: function(results){
			for ( var i = 0; i < results.length; i++)
			{
				$scope.templateUrl.push({'name':results[i].get('name'),'url':results[i].get('url'),'isDone':results[i].get('isDone'),'btnSetColor':results[i].get('btnSetColor'),'btnDisable':results[i].get('btnDisable'),'ObjectId':results[i].id});
			}
		},
		error: function(error){
			alert("Error: " + error.code + " "+ error.message);
		}
	});
	vm.container = $scope.templateUrl;


	var sec = getService.sys.sunset;
	var date = new Date(sec * 1000);
	var timestr = date.toLocaleTimeString();
	
	var sec1 = getService.sys.sunrise;
	var date1 = new Date(sec1 * 1000);
	var timestr1 = date1.toLocaleTimeString();


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
		var template = {'name':'','url':'tr-layout-save.html','isDone': false,'btnSetColor': true,'btnDisable':false, 'ObjectId':null};
		$scope.templateUrl.push(template);
	}

	$scope.SaveTodo = function(index,created){
	
		var template = {'name':created,'url':'tr-layout-edit.html','isDone': false,'btnSetColor': true,'btnDisable':false, 'ObjectId':null};
		$scope.templateUrl[index] = template;
		vm.container = $scope.templateUrl;
		var parsecreate = ParseService.intiate();
		parsecreate.set("name",created);
		parsecreate.set("url",'tr-layout-edit.html');
		parsecreate.set("isDone",false);
		parsecreate.set("btnSetColor",true);
		parsecreate.set("btnDisable",false);
		parsecreate.save(null,{
			success: function(parsecreate){
				alert('Successfully added to the List');
				template.ObjectId = parsecreate.id;
			},
			error: function(parsecreate,error){
				alert('Failed to Add in the list '+error.message );
			}
		});
	}

	$scope.EditRow = function(index,id) {

		var parseEdit = ParseService.intiateParse();
		var query = new Parse.Query(parseEdit);
		query.get(id,{
			success: function(todo){
				console.log(todo);
				var template = {'name':todo.get('name'),'url':'tr-layout-toedit.html','ObjectId':todo.id};
				$scope.templateUrl[index] = template;		
				vm.container = $scope.templateUrl;
			},
			error: function(object,error){

			}
		});
		

	}

	$scope.toSaveTodo = function(index, id, name)
	{
		// console.log(this.template);
		var template = {'name':name,'url':'tr-layout-edit.html','isDone':false,'btnSetColor': true,'btnDisable':false,  'ObjectId':null};
		$scope.templateUrl[index] = template;
		vm.container = $scope.templateUrl;
		var parseupdate = ParseService.intiate();
		var query = new Parse.Query(parseupdate);
		query.equalTo("objectId",id);
		query.first({
		  success: function(object) {
		    object.set("name",name);
		    object.save();
		    // console.log(template);
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
				
	}

	$scope.DeleteRow = function(index) {
		$scope.templateUrl.splice(index, 1);
		vm.container = $scope.templateUrl;
	}

	$scope.toggle = function(id){
		vm.container = $scope.templateUrl;
		this.template.btnSetColor = !this.template.btnSetColor;
		this.template.btnDisable = !this.template.btnDisable;
		this.template.isDone= !this.template.isDone;

		var doneStat = this.template.isDone;
		var DisableStat = this.template.btnDisable;
		var ColorStat = this.template.btnSetColor;

		var parseupdate = ParseService.intiate();
		var query = new Parse.Query(parseupdate);
		query.equalTo("objectId",id);
		query.first({
		  success: function(object) {
		    object.set("isDone",doneStat);
		    object.set("btnSetColor",ColorStat);
		    object.set("btnDisable",DisableStat);
		    object.save();
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
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
