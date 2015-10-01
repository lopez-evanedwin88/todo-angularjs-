'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

	$locationProvider.html5Mode(true);

	$stateProvider
	.state('root', {
		abstract: true,
		views: {
			'@': {
				templateUrl: 'layout.html',
			},
			'header@root': {
				templateUrl: 'includes/header.html',
			},
			'footer@root': {
				templateUrl: 'includes/footer.html'
			}
		}
	})
	.state('index', {
		parent: 'root',
		url: '/',
		views: {
			'main@root': {
				templateUrl: 'home.html'
			}
		},
		title: 'Home',
		authenticate: false
	});

	$urlRouterProvider.otherwise('/');
}

module.exports = OnConfig;
