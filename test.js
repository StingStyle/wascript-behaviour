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


/*
log_ln('0');
log_ln(new Date().getTime());
var document = tab.main_frame.eval('document');
var target = document.querySelector('a[href="https://metrika.yandex.ru/dashboard?id=41295834"]');
var aa = document.querySelectorAll('a');
var target1 = aa[0];
var target2 = aa[1];
let man = new ManBehavior(tab);
var targetP = man.mouseMove({x: 0, y: 0}, target1);
//targetP = man.mouseMove(targetP, target2);
//man.scroll({x: 100, y: 100}, 300, false, man.ASC);
target2.style.border = '2px solid red';
man.click(targetP, target2);
pause(2000)
var img = tab.get_image();

// Works in dev mode only.
save_to_file('c:\\test\\scrolled.png', img.get_bytes());

log_ln(new Date().getTime());
log_ln('test');*/


