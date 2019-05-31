angular.module('todoController', [])
    //用户业务操作customer.html对应js脚本
	
	.controller('mainCustomer', ['$scope','$http','Bankings', function($scope, $http, Bankings) {
		

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Bankings.getAccount()
			.success(function(data) {
				$scope.account = data;
				$scope.loading = false;
			});

		$scope.deposit = function(){
			if ($scope.formData.amount != undefined){
				$scope.loading = true;
				Bankings.deposit($scope.formData)
				.success(function(data){
					$scope.loading = false;
					alert('success');
					window.location.reload();
				})
				.error(function(data){
					$scope.loading = false;
					alert(data);
				});
			}
			else alert('please enter the amount');
		};
		
		$scope.withdraw = function(){
			if ($scope.formData.amount != undefined){
				$scope.loading = true;
				Bankings.withdraw($scope.formData)
				.success(function(data){
					$scope.loading = false;
					alert('success');
					window.location.reload();
				})
				.error(function(data){
					$scope.loading = false;
					alert(data);
				});
			}
			else alert('please enter the amount');
		};

		$scope.transaction = function(){
			if ($scope.formData.Tamount != undefined && $scope.formData.object != undefined){
				$scope.loading = true;
				Bankings.transaction($scope.formData)
				.success(function(data){
					$scope.loading = false;
					alert('success');
					window.location.reload();
				})
				.error(function(data){
					$scope.loading = false;
					alert(data);
				});
			}
			else alert('please enter the amount');
		};
	}]);
