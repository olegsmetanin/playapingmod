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
angular.module('core')
    .controller('breadcrumbs', ['$scope', 'pageConfig',
        function($scope, $pageConfig) {
            $scope.current = $pageConfig.current.breadcrumb;
            $scope.$on('page:configChanged', function() {
                $scope.current = $pageConfig.current.breadcrumb;
            });
        }
    ]);
angular.module('core')
    .directive("tabbar", function() {
        return function($scope, element, attrs) {
            var tabs = $scope.tabs,
                html = '* ';
            for (var i = 0; i < tabs.length; i++) {
                html += '<span><a href="#!' + tabs[i].url + '">' + tabs[i].name + '</a> *<span>'
            }
            element.html(html);
        }
    })
angular.module('core')
    .service("pageConfig", ['$rootScope',
        function($rootScope) {
            this.current = {};
            this.setConfig = function(newConfig) {
                this.current = newConfig;
                $rootScope.$broadcast('page:configChanged');
            };
        }
    ])
angular.module('core.templates', ['modules/core/breadcrumbs/breadcrumbs.tpl.html', 'modules/core/home.tpl.html', 'modules/core/masterpages/page1C.tpl.html', 'modules/core/masterpages/page2C.tpl.html', 'modules/core/masterpages/tabPage1C.tpl.html', 'modules/core/masterpages/tabPage2C.tpl.html']);

angular.module("modules/core/breadcrumbs/breadcrumbs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/core/breadcrumbs/breadcrumbs.tpl.html",
    "\n" +
    "        <div ng-controller=\"breadcrumbs\">\n" +
    "            *\n" +
    "            <span ng-repeat=\"breadcrumb in current\">\n" +
    "                <a href=\"#!{{breadcrumb.url}}\">{{breadcrumb.name}}</a> *\n" +
    "            </span>\n" +
    "        </div>\n" +
    "");
}]);

angular.module("modules/core/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/core/home.tpl.html",
    "	<div ng-controller=\"homeCtrl\">\n" +
    "		This is home page. Click <a href=\"#!/demands\">Demands</a>\n" +
    "	</div>\n" +
    "\n" +
    "");
}]);

angular.module("modules/core/masterpages/page1C.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/core/masterpages/page1C.tpl.html",
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row-fluid\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div ui-view=\"content\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>");
}]);

angular.module("modules/core/masterpages/page2C.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/core/masterpages/page2C.tpl.html",
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row-fluid\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div ui-view=\"sidebar\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row-fluid\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div ui-view=\"content\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>");
}]);

angular.module("modules/core/masterpages/tabPage1C.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/core/masterpages/tabPage1C.tpl.html",
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row-fluid\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div ui-view=\"tabbar\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row-fluid\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div ui-view=\"content\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>");
}]);

angular.module("modules/core/masterpages/tabPage2C.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/core/masterpages/tabPage2C.tpl.html",
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row-fluid\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div ui-view=\"tabbar\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row-fluid\">\n" +
    "                <div class=\"span3\">\n" +
    "                    <div ui-view=\"sidebar\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"span9\">\n" +
    "                    <div ui-view=\"content\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "");
}]);
