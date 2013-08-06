angular.module('home')
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

            var projectsList = {
                name: 'page2C.projectList',
                url: '/projects/listview',
                views: {
                    'sidebar': {
                        templateUrl: '/ng-modules/home/projects/listview/projectsListFilter.tpl.html'
                    },
                    'content': {
                        templateUrl: '/ng-modules/home/projects/listview/projectsListGrid.tpl.html'
                    }
                }
            };

            $stateProvider
                .state(projectsList);

        }
    ])
    .service("projectsService", ['$q','$http',
        function($q, $http) {
            this.getProjects = function(filter) {
                var deferred = $q.defer();
                 $http.post("/api/v1", {
                    action: "get",
                    model: "projects",
                    filter: filter
                }).success(function (data, status, headers, config) {
                     deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    // TODO
                });
                return deferred.promise;
            };
        }
    ])
    .controller('projectsListGridCtrl', ['$scope', 'projectsService', 'pageConfig',
        function($scope, $projectsService, $pageConfig) {
            $pageConfig.setConfig({
                breadcrumbs: [{
                    name: 'Projects',
                    url: '/#!/projects/listview'
                }]
            });
            $scope.projects = [];
            $projectsService.getProjects({}).then(function (res) {
                $scope.projects = res.projects;
             });

            $scope.templatesConfig = function(projectId) {
                if (projectId && projectId.indexOf('play') >= 0) {
                    return '/ng-modules/home/projects/listview/details/playProjectDetails.tpl.html';
                } else {
                    return '/ng-modules/home/projects/listview/details/otherProjectDetails.tpl.html';
                }
            };
            $scope.projectDetailsTemplate = '';

            $scope.showDetails = function(projectId) {
                $scope.selectedProjectId = projectId;
                $scope.projectDetailsTemplate = $scope.templatesConfig(projectId);
            };
        }
    ]);