function WascriptMonitor(options){
    
    this.CANVAS_ID = 'wascript-monitor-canvas';
    
    _self = this;
    
    this.canvas = undefined;
    this._ctx = undefined;
    
    this._init = function(options){
        document.addEventListener("DOMContentLoaded", _self._ready);
    }
    
    this._ready = function(){
        /*_self.canvas = document.createElement('canvas');
        
        _self.canvas.setAttribute('id', _self.CANVAS_ID);
        var body = document.querySelector('body');
        _self.canvas.style.width      = body.offsetWidth + 'px';
        _self.canvas.style.height     = body.offsetHeight + 'px';
        _self.canvas.style.position   = 'absolute';
        _self.canvas.style.top        = '0';
        _self.canvas.style.left       = '0';
        //_self.canvas.style.display    = 'none';*/
        
        
        document.addEventListener('mousemove', _self._onMouseMove);
 
        
       // body.appendChild(_self.canvas);
        
        var c = document.querySelector('#'+_self.CANVAS_ID);
        var ctx   = c.getContext('2d'); 
        
        ctx.fillStyle = "#ff00ff";
 
        //ctx.fillRect(0, 0, _self.canvas.width, _self.canvas.height);

         ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.lineTo(300, 150);
        ctx.strokeStyle = "black";
        ctx.stroke();
        
    }
    
    this._onMouseMove = function(evt){
        var x = evt.clientX;
        var y = evt.clientY;
        
        
    }
    
    this._init(options);
}

var wm = new WascriptMonitor();