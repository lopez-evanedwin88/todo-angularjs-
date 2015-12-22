'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings) {

	// change page title based on state
	$rootScope.$on('$stateChangeSuccess', function(event, toState) {
		$rootScope.pageTitle = '';

		if ( toState.title ) {
			$rootScope.pageTitle += toState.title;
			$rootScope.pageTitle += ' \u2014 ';
		}

		$rootScope.cur_state = toState.name;

		$rootScope.pageTitle += AppSettings.appTitle;
	});

}

module.exports = OnRun;
