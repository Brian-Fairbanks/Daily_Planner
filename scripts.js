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

var day = [];
var interval = 3600;    // in seconds  3600 = 1hr



/*#######################################
####  Functions  ########################
#######################################*/
function generateTimeBlock(timeObj){
    var curBlock = $('<div class="timeBlock row">')
    
    // create each section of the time block, along with class info and ID
    var timeBlockTime = $('<div class="col-2 timeBlockTime bg-primary text-center d-flex align-items-center justify-content-center">');
    var timeBlockComment = $('<div class="col-8 timeBlockComment bg-secondary">');
    var timeBlockSave = $('<div class="col-2 timeBlockSave bg-danger">');

    //fill content
    console.log(timeObj.time)
    timeBlockTime.append($('<h4>'+moment(timeObj.time).format('LT')+"</h4>"));

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

function update(){
    //update the moment to get the current time
    curMoment = moment();
    // write the day to the DOM
    writtenDayDisplay.text(curMoment);

    // if(nextMoment==undefined || curMoment > nextMoment){
    //     nextMoment = curMoment.add(1,"seconds");
    //     console.log("next update at "+nextMoment )
    //     printTimeBlock();
    // }
}

function constructDay(){
    let time = moment().startOf('day');
    let endTime = moment().endOf('day');
    while(time < endTime){
        day.push({
            time: time.clone(),
            comment:""
        });

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

// update();
// updateInterval = setInterval(update, 1000);


