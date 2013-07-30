angular.module('core')
    .controller('breadcrumbsCtrl', ['$scope', 'pageConfig',
        function($scope, $pageConfig) {
            $scope.breadcrumbs = $pageConfig.current.breadcrumbs;
            $scope.$on('page:configChanged', function() {
                $scope.breadcrumbs = $pageConfig.current.breadcrumbs;
            });
        }
    ]);