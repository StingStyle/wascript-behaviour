'use strict';

export default class IBehavior{
    frame;
    
    constructor(frame){
        this.frame = frame;    
    }
    
    click(targetSelector){}
    
    readContent(targetSelector, timeInMilliseconds){}
    
    scroll(deltaPixels){}
    
    selectText(){}
    
    //
    // currentPoint - {x, y} - pixels by window
    //
    mouseMove(currentPoint, targetSelector){}
    
    fillField(targetSelector, value){}
}