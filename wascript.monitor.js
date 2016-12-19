/**
* Autor: Dmitry Skripunov (https://github.com/DmitrySkripunov)
* Date: 19.12.2016 
* For wascript redactor project
*
*/
function WascriptMonitor(options){
    
    this.CANVAS_ID = 'wascript-monitor-canvas';
    
    _self = this;
    
    this.canvas = undefined;
    this._ctx = undefined;
    this.X = undefined;
    this.Y = undefined;
    
    this._init = function(options){
        document.addEventListener("DOMContentLoaded", _self._ready);
    }
    
    this._ready = function(){
        var body = document.querySelector('body');
        
        _self.canvas = document.createElement('canvas');
        _self.canvas.setAttribute('id', _self.CANVAS_ID);
        _self.canvas.setAttribute('width', window.innerWidth);
        _self.canvas.setAttribute('height', window.innerHeight);
        _self.canvas.style.position   = 'fixed';
        _self.canvas.style.top        = '0';
        _self.canvas.style.left       = '0';
        _self.canvas.style.display    = 'none';
        
        body.appendChild(_self.canvas); 
          
        _self.ctx = _self.canvas.getContext('2d'); 
        _self.ctx.globalAlpha = 0.4;
        _self.ctx.fillStyle = "#ffffff";
        _self.ctx.fillRect(0, 0, _self.canvas.width, _self.canvas.height);
        _self.ctx.globalAlpha = 1;
        
        document.addEventListener('mousemove', _self._onMouseMove);
        document.addEventListener('click', _self._onMouseClick);
        document.addEventListener('keyup', _self._onShowCanvas);
    }
    
    this._onMouseMove = function(evt){
        var x = evt.clientX;
        var y = evt.clientY;
        
        if(_self.X === undefined){
            _self.X = window.event.clientX;
            _self.Y = window.event.clientY;
        }
        
        _self.ctx.globalAlpha = 0.6;
        _self.ctx.beginPath();
        _self.ctx.moveTo(_self.X, _self.Y);
        _self.ctx.lineTo(x, y);
        _self.ctx.lineWidth = 5;s
        _self.ctx.strokeStyle = "black";
        _self.ctx.stroke();
        _self.ctx.globalAlpha = 1;
        
        _self.X = x;
        _self.Y = y;
    }
    
    this._onMouseClick = function(evt){
        var x = evt.clientX;
        var y = evt.clientY;
        
        _self.ctx.globalAlpha = 0.6;
        _self.ctx.beginPath();
        _self.ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
        _self.ctx.fillStyle = '#ff0000';
        _self.ctx.fill();
        _self.ctx.globalAlpha = 1;
    }
    
    this._onShowCanvas = function(evt){
       if(evt.keyCode === 48 && evt.ctrlKey){
           if(_self.canvas.style.display === 'none'){
               _self.canvas.style.display = 'block';
           }else{
               _self.canvas.style.display = 'none';
           }
       } 
    }
    
    this._init(options);
}

var wm = new WascriptMonitor();