'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function AboutCtrl( $rootScope ) {

	// ViewModel
	var vm = this;
	
	vm.stateAbout = '';

	if($rootScope.cur_state) {
		vm.stateAbout = 'active';
	}

	vm.title = 'About';
	vm.number = 1234;

}

controllersModule.controller('AboutCtrl', AboutCtrl);
