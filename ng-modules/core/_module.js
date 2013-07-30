angular.module('core', ['ui.state', 'core.templates']);

angular.module('core')
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.hashPrefix('!');

            var page1C = {
                name: "page1C",
                abstract: true,
                templateUrl: '/ng-modules/core/masterpages/page1C.tpl.html'
            },
                page2C = {
                    name: "page2C",
                    abstract: true,
                    templateUrl: '/ng-modules/core/masterpages/page2C.tpl.html'
                },
                tabPage1C = {
                    name: "tabPage1C",
                    abstract: true,
                    templateUrl: '/ng-modules/core/masterpages/tabPage1C.tpl.html'
                },
                tabPage2C = {
                    name: "tabPage2C",
                    abstract: true,
                    templateUrl: '/ng-modules/core/masterpages/tabPage2C.tpl.html'
                };

            $stateProvider
                .state(page1C)
                .state(page2C)
                .state(tabPage1C)
                .state(tabPage2C);
        }
    ]);