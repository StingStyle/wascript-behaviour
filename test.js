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
tab.press_key(18);
pause(500);

var document = tab.main_frame.eval('document');
var link = document.querySelector('a[href="https://metrika.yandex.ru/dashboard?id=41295834"]');
var input = document.querySelectorAll('input[type="text"]');
var aa = document.querySelectorAll('a');
var target1 = aa[0];
var target2 = aa[1];

let man = new ManBehavior(tab, {x: 0, y: 0});

man
    //.mouseMove(target1)
    //.mouseMove(target2)
    //.click(link)
    .fillField(input[0], 'test and test');


//man.fillField(input, 'test and test');
//man.readContent(targetP, target1, 2000);

pause(2000);
var img = tab.get_image();
    save_to_file('c:\\test\\scrolled.png', img.get_bytes());


log_ln(new Date().getTime());
log_ln('test');




