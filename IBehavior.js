'use strict';

export default class IBehavior{
    constructor(tab){
        this.tab = tab;
        this.ASC = 'asc';
        this.DESC = 'desc';
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
    
    //
    // currentPoint - {x, y} - pixels by window
    // deltaPixels  - shifting in pixels
    // isHorizontal - if value is true, shifting will be by X axis
    // direction -  ASC or DESC
    //
    scroll(currentPoint, deltaPixels, isHorizontal, direction){}
    
    readContent(targetSelector, timeInMilliseconds){}    
    selectText(){}    
    fillField(targetSelector, value){}
}