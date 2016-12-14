'use strict';
let {log_ln, pause, resume, string_of} = std.utils;
let {t_tab, t_rect, t_mouse_button} = std.classes;
let {BROWSER} = std.globals;
let {base64_encode} = std.cipher;

//import ManBehavior from 'https://raw.githubusercontent.com/DmitrySkripunov/wascript-behaviour/master/ManBehavior.js';
import ManBehavior from 'beh/ManBehavior';

let tab = BROWSER.new_tab();


tab.load("https://demo.antlace.com/");
pause(4000);


/*let image = tab.get_image();
let s = base64_encode(image.get_bytes());
log_ln(string_of(s));*/

var target = tab.main_frame.eval('document').querySelector('a[href="https://metrika.yandex.ru/dashboard?id=41295834"]');
log_ln('0');
let man = new ManBehavior(tab);
man.mouseMove({x: 0, y: 0}, target);


log_ln('test');