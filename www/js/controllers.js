
//Add Note Controller
app.controller('AddNoteCtrl',function($scope,$firebaseArray, $state, noteService){
	$scope.saveNote = function(){
		$scope.newNote = noteService.all;
		$scope.newNote.$add({
			title:$scope.title,
			body:$scope.body
		});

		$state.go('home');
	}
});


//List Note Controller
app.controller('ListNotesCtrl',function($scope, noteService){
	$scope.notes = noteService.all;
});

//Single Note
app.controller('SingleNoteCtrl',function($scope, noteService,$stateParams, $state){
	$scope.singleNote = noteService.get($stateParams.id);
});

//delete Note
app.controller('DeleteNoteCtrl',function($scope, noteService, $state, $ionicActionSheet){
	$scope.notes = noteService.all;

	$scope.showDetails = function(id){
		$ionicActionSheet.show({
			destructiveText : 'Delete',
			titleText : 'Are you sure?',
			cancelText : 'Cancel',
			destructiveButtonClicked : function(){
				var rem = $scope.notes.$getRecord(id);
				$scope.notes.$remove(rem);
				return true;
			}
		})
	}
});

//Edit Note
app.controller('EditNoteCtrl',function($scope, noteService){
	$scope.notes = noteService.all;
});

//Update Note Controller
app.controller('UpdateNoteCtrl',function($scope, $state, noteService, $stateParams){
	$scope.notes =noteService.all;
	$scope.singleNote = noteService.get($stateParams.id);
	$scope.myid = $scope.singleNote.$id;
	$scope.title = $scope.singleNote.title;
	$scope.body =$scope.singleNote.body;

	$scope.updateNote = function(id){
		var ed = $scope.notes.$getRecord(id);
		ed.title = $scope.title;
		ed.body = $scope.body;
		$scope.notes.$save(ed);
		$state.go('editNote');
	}
});