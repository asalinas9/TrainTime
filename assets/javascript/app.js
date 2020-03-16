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
var db = firebase.database().ref().child('form-control')

//var database = firebase.database();

document.getElementById('train-info').addEventListener('submit', submitForm);

//Submit Form
function submitForm(event) {
    event.preventDefault();

    var trainName = getinputVal('train-name');
    var trainDestination = getinputVal('train-destination');
    var firstTrainTime = getinputVal('train-time');
    var frFrequency = getinputVal('time-freq');

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(frFrequency);
    /*var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrainTime: firstTrainTime
    }
    */
    saveTrain(trainName, trainDestination, firstTrainTime);
    //database.ref().push(newTrain);

    alert('train successfully added');

    //Clear values
    // Clears all of the text-boxes
    $("train-name").val("");
    $("train-destination").val("");
    $("train-time").val("");
    $("time-freq").val("");

    //var ref = database.ref('messages')

    //storing into variables

    db.ref('messages').on('child_added', function (childsnapshot) {
        console.log(childsnapshot.val());

        var trainName = childsnapshot.val().trainName;
        var trainDestination = childsnapshot.val().trainDestination;
        var firstTrainTime = childsnapshot.val().firstTrainTime;
        //var trFrequency = childsnapshot.val().frequency;

        console.log('After submit)');
        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTrainTime);
        console.log(trFrequency);


        var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm a").subtract(1, 'years');

        //minutes from first train
        var trainMinFromFirst = moment().diff(moment(firstTrainTimeConverted), 'minutes');
        //minutes for next train
        //var trainMinutesLeft = trainMinFromFirst % trFrequency;
        var trainMinutesLeft = trainMinFromFirst;
        var minAway = trainMinutesLeft;
        //var minAway = trFrequency - trainMinutesLeft;
        var nextTrain = moment().add(minAway, 'minutes').format("HH:mm a");


        //new row table with new train data
        var newRow = $("<tr>").append(
            $('<td>').text(trainName),
            $('<td>').text(trainDestination),
            $('<td>').text(firstTrainTime),
            $('<td>').text(trFrequency),
            $('<td>').text(nextTrain),
            $('<td>').text(minAway),
        );

        $('#table-data > tbody').append(newRow);

    });
};

function getinputVal(id) {
    return document.getElementById(id).value;
}

//save message to firebase
function saveTrain(trainName, trainDestination, firstTrainTime) {
    var db = database.push();
    db.set({
        trainName: trainName,
        trainDestination: trainDestination,
        firstTrainTime: firstTrainTime
    });
};


