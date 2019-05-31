angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Bankings', function($scope, $http, Bankings) {
		$scope.formData = {};
		$scope.loading = false;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.newAccount = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.username != undefined || $scope.formData.passwd != undefined) {
				$scope.loading = true; 
				console.log($scope.formData.username);
				// call the create function from our service (returns a promise object)
				Bankings.newAccount($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.message = data; // assign our new list of todos
						alert(data);
						window.location.assign("./login.html");	
						//http://148.100.86.166:8084
					})
					.error(function(data){
						$scope.loading = false;
						alert(data);});
					
			}
		};

		$scope.login_click = function(){
			if ($scope.formData.username != undefined || $scope.formData.passwd != undefined) {
				Bankings.login($scope.formData)
				.success(function(data) {
					$scope.loading = false;
					alert("login success");
					window.location.assign("./customer.html");	
					})
				.error(function(data){
					scope.loading = false;
					alert(data);
				});
				}
			};
		
		// DELETE ==================================================================
		// delete a todo after checking it
		/** $scope.deleteCustomer = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
		*/
	}]);
