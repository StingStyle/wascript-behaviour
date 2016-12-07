'use sctrict';

import IBehavior from 'https://raw.githubusercontent.com/DmitrySkripunov/wascript-behaviour/master/IBehavior.js';

export const ManMouseMove = function(currentPoint, targetSelector){
    
}

export default class ManBehavior extends IBehavior{
    mouseMove(currentPoint, targetSelector){
        ManMouseMove(currentPoint, targetSelector);
    }
}
