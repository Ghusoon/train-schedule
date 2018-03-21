$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD4gLBfzbEEUZvcSAO2O9MUkjmfjVPPEHc",
        authDomain: "train-schedudule.firebaseapp.com",
        databaseURL: "https://train-schedudule.firebaseio.com",
        projectId: "train-schedudule",
        storageBucket: "train-schedudule.appspot.com",
        messagingSenderId: "234870183058"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    //-------------------------------------------------
    $("button").on("click", function (event) {

        event.preventDefault();

        var trainName1 = $("#name").val().trim();
        var destination1 = $("#destn").val().trim();


        var firstTime1 = moment($("#firstTime").val().trim(), "HH:mm").format("hh:mm");

        var frequency1 = $("#freq").val().trim();
        //-------------------------------------------------------------


        console.log(trainName1);
        console.log(destination1);
        console.log(firstTime1);
        console.log(frequency1);


        var newTrain = {

            train: trainName1,
            trainGoing: destination1,
            trainComing: firstTime1,
            everyXMin: frequency1
        };

        $("#name").val("");
        $("#destn").val("");
        $("#firstTime").val("");
        $("#freq").val("");

        database.ref().push(newTrain);
        return false;

    });

    //--------------------------------------------------------------------------------------------------
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());
        //store in variables
        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().trainGoing;
        var firstTime = childSnapshot.val().trainComing;
        var frequency = childSnapshot.val().everyXMin;

        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);



        var Converted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(Converted);



        var diffTime = moment().diff(moment(Converted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var remainder = diffTime % frequency;


        var minUntil = frequency - remainder;


        var nextArrival = moment().add(minUntil, "minutes");
        nextArrival = (moment(nextArrival).format("hh:mm A"));


        $("#table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" +
            nextArrival + "</td><td>" + minUntil + "</td></tr>");
    });
    //-------------------------------------------------------------------------------------
    // this function for the oclock in the right side.

    function oclock() {

        var oclock = moment().format('LTS');
        $("#oclock").html(oclock);
    };

    setInterval(oclock, 1000);
});