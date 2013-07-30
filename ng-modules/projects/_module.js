﻿angular.module('projects', ['ui.state', 'projects.templates'])
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/listview');

            var projectsList = {
                name: 'page2C.projectList',
                url: '/listview',
                views: {
                    'sidebar': {
                        templateUrl: '/ng-modules/projects/listview/projectsListFilter.tpl.html'
                    },
                    'content': {
                        templateUrl: '/ng-modules/projects/listview/projectsListGrid.tpl.html'
                    }
                }
            };

            $stateProvider
                .state(projectsList);

        }
    ])
    .service("projectsService", ['$rootScope',
        function($rootScope) {
            this.getProjects = function(filter) {
                return {
                    projects: [{
                        id: 'prj1',
                        name: 'Project1'
                    }, {
                        id: 'prj2',
                        name: 'Project2'
                    }, {
                        id: 'prj3',
                        name: 'Project3'
                    }, {
                        id: 'prj4',
                        name: 'Project4'
                    }, {
                        id: 'prj5',
                        name: 'Project5'
                    }]
                };
            };
        }
    ])
    .controller('projectsListGridCtrl', ['$scope', 'projectsService', 'pageConfig',
        function($scope, $projectsService, $pageConfig) {
            $pageConfig.setConfig({
                breadcrumbs: [{
                    name: 'Projects',
                    url: '/projects'
                }]
            });
            $scope.projects = $projectsService.getProjects({}).projects;
        }
    ]);