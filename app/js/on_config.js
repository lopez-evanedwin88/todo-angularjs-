'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, ParseProvider) {

	$locationProvider.html5Mode(true);
	
	ParseProvider.initialize("vMq3gZdznN9aMQv0EKl5uloEPVYbGrXpQYO9oKXV", "g3WJ2cdnmtpultyhdda9Hr9zBVjtDc9ya0RQ4Bos");
	
	// console.log(ParseProvider)

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
