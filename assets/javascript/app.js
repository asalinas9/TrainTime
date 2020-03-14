// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBb56A0l5K3KelOm6fP02ibyZ8C6FaXpm0",
    authDomain: "train-time-project-ae28e.firebaseapp.com",
    databaseURL: "https://train-time-project-ae28e.firebaseio.com",
    projectId: "train-time-project-ae28e",
    storageBucket: "train-time-project-ae28e.appspot.com",
    messagingSenderId: "541164564663",
    appId: "1:541164564663:web:719e7ef3b473f9d3d11d32",
    measurementId: "G-62Q4XQYQW2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainDB = firebase.database();
var trainName = '';
var trainDestination = '';
var firstTrainTime = '';
var frequency = 0;

// capture button click
$('#btn-add').on('click', function () {
    event.preventDefault();

    var trainName = $('#train-name').val().trim();
    var trainDestination = $('#train-destination').val().trim();
    var firstTrainTime = moment($('#train-time').val(), 'HH:mm').format('HH:mm');
    var trainFrequency = $('#train-freq').val();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        trainTime: firstTrainTime,
        frequency: trainFrequency,


    };
    //setting values in
    trainDB.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);

    alert('train successfully added');

    $('#train-name').val('');
    $('#train-destination').val('');
    $('#train-time').val('');
    $('#train-freq').val('');
});
//storing into variables
trainDB.ref().on('child_added', function (childsnapshot) {

    var trainName = childsnapshot.val().name;
    var trainDestination = childsnapshot.val().destination;
    var firstTrainTime = childsnapshot.val().time;
    var trainFrequency = childsnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    var firstTrainTimeConverted = moment(firstTrainTime, 'HH:mm');
    var diffTime = moment().diff(moment(firstTrainTimeConverted), 'minutes');
    var trainMinutesLeft = trainFrequency - (diffTime % trainFrequency);
    var nextTrain = moment().add(trainMinutesLeft, 'minutes').format('HH:mm');

    var newRow = $("<tr>").append(
        $('<td>').text(trainName),
        $('<td>').text(trainDestination),
        $('<td>').text(trainFrequency),
        $('<td>').text(nextTrain),
        $('<td>').text(trainMinutesLeft)

    );
    $('#table-data > tbody').append(newRow);

}, function (errorObject) {
    console.log('Errors handled: ' + errorObject.code);
})
