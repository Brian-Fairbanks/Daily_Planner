/*#######################################
####  Global Variables  #################
#######################################*/
var writtenDayDisplay = $("#currentDay");
var timeBlockDisplay = $("#timeBlocks");
var updateInterval;

var curMoment;
var nextMoment;

var workHoursStart;
var workHoursEnd;

var day;
var interval = 3600;    // in seconds  3600 = 1hr



/*#######################################
####  Functions  ########################
#######################################*/

// generate a fully stylized, fleshed out time block for the object passed
function generateTimeBlock(timeObj){
    var curBlock = $('<div id="block'+timeObj.index+'" class="timeBlock row" data-dayObj="'+timeObj.index+'">')
    console.log(timeObj);
    // create each section of the time block, along with class info and ID
    var timeBlockTime = $('<div class="col-2 hour text-center">');
    var timeBlockComment = $('<textarea class="col-8 timeBlockComment">');
    var timeBlockSave = $('<div class="col-2 saveBtn">');

    //fill content
    timeBlockTime.text(moment(timeObj.time).format('LT'));
    timeBlockComment.text(timeObj.comment);
    timeBlockSave.append($('<i class="far fa-save"></i>'));

    // append each block to the curblockDiv
    curBlock.append(timeBlockTime);
    curBlock.append(timeBlockComment);
    curBlock.append(timeBlockSave);

    //immediately hide if it is outisde the designated work hours
    if(timeObj.time < workHoursStart || timeObj.time > workHoursEnd){
        curBlock.addClass("d-none");
    }
    

    //return the completed timeBlock Div
    return curBlock;
}


// loop through the day array.  append each as a generated timeblock to the DOM
function printTimeBlock(){
    // clear the timeBlock element
    timeBlockDisplay.empty();

    for (var i=0; i<day.length; i++){
        //append the Cur block Div to the TimeBlock id in the DOM
        timeBlockDisplay.append( generateTimeBlock(day[i]) );
        }

    //console.log(day[0].time.format('LT'));
}


// Iterates through the day object, gets index to pair with timeBlock, and colors as past, present, or future
function colorTimeBlocks(){
    //loop through every block that was displayed to the screen
    for (var i=0; i<day.length; i++){
        //get current block associated with the timeObject in the day array
        var curBlock = $("#block"+i);

        // setting past if it is lower than the current time
        if(day[i].time < curMoment){
            // if time < now also time+interval < now : past time block
            if(day[i].time.clone().add(interval,'s') < curMoment){
                curBlock.removeClass("present future")
                curBlock.addClass("past");
            }
            //otherwise, time < now , but time+interval > now : present time block
            else{
                curBlock.removeClass("past future")
                curBlock.addClass("present");
            }
        }
        // time > now : future time block
        else{
            curBlock.removeClass("past present")
            curBlock.addClass("future");
        }
    }
}


function update(){
    //update the moment to get the current time
    curMoment = moment();
    // write the day to the DOM
    writtenDayDisplay.text(curMoment.format('MMMM Do YYYY, h:mm:ss a'));
    //apply block color classes for past, present, and future
    colorTimeBlocks();

    // method for updating other parts every longer interval - decided against doing this, but left for aditional features if needed later
    // if(nextMoment==undefined || curMoment > nextMoment){
    //     nextMoment = curMoment.add(1,"seconds");
    //     console.log("next update at "+nextMoment )
    //     printTimeBlock();
    // }
}


//pulls the Day from local storage if it exists, else create a new array of objects
function constructDay(){
    //try to pull from local storage
    day = JSON.parse(localStorage.getItem("day"));

    // if success, reformat strings to moment (stringify simplified them to strings)
    if (day != undefined){
        for (var j =0; j<day.length; j++){
            day[j].time = moment(day[j].time.split("T")[1], ["hh:mm:ss.SSSZ"])
        }
        return;
    }

    //otherwise generate a new day setup
    day=[];
    let time = moment().startOf('day');
    let endTime = moment().endOf('day');
    let i=0;
    while(time < endTime){
        day.push({
            time: time.clone(),
            comment:"",
            index:i
        });
        i++;
        time.add(interval, "seconds");
    }
}



/*#######################################
####  Main  #############################
#######################################*/

// hardcoding work hours for now...
workHoursStart = moment("08:00:00AM", ["hh:mm:ssA"]);
workHoursEnd = moment("05:00:00PM", ["hh:mm:ssA"]);

//get the day array of objects, wether it exists or not
constructDay();

//display all time blocks
printTimeBlock();

//run the first update immediately, then ever 1 second after
update();
updateInterval = setInterval(update, 1000);

//set up the save buttons
 $(".saveBtn").on("click",function (){
     //get required ID and Message from the selected save row
    var dayIndex = $(this).parent().attr("data-dayObj");
    var message = $(this).parent().find(".timeBlockComment").val();

    // update the object associated only with this row
    day[dayIndex].comment = message;

    //save the data
    localStorage.setItem('day', JSON.stringify(day));
    //console.log(dayIndex +" : "+ message);
 })


