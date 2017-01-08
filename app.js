import './src/app.scss'

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
            var dom = document.createElement("div");

            var initLeft = e.layerX - (e.target.offsetWidth - e.target.clientWidth) / 2;
            var initTop = e.layerY - (e.target.offsetHeight - e.target.clientHeight) / 2;
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

            e.target.appendChild(dom);

            var r = Math.sqrt(Math.pow(e.target.offsetWidth, 2) + Math.pow(e.target.offsetHeight, 2));
            dom.style.width = r * 2 + 'px';
            dom.style.height = r * 2 + 'px';
            dom.style.left = initLeft - r + 'px';
            dom.style.top = initTop - r + 'px';
            dom.style.backgroundColor = 'rgba(0, 0, 0, .1)';
            setTimeout(function () {
                e.target.removeChild(dom);
            }, initTime * 1000);
        }
    }
});