'use strict';
let {log_ln, pause, resume, string_of, save_to_file} = std.utils;
let {t_tab, t_rect, t_mouse_button} = std.classes;
let {BROWSER} = std.globals;
let {base64_encode} = std.cipher;

//import ManBehavior from 'https://raw.githubusercontent.com/DmitrySkripunov/wascript-behaviour/master/ManBehavior.js';
import ManBehavior from 'beh/ManBehavior';


let cnt = 0;
let tab = BROWSER.new_tab();

tab.on_load_end = function(){
    cnt++;
    if(cnt === 2){
        resume(); 
    }
}

tab.load("https://demo.antlace.com/");
pause();


tab.on_paint = function() {
    
};

log_ln('0');
log_ln(new Date().getTime());

var document = tab.main_frame.eval('document');
var target = document.querySelector('a[href="https://metrika.yandex.ru/dashboard?id=41295834"]');
var aa = document.querySelectorAll('input[type="text"]');
var target1 = aa[0];
var target2 = aa[1];
let man = new ManBehavior(tab);
var targetP = {x: 0, y: 0};

//targetP = man.mouseMove(targetP, target1);
//targetP = man.mouseMove(targetP, target2);
//pause(1000);
//var img = tab.get_image();
  //  save_to_file('c:\\test\\scrolled.png', img.get_bytes());

man.fillField(targetP, target1, 'test and test');

//man.scroll(targetP, 300, true, man.DESC);

//man.readContent(targetP, target1, 2000);
tab.press_key(18);
pause(3000);
pause(1000);
var img = tab.get_image();
    save_to_file('c:\\test\\scrolled1.png', img.get_bytes());


log_ln(new Date().getTime());
log_ln('test');




