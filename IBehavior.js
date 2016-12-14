'use strict';

export default class IBehavior{
    constructor(tab){
        this.tab = tab;
    }
    
    //
    // currentPoint - {x, y} - pixels by window
    // target - element object. For example, result of document.querySelector
    //
    click(currentPoint, targetSelector){}
    
    readContent(targetSelector, timeInMilliseconds){}
    
    scroll(deltaPixels){}
    
    selectText(){}
    
    //
    // currentPoint - {x, y} - pixels by window
    // target - element object. For example, result of document.querySelector
    //
    mouseMove(currentPoint, target){}
    
    fillField(targetSelector, value){}
}