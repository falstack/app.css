import './src/app.scss'
import './src/container.scss'
import './src/button.scss'

var addEvent = (function () {
    if (document.addEventListener) {
        return function(el, type, fn){
            if (el.length) {
                for(var i=0; i<el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            } else {
                el.addEventListener(type, fn, false);
            }
        };
    } else {
        return function(el, type, fn) {
            if (el.length) {
                for(var i=0; i<el.length; i++) {
                    addEvent(el[i], type, fn);
                }
            } else {
                el.attachEvent('on' + type, function(){
                    return fn.call(el, window.event);
                });
            }
        };
    }
})();

addEvent(document.body, 'click', function (e) {
    var arr = e.target.className.split(' ');
    var len = arr.length;
    for (var i=0; i<len; i++) {
        if (arr[i] === 'app-ui-wave') {
            var self = e.target;
            self.style.position = 'relative';
            self.style.overflow = 'hidden';
            var dom = document.createElement("div");

            var initLeft = e.layerX - (self.offsetWidth - self.clientWidth) / 2;
            var initTop = e.layerY - (self.offsetHeight - self.clientHeight) / 2;
            var initSize = 0;
            var initTime = 0.4;
            var initFunc = 'linear';
            var initColor = 'rgba(0, 0, 0, .3)';

            dom.style.width = initSize;
            dom.style.height = initSize;
            dom.style.borderRadius = '50%';
            dom.style.position = 'absolute';
            dom.style.left = initLeft + 'px';
            dom.style.top = initTop + 'px';
            dom.style.backgroundColor = initColor;
            dom.style.transitionDuration = initTime + 's';
            dom.style.webkitTransitionDuration = initTime + 's';
            dom.style.transitionTimingFunction = initFunc;
            dom.style.webkitTransitionTimingFunction = initFunc;

            self.appendChild(dom);

            var r = Math.sqrt(Math.pow(self.offsetWidth, 2) + Math.pow(self.offsetHeight, 2));
            dom.style.width = r * 2 + 'px';
            dom.style.height = r * 2 + 'px';
            dom.style.left = initLeft - r + 'px';
            dom.style.top = initTop - r + 'px';
            dom.style.backgroundColor = 'rgba(0, 0, 0, .1)';
            setTimeout(function () {
                self.removeChild(dom);
            }, initTime * 1000);
        }
    }
});