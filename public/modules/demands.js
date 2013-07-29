angular.module('demands', ['ui.state', 'demands.templates'])
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

            var demandList = {
                name: 'page2C.demandList',
                url: '/demands',
                views: {
                    'sidebar': {
                        templateUrl: 'modules/demands/list/demandListFilter.tpl.html'
                    },
                    'content': {
                        templateUrl: 'modules/demands/list/demandListGrid.tpl.html'
                    }
                }
            },

                demandCommonTab = {
                    name: 'tabPage1C.demandCommonTab',
                    url: '/demands/:demandid/common',
                    views: {
                        'tabbar': {
                            templateUrl: 'modules/demands/demandTabs.tpl.html'
                        },
                        'content': {
                            templateUrl: 'modules/demands/commonTab/demandCommonTab.tpl.html'
                        }
                    }
                },

                demandOrdersTab = {
                    name: 'tabPage2C.demandOrdersTab',
                    url: '/demands/:demandid/orders',
                    views: {
                        'tabbar': {
                            templateUrl: 'modules/demands/demandTabs.tpl.html'
                        },
                        'sidebar': {
                            templateUrl: 'modules/demands/ordersTab/demandOrdersTabFilter.tpl.html'
                        },
                        'content': {
                            templateUrl: 'modules/demands/ordersTab/demandOrdersTabGrid.tpl.html'
                        }
                    }
                };

            $stateProvider
                .state(demandList)
                .state(demandCommonTab)
                .state(demandOrdersTab);

        }
    ])
    .service("demandService", ['$rootScope',
        function($rootScope) {
            this.getDemands = function(filter) {
                return {
                    demands: [{
                        id: 1,
                        name: 'Demand1'
                    }, {
                        id: 2,
                        name: 'Demand2'
                    }, {
                        id: 3,
                        name: 'Demand3'
                    }, {
                        id: 4,
                        name: 'Demand4'
                    }, {
                        id: 5,
                        name: 'Demand5'
                    }]
                }
            }
        }
    ])
    .controller('demandListGridCtrl', ['$scope', 'demandService', 'pageConfig',
        function($scope, $demandService, $pageConfig) {
            $pageConfig.setConfig({
                breadcrumb: [{
                    name: 'Demands',
                    url: '/demands'
                }]
            });
            $scope.demands = $demandService.getDemands({}).demands;
        }
    ])
    .controller('demandTabsCtrl', ['$scope', '$stateParams',
        function($scope, $stateParams) {
            $scope.tabs = [{
                name: 'Common',
                url: '/demands/' + $stateParams.demandid + '/common'
            }, {
                name: 'Orders',
                url: '/demands/' + $stateParams.demandid + '/orders'
            }];
        }
    ])
    .controller('demandCommonTabCtrl', ['$scope', '$stateParams', 'pageConfig',
        function($scope, $stateParams, $pageConfig) {
            var demandid = $stateParams.demandid;

            $pageConfig.setConfig({
                breadcrumb: [{
                        name: 'Demands',
                        url: '/demands'
                    }, {
                        name: demandid,
                        url: '/demands/' + demandid + '/common'
                    }

                ]
            });
            $scope.demandid = demandid;
        }
    ])

