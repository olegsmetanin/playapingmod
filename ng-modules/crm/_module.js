angular.module('crm', ['ui.state', 'ui.select2', 'ui.date', 'core.security', 'crm.templates'])
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', 'securityAuthorizationProvider',
        function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider, securityAuthorizationProvider) {

            $urlRouterProvider.otherwise('/demands');

            var demandList = {
                name: 'page2C.demandList',
                url: '/demands',
                views: {
                    'sidebar': {
                        templateUrl: '/ng-modules/crm/demands/list/demandListFilter.tpl.html'
                    },
                    'content': {
                        templateUrl: '/ng-modules/crm/demands/list/demandListGrid.tpl.html'
                    }
                },
                resolve: {
                    projectMember: securityAuthorizationProvider.requireGroups(['admins', 'managers', 'executors'])
                }
            },

                demandCommonTab = {
                    name: 'tabPage1C.demandCommonTab',
                    url: '/demands/:demandid/common',
                    views: {
                        'tabbar': {
                            template: '<div ng-controller="demandTabsCtrl" tabbar="0"></div>'
                        },
                        'content': {
                            templateUrl: '/ng-modules/crm/demands/commonTab/demandCommonTab.tpl.html'
                        }
                    }
                },

                demandOrdersTab = {
                    name: 'tabPage2C.demandOrdersTab',
                    url: '/demands/:demandid/orders',
                    views: {
                        'tabbar': {
                            template: '<div ng-controller="demandTabsCtrl" tabbar="1"></div>'
                        },
                        'sidebar': {
                            templateUrl: '/ng-modules/crm/demands/ordersTab/demandOrdersTabFilter.tpl.html'
                        },
                        'content': {
                            templateUrl: '/ng-modules/crm/demands/ordersTab/demandOrdersTabGrid.tpl.html'
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
                };
            };
        }
    ])
    .controller('demandListGridCtrl', ['$scope', 'demandService', 'pageConfig',
        function($scope, $demandService, $pageConfig) {
            $pageConfig.setConfig({
                breadcrumbs: [{
                        name: "Projects",
                        url: '/projects'
                    },{
                        name: window.app.project,
                        url: '/projects/'+window.app.project
                    },{
                        name: 'Demands',
                        url: '#!/demands'
                    }]
            });
            $scope.demands = $demandService.getDemands({}).demands;
        }
    ])
    .controller('demandTabsCtrl', ['$scope', '$stateParams',
        function($scope, $stateParams) {
            $scope.tabs = [{
                name: 'Common',
                url: '#!/demands/' + $stateParams.demandid + '/common'
            }, {
                name: 'Orders',
                url: '#!/demands/' + $stateParams.demandid + '/orders'
            }];
        }
    ])
    .controller('demandCommonTabCtrl', ['$scope', '$stateParams', 'pageConfig',
        function($scope, $stateParams, $pageConfig) {
            var demandid = $stateParams.demandid;

            $pageConfig.setConfig({
                breadcrumbs: [{
                        name: "Projects",
                        url: '/projects'
                    },{
                        name: window.app.project,
                        url: '/projects/'+window.app.project
                    },{
                        name: 'Demands',
                        url: '#!/demands'
                    }, {
                        name: demandid,
                        url: '#!/demands/' + demandid + '/common'
                    }

                ]
            });
            $scope.demandid = demandid;
        }
    ])

// Edit
.controller('DemandItemCtrl', ['$scope', '$q', '$timeout',
    function($scope, $q, $timeout) {

        var categories = [{
            id: 1,
            text: 'cat'
        }, {
            id: 2,
            text: 'dog'
        }, {
            id: 3,
            text: 'pet'
        }, {
            id: 4,
            text: 'rat'
        }, {
            id: 5,
            text: 'fat'
        }, {
            id: 6,
            text: 'zet'
        }];
        var demand = {
            name: 'Demand-123',
            signedAt: new Date(2010, 01, 01),
            category: [{
                id: 1,
                text: 'cat'
            }]
        };

        $scope.categoryOptions = {
            multiple: true,
            query: function(query) {
                $timeout(function() {
                    var data = {
                        results: categories
                    };
                    query.callback(data);
                }, 400);
            }
        };
        $scope.mode = 'View';
        $scope.demand = angular.copy(demand);

        $scope.edit = function() {
            $scope.mode = 'Edit';
        };
        $scope.cancel = function() {
            $scope.demand = angular.copy(demand);
            $scope.mode = 'View';
        };
        $scope.update = function() {
            if (demandForm) {
                demand = angular.copy($scope.demand);
            }
            $scope.mode = 'View';
        };
        $scope.isChanged = function() {
            return !angular.equals($scope.demand, demand);
        };
    }
])
    .directive('requiredMultiple', function() {
        function isEmpty(value) {
            return angular.isUndefined(value) || (angular.isArray(value) && value.length === 0) || value === '' || value === null || value !== value;
        }

        return {
            require: '?ngModel',
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
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
    .directive('fakeServerValidation', ['$timeout',
        function($timeout) {
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
        }
    ]);