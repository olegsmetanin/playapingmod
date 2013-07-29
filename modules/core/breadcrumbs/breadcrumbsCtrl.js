angular.module('core')
    .controller('breadcrumbs', ['$scope', 'pageConfig',
        function($scope, $pageConfig) {
            $scope.current = $pageConfig.current.breadcrumb;
            $scope.$on('page:configChanged', function() {
                $scope.current = $pageConfig.current.breadcrumb;
            });
        }
    ]);