'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function HeaderCtrl( $rootScope ) {

	// ViewModel
	var vm = this;

	var isActive = function( route ) {
		var state = '';
		var root = $rootScope.cur_state;
		if(root===route) {
			state = 'active';
		}

		return state;
	};

	vm.title = 'Header';
	vm.number = 1234;
	

	angular.extend( this, {
		isActive: isActive
	});

}

controllersModule.controller('HeaderCtrl', HeaderCtrl);
