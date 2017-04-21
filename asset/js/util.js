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
    },
    //验证手机号
    checkMobile: function (mobile) {
        var mobileReg = /^1(3|4|5|7|8)\d{9}$/;
        return mobileReg.test(mobile);
    },
    //验证密码
    checkPassword: function (password) {
        var passwordReg = /[\S]{6,20}/;
        return passwordReg.test(password);
    },
    //modal box
    /*
    * 用户反馈: fbform
    * 反馈成功: fbsucc
    * 拒绝当前竞标: denialtender
    * commit-btn  cancel-btn
    * */
    showModal: function (container, tplKey, commitFn) {
        var {tpl, tit, w} = util._modalTpl(tplKey);
        var modal =  `<div class="modal_wraper">
                    <div class="modal"></div>
                    <div class="modal_box" style="width:${w}px;">
                        <div class="modal_header">${tit}</div>
                        <div class="modal_content">               
                            ${tpl}
                        </div>
                    </div>
                </div>`;

        $(container).append(modal);

        var _cancelModal = function () {
            $(this).parents(".modal_wraper").remove();
            $(container).off("click", ".cancel-btn, .modal", _cancelModal);
        }
        var _commitModal = function () {
            var _this = this;
            if(commitFn && typeof commitFn === "function"){
                Promise.resolve(commitFn()).then(function () {
                    $(_this).parents(".modal_wraper").remove();
                })
            }
        }

        $(container).on("click", ".cancel-btn, .modal", _cancelModal);
        $(container).on("click", ".commit-btn", _commitModal);

    },

    //modal content tpl
    _modalTpl: function (tplKey) {

        if(!tplKey) throw new Error("modalTpl functino need a param : tplKey");
        //用户反馈表
        var fbform = `<form style="width:456px;margin:auto;">
                        <div class="form-group">
                            <label class="label w70">真实姓名</label>
                            <div class="dib w380">
                                <input class="input-const" name="real_name"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="label w70">电话</label>
                            <div class="dib w380">
                                <input class="input-const" name="mobile" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="label w70">邮箱</label>
                            <div class="dib w380">
                                <input class="input-const" name="email" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="label label-bl">反馈内容</label>
                            <div>
                                <textarea class="input-const" style="height: 120px;resize: none;" placeholder="请输入描述文字"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="w300 dib">
                                <input class="input-const" placeholder="输入验证码"/>
                            </div>
                            <div class="vcodeImg"></div>
                        </div>
                    </form>
                    <div class="mt25">
                        <button class="btn-green-middle commit-btn">提交反馈</button>
                        <button class="btn-denial cancel-btn">取消</button>
                    </div>`;

        //反馈成功
        var fbsucc =    `<div>
                            <img src="/static/images/feedback-succ.png" />
                            <p>提交反馈成功！感谢您的支持！</p>
                        </div>
                        <div class="mt25">
                            <button class="btn-green-middle commit-btn">提交反馈</button>
                            <button class="btn-denial">取消</button>
                        </div>`;

        //拒绝当前竞标
        var denialtender = `<img src="/static/images/denial.png" class="mt20 w160"/>
                            <p class="mt30">确定拒绝当前竞标吗？</p>           
                            <div class="mt25">
                                <button class="btn-green-middle commit-btn">确定拒绝</button>
                                <button class="btn-denial cancel-btn">取消</button>
                            </div>`;

        var tplEntrys = {
            fbform: {
                tpl: fbform,
                tit: "用户反馈",
                w: 668
            },
            fbsucc: {
                tpl: fbsucc,
                tit: "反馈成功",
                w: 668
            },
            denialtender: {
                tpl: denialtender,
                tit: "拒绝当前竞标",
                w: 490
            }
        }


        return tplEntrys[tplKey];
    }

};