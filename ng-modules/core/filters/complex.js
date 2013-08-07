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
                            console.log("change");
                            if (!$scope.$$phase) {

                                var oldVal = $scope.filterNgModel,
                                    newVal = {
                                        state: {
                                            path: path
                                        },
                                        val: element.structuredFilter('data')
                                    };

                                //if ((newVal) && (newVal !== oldVal) && (angular.toJson(newVal) !== angular.toJson(oldVal))) {
                                $scope.$apply(function() {
                                    $scope.filterNgModel = newVal;

                                });
                                //}
                            }
                        });

                        $scope.$parent.$watch(attrs.filterNgModel, function(newVal, oldVal, scope) {
                                console.log("watch0", newVal, oldVal);
                            if ((newVal) && (newVal !== oldVal) && (angular.toJson(newVal) !== angular.toJson(oldVal))) {
                                console.log("watch", newVal, oldVal);

                                $timeout(function() {
                                //    element.structuredFilter('data', newVal.val);
                                });
                            }
                        });

                        $timeout(function() {
                            if (jQuery().structuredFilter) {
                                element.structuredFilter({
                                    meta: $scope.meta,
                                    path: path,
                                    change: function(e, eventType) {}
                                });
                            }
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