"use strict";
let {log_ln, pause, resume, string_of} = std.utils;
let {t_tab, t_rect} = std.classes;
let {BROWSER} = std.globals;
let {base64_encode} = std.cipher;

import ManBehavior from 'https://raw.githubusercontent.com/DmitrySkripunov/wascript-behaviour/master/ManBehavior.js';

let tab = BROWSER.new_tab();
tab.on_load_end = function(){
    log_ln('12345');
}
tab.load("https://demo.antlace.com/");
pause(4000);

/*let image = tab.get_image();
let s = base64_encode(image.get_bytes());
log_ln(string_of(s));*/

let man = new ManBehavior(tab);
man.mouseMove({x: '0px', y: '0px'}, 'a[href="https://metrika.yandex.ru/dashboard?id=41295834"]');


log_ln('test');