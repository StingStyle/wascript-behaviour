'use strict';

export default class IBehavior{
    constructor(tab){
        this.tab = tab;
    }
    
    //
    // currentPoint - {x, y} - pixels by window
    // target - element object. For example, result of document.querySelector
    //
    mouseMove(currentPoint, target){}
    
    //
    // currentPoint - {x, y} - pixels by window
    // target - element object. For example, result of document.querySelector
    // if target if undefined click will be made by current point
    //
    click(currentPoint, target){}
    
    scroll(deltaPixels){}
    
    readContent(targetSelector, timeInMilliseconds){}
    
    
    
    selectText(){}
    
    
    
    fillField(targetSelector, value){}
}