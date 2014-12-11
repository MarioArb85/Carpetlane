// Home controller
myAppModule.controller('homeController', ['$scope', '$location', function($scope, $location) {
    $scope.new_order    = 'New Order';
    $scope.modify_order = 'Modify Order';
    $scope.close_order  = 'Close Order';
}]);


// New order controller
myAppModule.controller('newOrderController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.new_title        = 'New order';
    $scope.table            = 'Choose a table';
    $scope.productsList     = 'Choose from the menu';
    $scope.product_name     = 'Course';
    $scope.product_delete   = 'Delete';
    $scope.btn_submit       = 'Submit';
    $scope.btn_home         = 'Home';
    $scope.selTable         = '';
    $scope.selProductList   = '';
    $scope.productsSelected = [];

    // Get id and table names
    $http({
        method: 'GET',
        url: 'web/data/get_tables.json',
    }).
    success(function(data, status) {
        $scope.tables = data;
    }).
    error(function(data, status) {
        alert('There was an error. Please try later.');
    });


    // Get id and product names
    $http({
        method: 'GET',
        url: 'web/data/get_products.json',
    }).
    success(function(data, status) {
        $scope.products = data;
    }).
    error(function(data, status) {
        alert('There was an error. Please try later.');
    });


    // Add products to the list
    $scope.addProduct = function () {
        $scope.productsSelected.push({  
            'id': $scope.selProductList.product_id, 
            'name': $scope.selProductList.product_name
        });
        $scope.selProductList = '';
    }


    // Delete products from the list
    $scope.removeProduct = function (index) {
        $scope.productsSelected.splice(index, 1);
    }

}]);


// Orders controller
myAppModule.controller('ordersController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.new_title    = 'Click on a table to modify the order';
    $scope.btn_home     = 'Home';


    // Get table orders
    $http({
        method: 'GET',
        url: 'web/data/get_open_orders.json',
    }).
    success(function(data, status) {
        $scope.orders = data;
    }).
    error(function(data, status) {
        alert('There was an error. Please try later.');
    });

}]);


// Modify order controller
myAppModule.controller('modifyOrderController', ['$scope', '$location', '$http', '$routeParams', function($scope, $location, $http, $routeParams) {
    $scope.new_title        = 'Modify order';
    $scope.table            = 'Choose a table';
    $scope.productsList     = 'Choose from the menu';
    $scope.product_name     = 'Course';
    $scope.product_remove   = 'Delete';
    $scope.btn_submit       = 'Submit';
    $scope.btn_back         = 'Open orders';
    $scope.btn_home         = 'Home';
    $scope.selTable         = '';
    $scope.selProductList   = '';
    $scope.productsSelected = [];


    // Get id and table names
    $http({
        method: 'GET',
        url: 'web/data/get_tables.json',
    }).
    success(function(data, status) {
        $scope.tables = data;
    }).
    error(function(data, status) {
        alert('There was an error. Please try later.');
    });


    // Get id and product names
    $http({
        method: 'GET',
        url: 'web/data/get_products.json',
    }).
    success(function(data, status) {
        $scope.products = data;
    }).
    error(function(data, status) {
        alert('There was an error. Please try later.');
    });


    // Get open order information
    $http({
        method: 'GET',
        url: 'web/data/get_orders.json',
    }).
    success(function(data, status) {
        // Look for the order selected (Prototype) => We can get this info from the database in real with the order number
        angular.forEach(data, function(value, key) {
            if (value.order_id == $routeParams.order) {
                $scope.open_order       = value;
                $scope.selTable         = value.table_id;
                $scope.productsSelected = value.products;
            }
        });
    }).
    error(function(data, status) {
        alert('There was an error. Please try later.');
    });


    // Add products to the list
    $scope.addProduct = function (id, name) {
        $scope.productsSelected.push({'product_id': $scope.selProductList.product_id, 'product_name': $scope.selProductList.product_name});
        $scope.selProductList = '';
    }


    // Delete products from the list
    $scope.removeProduct = function (index) {
        $scope.productsSelected.splice(index, 1);
    }

}]);


// Close order controller
myAppModule.controller('closeOrderController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.textClose    = 'Click on a table to mark as payment done';
    $scope.btn_home     = 'Home';
    // To prevent the alert when closing an order 
    $scope.selTable         = 't';
    $scope.productsSelected = [{'t':'t'}];

    // Get table orders
    $http({
        method: 'GET',
        url: 'web/data/get_open_orders.json',
    }).
    success(function(data, status) {
        $scope.orders = data;
    }).
    error(function(data, status) {
        alert('There was an error. Please try later.');
    });


    // Close order and mark it as paid
    $scope.closeOrder = function (index, tableName) {
        // Delete the table in the object (Prototype)
        $scope.orders.splice(index, 1);
        $location.path('/');
        alert(tableName + ' order has been marked as paid');
    }
    
}]);