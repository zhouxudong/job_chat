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
    }
};