// Confirm button
myAppModule.directive('ngReallyClick', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (scope.selTable == '' || scope.selTable == null)
                    alert('A table is required')
                else if (scope.productsSelected == '')
                    alert('At least one course is required')
                else {
                    if (message && confirm(message)) {
                        if(attrs.ngReallyClick != "closeOrder(orderIndex, orderList.table_name)"){
                            scope.$apply($location.path(attrs.ngConfirmPath));
                            alert(attrs.ngConfirmMessage);
                        }
                        else
                            scope.$apply(attrs.ngReallyClick);
                    }
                }
            });
        }
    }
}]); 


// Redirect button
myAppModule.directive('ngRedirect', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                scope.$apply($location.path(attrs.ngRedirectPath));
            });
        }
    }
}]); 