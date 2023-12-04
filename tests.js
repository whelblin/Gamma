//testing window
////////////////////////////////////////////////////////////////////////////
if (typeof window == 'undefined') {
  console.log("Testing...")
  chia = require('chai')
  timer = require("./timer")
  // Press to start opacity control
  test_timer()
  test_pause()
  console.log("...Done")
  process.exit(0)
}
//end of testing window
////////////////////////////////////////////////////////////////////////////

//testing functions
////////////////////////////////////////////////////////////////////////////
async function test_timer(){
    let timer_object = new timer.Timer()
    let sec = 1
    let num = timer_object.getCurrentSec()
    await new Promise(resolve => setTimeout(resolve, sec*1000)); // pauses for sec amount of seconds
    num = timer_object.getCurrentSec()
    chia.assert(parseInt(num) == 1, "should be 1")
}
async function test_pause(){
    let timer_object = new timer.Timer()
    let sec = 1
    let num = timer_object.getCurrentSec()
    timer_object.startPause()
    await new Promise(resolve => setTimeout(resolve, sec*1000)); // pauses for sec amount of seconds
    timer_object.pausedTime()
    timer_object.endPause()
    num = timer_object.getCurrentSec()
    chia.assert(num == 0, "should be 5")
}

//end of testing functions
////////////////////////////////////////////////////////////////////////////
