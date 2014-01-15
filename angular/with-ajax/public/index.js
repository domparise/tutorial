function Ajax($scope,$http){

	$scope.results = [];

	$scope.gets = function(){
		$http.get('/someUrl').success(function(data){
			console.log(data);
			$scope.results.push(data);
		}).
		error(function(data,status){
			console.log(data);
			console.log(status);
		});
	}

	$scope.posts = function(){
		$http.post('/someUrl', {one:1,two:2}).success(function(data){
			console.log(data);
			$scope.results.push(data);
		}).
		error(function(data,status){
			console.log(data);
			console.log(status);
		});
	}

}