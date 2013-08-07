angular.module('core')
    .directive('filterComplex', ['$timeout', '$parse',
        function($timeout, $parse) {
            return {
                /* This one is important: */
                scope: {
                    filterNgModel: "=",
                    meta: "="
                },
                compile: function(element, attrs, transclude) {

                    return function($scope, element, attrs, filterNgModelCtrl) {
                        var path = attrs.path.replace(/'/g, '');

                        element.bind('change', function() {
                            if (!$scope.$$phase) {
                                $scope.$apply(function() {
                                    $scope.filterNgModel = {
                                        state: {
                                            path: path
                                        },
                                        val: element.structuredFilter('data')
                                    };
                                });
                            }
                        });

                        $scope.$parent.$watch(attrs.filterNgModel + ".val", function(newVal, oldVal, scope) {
                            if ((newVal) && (newVal !== oldVal)) {
                                element.structuredFilter('data', newVal.val);
                            }

                        });

                        $timeout(function() {
                            element.structuredFilter({
                                meta: $scope.meta,
                                path: path,
                                change: function(e, eventType) {}
                            });
                        });
                    };
                },

                controller: ['$scope', '$element', '$attrs', '$transclude',
                    function($scope, $element, $attrs, $transclude) {

                    }
                ]
            };
        }
    ]);