app.factory('noteService',["$firebaseArray", function($firebaseArray){
	
	var ref = firebase.database().ref(); 
	var notes = $firebaseArray(ref);

	var noteService =  {
		all:notes,
		get: function(noteId){
			return notes.$getRecord(noteId);
		}
	}

	return noteService;
}]);