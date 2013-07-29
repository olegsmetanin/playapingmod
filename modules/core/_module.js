angular.module('core', ['ui.state', 'core.templates']);

angular.module('core')
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('/');

            var page1C = {
                name: "page1C",
                abstract: true,
                templateUrl: 'modules/core/masterpages/page1C.tpl.html'
            },
                page2C = {
                    name: "page2C",
                    abstract: true,
                    templateUrl: 'modules/core/masterpages/page2C.tpl.html'
                },
                tabPage1C = {
                    name: "tabPage1C",
                    abstract: true,
                    templateUrl: 'modules/core/masterpages/tabPage1C.tpl.html'
                },
                tabPage2C = {
                    name: "tabPage2C",
                    abstract: true,
                    templateUrl: 'modules/core/masterpages/tabPage2C.tpl.html'
                },
                home = {
                    name: 'page1C.home',
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: 'modules/core/home.tpl.html'
                        }
                    }
                };

            $stateProvider
                .state(page1C)
                .state(page2C)
                .state(tabPage1C)
                .state(tabPage2C)
                .state(home);

        }
    ])
/*    .service("pageConfig", ['$rootScope',
        function($rootScope) {
            this.current = {};
            this.setConfig = function(newConfig) {
                this.current = newConfig;
                $rootScope.$broadcast('page:configChanged');
            };
        }
    ])*/
/*    .directive("tabbar", function() {
        return function($scope, element, attrs) {
            var tabs = $scope.tabs,
                html = '* ';
            for (var i = 0; i < tabs.length; i++) {
                html += '<span><a href="#!' + tabs[i].url + '">' + tabs[i].name + '</a> *<span>'
            }
            element.html(html);
        }
    })*/
        .controller('homeCtrl', ['$scope', '$stateParams', 'pageConfig',
        function($scope, $stateParams, $pageConfig) {
            var demandid = $stateParams.demandid;

            $pageConfig.setConfig({
                breadcrumb: [{
                        name: 'Home',
                        url: '/'
                    }

                ]
            });
        }
    ])

/*            .controller('breadcrumbs', ['$scope', 'pageConfig',
        function($scope, $pageConfig) {
            $scope.current = $pageConfig.current.breadcrumb;
            $scope.$on('page:configChanged', function() {
                $scope.current = $pageConfig.current.breadcrumb;
            });
        }
    ])
*/