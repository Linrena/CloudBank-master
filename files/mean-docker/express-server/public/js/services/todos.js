angular.module('todoService', [])

	// super simple service
	// each function returns a promise object
	.factory('Bankings', ['$http',function($http) {
		return {
			getAccount : function() {
				return $http.get('/api/Account');
			},
			transaction : function(transInfo) {
				return $http.post('/api/Transaction', transInfo);
			},
			newAccount : function(accInfo) {
				return $http.post('api/New', accInfo);
			},
			deposit : function(transInfo) {
				return $http.post('/api/deposit', transInfo);
			},
			withdraw : function(transInfo) {
				return $http.post('/api/withdraw', transInfo);
			},
			login: function(acc) {
				return $http.post('api/login', acc);
			},
			getAccounts : function() {
				return $http.get('api/Accounts');
			}
			// delete : function(id) {
				// return $http.delete('/api/todos/' + id);
			// }
		}
	}]);
