'use sctrict';

let {log_ln, pause, resume, string_of} = std.utils;
let {t_tab, t_rect} = std.classes;
let {BROWSER} = std.globals;

import IBehavior from 'https://raw.githubusercontent.com/DmitrySkripunov/wascript-behaviour/master/IBehavior.js';

export const ManMouseMove = function(currentPoint, targetSelector, maxMoveTime){
    var target = undefined;
    switch(typeof targetSelector){
        case 'string': 
            target = frame.eval('document').querySelector(targetSelector);
            break;
        case 'object':
            target = targetSelector;
            break;
    }
    
    if(target !== undefined){
        var targetBox = target.getBoundingClientRect();
        var targetX = getRandomArbitrary(targetBox.left, targetBox.right);
        var targetY = getRandomArbitrary(targetBox.top, targetBox.bottom);
        curve = cubicBezier(currentPoint.x, currentPoint.y, targetX, targetY);
        curve.forEach(function(t){
            pause(getRandomArbitrary(0, maxMoveTime));
            t_tab.send_mouse_move_event({x: t.x, y: t.y});
        });
    }
    
    return target;
}

export default class ManBehavior extends IBehavior{
    mouseMove(currentPoint, targetSelector){
        ManMouseMove(currentPoint, targetSelector, 8);
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