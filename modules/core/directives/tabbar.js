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