/**
* Autor: Dmitry Skripunov (https://github.com/DmitrySkripunov)
* Behavior models interface
*
*/
'use strict';

export default class IBehavior{
    constructor(tab, currentPoint){
        this.tab = tab;
        this.ASC = 'asc';
        this.DESC = 'desc';
        
        this.MAX_MOVE_TIME  = 8;  //in ms
        this.SCROLL_SHIFT   = 12; // pixels/wheel turn
        this.SCROLL_SPEED   = 30; // count of turns per time
        this.MAX_SCROLL_DELAY = 500 // in ms
        this.MAX_FILL_FIELD_SPEED = 300 // in ms. Min is 20ms
        
        this._currentPoint = currentPoint;
    }
    
    /**
    *
    *
    */
    pause(milliseconds){}
    
    /**
    * target - element object. For example, result of document.querySelector
    */
    mouseMove(target){}
    
    /**
    * target - element object. For example, result of document.querySelector
    * if target if undefined click will be made by current point
    */
    click(target){}
    
    /**
    * deltaPixels  - shifting in pixels
    * isHorizontal - if value is true, shifting will be by X axis
    * direction -  ASC or DESC
    */
    scroll(deltaPixels, isHorizontal, direction){}
    
    /**
    * target - element object. For example, result of document.querySelector
    * timeInMilliseconds - read time
    *
    */
    readContent(target, timeInMilliseconds){}
    
    /**
    * @deprecated
    *
    */
    selectText(targetPoint){}
    
    /**
    * target - element object. For example, result of document.querySelector
    * value - string for filling field
    *
    */
    fillField(target, value){}
}