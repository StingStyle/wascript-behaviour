'use sctrict';

let {log_ln, pause, resume, string_of} = std.utils;
let {t_mouse_event} = std.classes;
let {BROWSER} = std.globals;

//import IBehavior from 'https://raw.githubusercontent.com/DmitrySkripunov/wascript-behaviour/master/IBehavior.js';
import IBehavior from 'beh/IBehavior';

export const ManMouseMove = function(currentPoint, targetElement, maxMoveTime){    
    if(targetElement !== undefined){
        var targetBox = targetElement.getBoundingClientRect();
        var targetX = getRandomArbitrary(targetBox.left, targetBox.right);
        var targetY = getRandomArbitrary(targetBox.top, targetBox.bottom);
        var curve = cubicBezier(currentPoint.x, currentPoint.y, targetX, targetY);
        var _self = this;
        curve.forEach(function(t, i){
            var p = Math.floor(getRandomArbitrary(0, maxMoveTime));
            pause(p < 1 ? 1 : p);
            var mouseEvent = new t_mouse_event();
            mouseEvent.x = t.x;
            mouseEvent.y = t.y;
            _self.tab.send_mouse_move_event(mouseEvent);
        });
    }
    
    return {x: targetX, y: targetY};
}

export const ManClick = function(currentPoint, targetElement){    
    if(targetElement !== undefined){
        var targetBox = targetElement.getBoundingClientRect();
        var targetX = getRandomArbitrary(targetBox.left, targetBox.right);
        var targetY = getRandomArbitrary(targetBox.top, targetBox.bottom);
       
        var mouseEvent = new t_mouse_event();
        mouseEvent.x = targetX;
        mouseEvent.y = targetY;
        this.tab.send_mouse_click_event(mouseEvent);
    }
    
    return {x: targetX, y: targetY};
}

export default class ManBehavior extends IBehavior{
    constructor(tab){
        super(tab);
        
        this.MAX_MOVE_TIME = 8; //in ms
    }
    
    mouseMove(currentPoint, targetElement){
       return ManMouseMove.call(this, currentPoint, targetElement, this.MAX_MOVE_TIME);
    }
    
    click(currentPoint, targetElement){
        ManMouseMove.call(this, currentPoint, targetElement, this.MAX_MOVE_TIME);
        //return ManClick.call(this, currentPoint, targetElement);
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
        max += 0.001;
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