function TodoCtrl($scope) {
  // this controller is a function of the scope within the div

  // array of data entries, as objects with 2 fields
  // these todos pre-generated for the example
  $scope.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];
 
  // adds one to the todos array, with the values initialized to those gathered from page, 
  // then sets the textbox to empty after adding
  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };
 
  // gets count and iterates to check if the boxes checked or not, based on the 'done' variables of each balue in array
  $scope.remaining = function() {
    var count = 0;
    // uses the 'angular' variable? 
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  // triggered by click, empties the 'done' values on the dataset
  $scope.archive = function() {
    // sets tmp var of the todo array, then empties the current data array
    var oldTodos = $scope.todos;
    $scope.todos = [];
    // then iterates through the tmp array, adding variables of a specific condition to the data array
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}