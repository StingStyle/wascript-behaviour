/**
* Autor: Dmitry Skripunov (https://github.com/DmitrySkripunov)
* Man behavior model
*
*/
'use sctrict';

let {log_ln, pause, resume, string_of} = std.utils;
let {t_mouse_event, t_key_event, t_mouse_button, t_event_flag, t_key_event_type} = std.classes;
let {BROWSER} = std.globals;

//import IBehavior from 'https://raw.githubusercontent.com/DmitrySkripunov/wascript-behaviour/master/IBehavior.js';
import IBehavior from 'beh/IBehavior';

export const ManMouseMove = function(currentPoint, targetElement, maxMoveTime){    
    let targetPoint = currentPoint;
    if(targetElement !== undefined){
        const targetBox = targetElement.getBoundingClientRect();
        const targetX = getRandomArbitrary(targetBox.left, targetBox.right);
        const targetY = getRandomArbitrary(targetBox.top, targetBox.bottom);
        targetPoint = {x: targetX, y: targetY};
        const curve = cubicBezier(currentPoint.x, currentPoint.y, targetX, targetY);
        const _self = this;
        curve.forEach(function(t, i){
            const p = Math.floor(getRandomArbitrary(0, maxMoveTime));
            pause(p < 1 ? 1 : p);
            const mouseEvent = new t_mouse_event();
            mouseEvent.x = t.x;
            mouseEvent.y = t.y;
            _self.tab.send_mouse_move_event(mouseEvent);
        });
    }
    
    return targetPoint;
}

export const ManClick = function(currentPoint, targetElement, maxMoveTime){    
    let targetPoint = currentPoint;
    if(targetElement !== undefined){
        targetPoint = ManMouseMove.call(this, currentPoint, targetElement, maxMoveTime); 
    }
    
    const mouseEvent = new t_mouse_event();
    mouseEvent.x = targetPoint.x;
    mouseEvent.y = targetPoint.y;
    
    mouseEvent.modifiers = [t_event_flag.EF_LEFT_MOUSE_BUTTON];
    this.tab.send_mouse_click_event(mouseEvent, t_mouse_button.MB_LEFT, false, 1);
    mouseEvent.modifiers = [];
    this.tab.send_mouse_click_event(mouseEvent, t_mouse_button.MB_LEFT, true, 1);
    
    return targetPoint;
}

/**
*   shift - px/wheel turn
*   speed - scroll speed (turn count per time)
*   maxDelay - turn delay
*/
export const ManScroll = function(currentPoint, delta, isHorizontal, direction, shift, speed, maxDelay){
    const mouseEvent = new t_mouse_event();
    mouseEvent.x = currentPoint.x;
    mouseEvent.y = currentPoint.y;
    
    if(isHorizontal){
        const keyEvent = new t_key_event();
        keyEvent.kind = t_key_event_type.KET_RAWKEYDOWN;
        keyEvent.native_key_code = 16;
        this.tab.send_key_event(keyEvent);

        keyEvent.kind = t_key_event_type.KET_KEYDOWN;
        keyEvent.native_key_code = 16;
        this.tab.send_key_event(keyEvent);
        
        mouseEvent.modifiers = [t_event_flag.EF_SHIFT_DOWN];
    }
    
    if(delta <= shift){
        const dx = isHorizontal ? ((direction == this.ASC) ? delta : -delta) : 0;
        const dy = !isHorizontal ? ((direction == this.ASC) ? delta : -delta) : 0;
        this.tab.send_mouse_wheel_event(mouseEvent, dx, dy);
    } else {
        /*
            delta - need pixels count
            shift - pixels per turn
            speed - turns per fingermove
        
            delta/shift = у - count of turns
            y/speed - count of findermoves    
        */
        
        let y = Math.floor(delta/shift/speed);
        y = y<=0 ? 1 : y;
        let dt = Math.floor(delta/y);
        let resultDt = 0;
        
        for(let i=0; i<y; i++){
            const p = Math.floor(getRandomArbitrary(0, maxDelay));
            pause(p < 1 ? 1 : p);
            
            const dx = isHorizontal ? ((direction == this.ASC) ? dt : -dt) : 0;
            const dy = !isHorizontal ? ((direction == this.ASC) ? dt : -dt) : 0;
            this.tab.send_mouse_wheel_event(mouseEvent, dx, dy);
            resultDt += dt;
        }
        
        dt = delta - resultDt;
        const dx = isHorizontal ? ((direction == this.ASC) ? dt : -dt) : 0;
        const dy = !isHorizontal ? ((direction == this.ASC) ? dt : -dt) : 0;
        this.tab.send_mouse_wheel_event(mouseEvent, dx, dy);
    }
    
    if(isHorizontal){
        const keyEvent = new t_key_event();
        keyEvent.kind = t_key_event_type.KET_KEYUP;
        keyEvent.native_key_code = 16;
        this.tab.send_key_event(keyEvent);
    }
}

