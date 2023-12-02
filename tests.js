if (typeof window == 'undefined') {
chia = require('chai')
  timer = require("./timer")
}

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

if (typeof window == 'undefined') {
module.exports = {test_timer, test_pause}
}