// Edit
.controller('DemandItemCtrl', ['$scope', '$q', '$timeout', function($scope, $q, $timeout) {

    var categories = [
        {id: 1, text: 'cat'}, {id: 2, text: 'dog'}, {id: 3, text: 'pet'},
        {id: 4, text: 'rat'}, {id: 5, text: 'fat'}, {id: 6, text: 'zet'}];
    var demand = {
        name: 'Demand-123',
        signedAt: new Date(2010, 01, 01),
        category: [{id: 1, text: 'cat'}]
    };

    $scope.categoryOptions = {
        multiple: true,
        query: function(query) {
            $timeout(function() {
                var data = {results: categories};
                query.callback(data);
            }, 400);
        }
    };
    $scope.mode = 'View';
    $scope.demand = angular.copy(demand);

    $scope.edit = function() { $scope.mode = 'Edit'; };
    $scope.cancel = function() {
        $scope.demand = angular.copy(demand);
        $scope.mode = 'View';
    }
    $scope.update = function() {
        if (demandForm)
        demand = angular.copy($scope.demand);
        $scope.mode = 'View';
    };
    $scope.isChanged = function() {
        return !angular.equals($scope.demand, demand);
    }
}])
.directive('requiredMultiple', function() {
  function isEmpty(value) {
    return angular.isUndefined(value) || (angular.isArray(value) && value.length === 0) || value === '' || value === null || value !== value;
  }

  return {
    require: '?ngModel',
    link: function(scope, elm, attr, ctrl) {
      if (!ctrl) return;
      attr.required = true; // force truthy in case we are on non input element

      var validator = function(value) {
        if (attr.required && (isEmpty(value) || value === false)) {
          ctrl.$setValidity('required', false);
          return;
        } else {
          ctrl.$setValidity('required', true);
          return value;
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);

      attr.$observe('required', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
})
.directive('fakeServerValidation', ['$timeout', function($timeout) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
        var validator = function(viewValue) {
            //fake call to server validation method
            $timeout(function() {
                if (viewValue && viewValue.indexOf('-') > 0) {
                  // it is valid
                  ctrl.$setValidity('fsv', true);
                  //return viewValue;
                } else {
                  // it is invalid, return undefined (no model update)
                  ctrl.$setValidity('fsv', false);
                  //return viewValue;
                }
            }, 500);
            return viewValue; //return must be synchronous because piped validators needs viewValue
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
    }
  };
}]);;

angular.module('demands.templates', ['modules/demands/commonTab/demandCommonTab.tpl.html', 'modules/demands/demandTabs.tpl.html', 'modules/demands/list/demandListFilter.tpl.html', 'modules/demands/list/demandListGrid.tpl.html', 'modules/demands/ordersTab/demandOrdersTabFilter.tpl.html', 'modules/demands/ordersTab/demandOrdersTabGrid.tpl.html']);

angular.module("modules/demands/commonTab/demandCommonTab.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/demands/commonTab/demandCommonTab.tpl.html",
    "<div>\n" +
    "    <div ng-controller=\"demandCommonTabCtrl\">\n" +
    "        Demand id:{{demandid}}\n" +
    "    </div>\n" +
    "    <div ng-controller=\"DemandItemCtrl\">\n" +
    "\n" +
    "        <div ng-switch on=\"mode\">\n" +
    "\n" +
    "            <form name=\"demandForm\" ng-switch-when=\"Edit\">\n" +
    "                <div class=\"control-group\" ng-class=\"{error: demandForm.name.$invalid}\">\n" +
    "                    <label>Name</label>\n" +
    "                    <input type=\"text\" name=\"name\" ng-model=\"demand.name\" required=\"true\" fake-server-validation class=\"input-medium\" />\n" +
    "                    <span ng-show=\"demandForm.name.$error.required\" class=\"help-inline\">Required field</span>\n" +
    "                    <span ng-show=\"demandForm.name.$error.fsv\" class=\"help-inline\">Invalid name format (no hyphen)</span>\n" +
    "                </div>\n" +
    "                <div class=\"control-group\" ng-class=\"{error: demandForm.signedAt.$invalid}\">\n" +
    "                    <label>Signed at</label>\n" +
    "                    <input ui-date=\"{changeMonth: true, changeYear: true}\" name=\"signedAt\" ng-model=\"demand.signedAt\" required class=\"input-medium\" />\n" +
    "                    <span ng-show=\"demandForm.signedAt.$error.required\" class=\"help-inline\">Provide sign date</span>\n" +
    "                </div>\n" +
    "                <div class=\"control-group\" ng-class=\"{error: demandForm.category.$invalid}\">\n" +
    "                    <label>Category</label>\n" +
    "                    <input type=\"text\" name=\"category\" ui-select2=\"categoryOptions\" ng-model=\"demand.category\" required-multiple class=\"input-medium\" />\n" +
    "                    <span ng-show=\"demandForm.category.$error.required\" class=\"help-inline\">Select at least one category</span>\n" +
    "                </div>\n" +
    "                <div class=\"form-actions\">\n" +
    "                    <button type=\"button\" class=\"btn\" ng-click=\"cancel()\">Cancel</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-success\" ng-click=\"update()\" ng-disabled=\"!isChanged() || demandForm.$invalid\">Update</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "\n" +
    "            <form ng-switch-when=\"View\">\n" +
    "                <div class=\"control-group\">\n" +
    "                    <label>Name</label>\n" +
    "                    <span>{{demand.name}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"control-group\">\n" +
    "                    <label>Signed at</label>\n" +
    "                    <span>{{demand.signedAt | date:'dd MMMM yyyy'}}</span>\n" +
    "                </div>\n" +
    "                <div class=\"control-group\">\n" +
    "                    <label>Categories</label>\n" +
    "                    <span ng-repeat=\"c in demand.category\">{{c.text}}&nbsp;</span>\n" +
    "                </div>\n" +
    "                <div class=\"form-actions\">\n" +
    "                    <button type=\"button\" class=\"btn\" ng-click=\"edit()\">Edit</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("modules/demands/demandTabs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/demands/demandTabs.tpl.html",
    "<div ng-controller=\"demandTabsCtrl\" tabbar></div>");
}]);

angular.module("modules/demands/list/demandListFilter.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/demands/list/demandListFilter.tpl.html",
    "Demand List Filter");
}]);

angular.module("modules/demands/list/demandListGrid.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/demands/list/demandListGrid.tpl.html",
    "	Demands:\n" +
    "	<ul ng-controller=\"demandListGridCtrl\">\n" +
    "		<li ng-repeat=\"demand in demands\"><a href=\"#!/demands/{{demand.id}}/common\">{{demand.name}}</a></li>\n" +
    "	</ul>");
}]);

angular.module("modules/demands/ordersTab/demandOrdersTabFilter.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/demands/ordersTab/demandOrdersTabFilter.tpl.html",
    "Demand Order Tab Filter");
}]);

angular.module("modules/demands/ordersTab/demandOrdersTabGrid.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/demands/ordersTab/demandOrdersTabGrid.tpl.html",
    "Demands Order Tab Grid");
}]);
