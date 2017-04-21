(function (window, $, undefined) {
    var Carous_item_w = 468;

    $(window).on("load resize", function () {
        var screenW = $(document).width();

        var percentBanner = 724 / 1920 ;
        var percentworkfl = 332 / 1920 ;

        $(".banner").height(screenW * percentBanner);
        $(".project-flow").height(screenW * percentworkfl);
    })

    $(".carous-list").on("click", ".carous-item", function (e) {
        var $ele = $(this);

        carous_transform($ele, Carous_item_w);
    });

    $(".carous-inex").on("click", "li", function (e) {
        var $ele = $(this),
            $carouse = $(".carous-item").eq($ele.index());

        carous_transform($carouse, Carous_item_w);
    });

    $(".carous-pre").on("click", function (e) {
        var curCarous = $(".carous-item.curr").index(),
            $carouse;

        if(curCarous){
            $carouse = $(".carous-item").eq(curCarous - 1);
        }else{
            $carouse = $(".carous-item").last();
        }

        carous_transform($carouse, Carous_item_w);
    });

    $(".carous-next").on("click", function (e) {
        var curCarous = $(".carous-item.curr").index(),
            carousNum = $(".carous-list .carous-item").length,
            $carouse

        if(curCarous < (carousNum - 1)){
            $carouse = $(".carous-item").eq(curCarous + 1);
        }else{
            $carouse = $(".carous-item").eq(0);
        }

        carous_transform($carouse, Carous_item_w);
    });

    $(".curr-chose").on("click", function (e) {

        $(".search-sel").toggleClass("none");
    });
    $(".search-sel").on("click", "li", function (e) {
        var $ele = $(this),
            opTxt = $ele.text();

        $(".search-sel").toggleClass("none");
        $(".curr-chose").text(opTxt);
    });


    /*将要显示*/
    function carous_transform($ele, carous_w) {
        //将要显示的carouse的索引
        var index = $ele.index(),

            //get vendor + transform
            vendorTransform = util.prefixStyle("transform"),

            //将要显示的carouse移动到中间（ index为1,所以用 (1 - index) ）
            translateX = (1 - index) * carous_w;

        //carouse实体动作、动画
        $(".carous-item-wrap").css(vendorTransform, "translateX("+ translateX+"px)");
        $(".carous-item.curr").removeClass("curr");
        $ele.addClass("curr");

        //carouse索引动作、动画
        $(".carous-inex li").removeClass("curr");
        $(".carous-inex li").eq(index).addClass("curr");
    }
})(window,$)