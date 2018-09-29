$(document).ready(function () {
	// Firebase
	var trainData = new Firebase("https://train-scheduler-1000.firebaseio.com/");

	// Trains Button
	$("#addTrainBtn").on("click", function () {

		// User input and variables
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();

		var newTrain = {
			name: trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		trainData.push(newTrain);		
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		return false;
	});

	trainData.on("child_added", function (childSnapshot, prevChildKey) {
		
		// Firebase snapshots
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
		var minutes = firebaseFrequency - timeRemainder;
		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

		// Append info to table
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
})