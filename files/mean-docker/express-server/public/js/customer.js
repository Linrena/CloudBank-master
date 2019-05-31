angular.module('todoController', [])
    //用户业务操作customer.html对应js脚本
	
	.controller('mainCustomer', ['$scope','$http','Bankings', function($scope, $http, Bankings) {
		

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		var username;
		Bankings.getAccount()
			.success(function(data) {
				$scope.account = data;
				$scope.loading = false;
				username = data.username;
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
		$scope.getclasses = function(){
			Bankings.getAccounts()
			.success(function(data){
				var center1 = data[0]["balance"];
				var center2 = data[1]["balance"];
				var center3 = data[2]["balance"];
				var classes = [];
				for (var i in data) {
					classes.push(1);
				}
				while (true) {
					var flag = true;
					for (var i in data) {
						var bri1 = Math.sqrt(Math.pow((data[i]["balance"] - center1), 2));
						var bri2 = Math.sqrt(Math.pow((data[i]["balance"] - center2), 2));
						var bri3 = Math.sqrt(Math.pow((data[i]["balance"] - center3), 2));
						if (bri1 <= bri2 && bri1 <= bri3) {
							if (classes[i] != 1) {
								flag = false;
							}
							classes[i] = 1;
						}
						else if (bri2 <= bri1 && bri2 <= bri3) {
							if (classes[i] != 2) {
								flag = false;
							}
							classes[i] = 2;
						}
						else {
							if (classes[i] != 3) {
								flag = false;
							}
							classes[i] = 3;
						}
					}
					if (flag == true) {
						break;
					}
					var sum1 = 0;
					var tot1 = 0;
					var sum2 = 0;
					var tot2 = 0;
					var sum3 = 0;
					var tot3 = 0;
					for (var i in data) {
						if (classes[i] == 1) {
							sum1 += data[i]["balance"];
							tot1++;
						}
						else if (classes[i] == 2) {
							sum2 += data[i]["balance"];
							tot2++;
						}
						else {
							sum3 += data[i]["balance"];
							tot3++;
						}
					}
					center1 = sum1 / tot1;
					center2 = sum2 / tot2;
					center3 = sum3 / tot3;
				}
				
				/*Bankings.getAccount()
					.success(function(data2) {
						username = data2.username;
					});*/
				//alert("当前用户为"+username);
				for (var i in data) {
					if (data[i]["username"] == username) {
						//alert(classes[i]);
						var str1;
						var str2;
						var str3;
						if (center1 >= center2 && center1 >= center3) {
							str1 = "您特别有钱，属于黑金用户";
							if (center2 >= center3) {
								str2 = "您比较有钱，属于白金用户";
								str3 = "您有一些钱，属于白银用户";
							}
							else {
								str3 = "您比较有钱，属于白金用户";
								str2 = "您有一些钱，属于白银用户";
							}
						}
						else if (center2 >= center1 && center2 >= center3) {
							str2 = "您特别有钱，属于黑金用户";
							if (center1 >= center3) {
								str1 = "您比较有钱，属于白金用户";
								str3 = "您有一些钱，属于白银用户";
							}
							else {
								str3 = "您比较有钱，属于白金用户";
								str1 = "您有一些钱，属于白银用户";
							}
						}
						else {
							str3 = "您特别有钱，属于黑金用户";
							if (center1 >= center2) {
								str1 = "您比较有钱，属于白金用户";
								str2 = "您有一些钱，属于白银用户";
							}
							else {
								str2 = "您比较有钱，属于白金用户";
								str1 = "您有一些钱，属于白银用户";
							}
						}
						if (classes[i] == 1) {
							alert("亲爱的"+username+str1);
						}
						else if (classes[i] == 2) {
							alert("亲爱的"+username+str2);
						}
						else{
							alert("亲爱的"+username+str3);
						}
						break;
					}
				}
				
			})
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
