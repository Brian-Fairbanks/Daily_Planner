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
function generateTimeBlock(timeObj){
    var curBlock = $('<div id="block'+timeObj.index+'" class="timeBlock row" data-dayObj="'+timeObj.index+'">')
    
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

    //return the completed timeBlock Div
    return curBlock;
}


function printTimeBlock(){
    // clear the timeBlock element
    timeBlockDisplay.empty();

    for (var i=0; i<day.length; i++){
        //append the Cur block Div to the TimeBlock id in the DOM
        timeBlockDisplay.append( generateTimeBlock(day[i]) );
    }

    //console.log(day[0].time.format('LT'));
}


function colorTimeBlocks(){
    for (var i=0; i<day.length; i++){
        //get current block associated with day array
        var curBlock = $("#block"+i);

        if(day[i].time < curMoment){
            if(day[i].time.clone().add(interval,'s') < curMoment){
            curBlock.removeClass("present future")
            curBlock.addClass("past");
            }
            else{
                curBlock.removeClass("past future")
                curBlock.addClass("present");
            }
        }
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
    colorTimeBlocks();

    // if(nextMoment==undefined || curMoment > nextMoment){
    //     nextMoment = curMoment.add(1,"seconds");
    //     console.log("next update at "+nextMoment )
    //     printTimeBlock();
    // }
}


function constructDay(){
    //try to pull from local storage
    day = localStorage.getItem("day");
    // if success, we're done here
    if (day != undefined){return}
    

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

workHoursStart = 8;
workHoursEnd = 17;
constructDay();

printTimeBlock();

 update();
 updateInterval = setInterval(update, 1000);

 $(".saveBtn").on("click",function (){
    var message = $(this).parent().find(".timeBlockComment").val();
    console.log(message);
 })