export const ManReadContent = function(currentPoint, targetElement, timeInMilliseconds){
    let targetPoint = currentPoint;
    if(targetElement !== undefined){
        targetPoint = ManMouseMove.call(this, currentPoint, targetElement, this.MAX_MOVE_TIME); 
    }
    
    pause(timeInMilliseconds);
    
    return targetPoint;
}

export const ManFillField = function(currentPoint, targetElement, value, speed){
    let targetPoint = currentPoint;
    if(targetElement !== undefined){
        targetPoint = ManClick.call(this, currentPoint, targetElement, this.MAX_MOVE_TIME); 
        
        for(var i in value){
            this.tab.send_char(value.charAt(i));
            const p = Math.floor(getRandomArbitrary(20, speed));
            pause(p < 1 ? 1 : p);
        }
        
    }
    
    return targetPoint;
}

export default class ManBehavior extends IBehavior{
    constructor(tab){
        super(tab);
        
        this.MAX_MOVE_TIME  = 8;  //in ms
        this.SCROLL_SHIFT   = 12; // pixels/wheel turn
        this.SCROLL_SPEED   = 30; // count of turns per time
        this.MAX_SCROLL_DELAY = 500 // in ms
        
        this.MAX_FILL_FIELD_SPEED = 300 // in ms. Min is 20ms
    }
    
    mouseMove(currentPoint, targetElement){
       return ManMouseMove.call(this, currentPoint, targetElement, this.MAX_MOVE_TIME);
    }
    
    click(currentPoint, targetElement){
        return ManClick.call(this, currentPoint, targetElement, this.MAX_MOVE_TIME);
    }
    
    scroll(currentPoint, deltaPixels, isHorizontal, direction){
        return ManScroll.call(this, currentPoint, deltaPixels, isHorizontal, direction, this.SCROLL_SHIFT, this.SCROLL_SPEED, this.MAX_SCROLL_DELAY);
    }
    
    readContent(currentPoint, targetElement, timeInMilliseconds){
        return ManReadContent.call(this, currentPoint, targetElement, timeInMilliseconds);
    }
    
    fillField(currentPoint, targetElement, value){
        return ManFillField.call(this, currentPoint, targetElement, value, this.MAX_FILL_FIELD_SPEED);
    }
}

function cubicBezier(x0, y0, x1, y1){
    var direction = 0;

    var b = [];
    var sourceX = x0;
    var sourceY = y0;
    var targetX = x1;
    var targetY = y1;
    var x = (((targetX-sourceX)/2)+sourceX);
    var two = {x: x, y: sourceY};
    var three = {x: x, y: targetY};

    var t = [];
    var max = 0;
    do{
        t.push(max);
        max += 0.1;
    }
    while(max < 1);
    t.forEach(function(t){
            var x = Math.pow(1-t, 3)*sourceX + 3*Math.pow(1-t, 2)*t*two.x +( 3*(1-t)*Math.pow(t, 2)*three.x ) + Math.pow(t, 3)*targetX;
            var y = Math.pow(1-t, 3)*sourceY + 3*Math.pow(1-t, 2)*t*two.y +( 3*(1-t)*Math.pow(t, 2)*three.y ) + Math.pow(t, 3)*targetY;
            b.push({x: x, y: y});
    });
    return b;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}