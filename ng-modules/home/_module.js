angular.module('home', ['ui.state', 'home.templates']);

angular.module('home')
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            home = {
                name: 'page1C.home',
                url: '/',
                views: {
                    'content': {
                        templateUrl: '/ng-modules/home/home.tpl.html'
                    }
                }
            };

            $stateProvider
                .state(home);
        }
    ])
    .controller('homeCtrl', ['$scope', '$stateParams', 'pageConfig',
        function($scope, $stateParams, $pageConfig) {

            $pageConfig.setConfig({
                breadcrumbs: [{
                        name: 'Home',
                        url: '/'
                    }

                ]
            });
        }
    ]);