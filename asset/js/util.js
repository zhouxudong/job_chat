var util = {
    //浏览器引擎前缀 （webkit,Moz,ms,O）
    vendor: function () {
        var divStyle = document.createElement("div").style,
            vendors = "t,webkitT,MozT,msT,OT".split(","),
            i = 0,
            ln = vendors.length,
            t;
        for( ; i < ln; i++){
            t = vendors[i] + 'ransform';
            if(t in divStyle){
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    },
    //css引擎前缀: (-webkit-, -moz-, -ms-, -o-);
    cssVendor: function () {
        var vendor = this.vendor();
        return vendor ? "-" + vendor.toLowerCase() + "-" : "";
    },
    //style加引擎前缀 （webkitTransform, MozTransform)
    prefixStyle: function (style) {
        var vendor = this.vendor();
        if(vendor === "") return style;

        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    },
    //transition过度结束触发
    transitionEnd: function () {
        var vendor = this.vendor();

        if(vendor === false) return false;
        var transitionEnd = {
            ''          : 'transitionend',
            'webkit'    : 'webkitTransitionEnd',
            'Moz'       : 'transitionend',
            'O'         : 'otransitionend',
            'ms'        : 'MSTransitionEnd'
        };
        return transitionEnd[vendor];
    },
    //添加帧定时器
    requestAnimationFrame: function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    setTimeout(callback, 1000/60);
                };
    },
    //清楚帧定时器
    cancelAnimationFrame: function () {
        return window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                clearTimeout;
    }
};