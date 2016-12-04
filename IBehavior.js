'use strict';

export default class IBehavior{
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