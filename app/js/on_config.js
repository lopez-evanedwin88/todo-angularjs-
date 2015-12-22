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
			}
			// ,
			// 'header@root': {
			// 	templateUrl: 'includes/header.html',
			// 	controller: 'HeaderCtrl',
			// 	controllerAs: 'vm'
			// },        
			// 'footer@root': {
			// 	templateUrl: 'includes/footer.html',
			// 	controller: 'ExampleCtrl',
			// 	controllerAs: 'vm'
			// }
		}
	})
	.state('main', {
		parent: 'root',
		url: '/',
		views: {
			'main@root': {
				templateUrl: 'main.html',
				controller: 'MainCtrl',
				controllerAs: 'vm'
			}
		},
		title: 'Home',
		resolve: {
			getService: ['WeatherService', function( WeatherService ) {
				return WeatherService.get();
			}]
		},
		authenticate: false
	})
	// .state('about', {
	// 	parent: 'root',
	// 	url: '/about',
	// 	views: {
	// 		'main@root': {
	// 			templateUrl: 'about.html',
	// 			controller: 'AboutCtrl',
	// 			controllerAs: 'vm'
	// 		}
	// 	},
	// 	title: 'About',
	// 	authenticate: false
	// });

	$urlRouterProvider.otherwise('/');
}

module.exports = OnConfig;
