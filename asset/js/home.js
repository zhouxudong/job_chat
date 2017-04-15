var Carous_item_w = 468;

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
    var curCarous = $(".carous-item.curr").index();

    if(curCarous){
        var $carouse = $(".carous-item").eq(curCarous - 1);

        carous_transform($carouse, Carous_item_w);
    }
});

$(".carous-next").on("click", function (e) {
    var curCarous = $(".carous-item.curr").index(),
        carousNum = $(".carous-list .carous-item").length;

    if(curCarous < (carousNum - 1)){
        var $carouse = $(".carous-item").eq(curCarous + 1);

        carous_transform($carouse, Carous_item_w);
    }
});


/*将要显示*/
function carous_transform($ele, carous_w) {
    //将要显示的carouse的索引
    var index = $ele.index();

    //将要显示的carouse移动到中间（ index为1,所以用 (1 - index) ）
    var translateX = (1 - index) * carous_w;

    //carouse实体动作、动画
    $(".carous-item-wrap").css("transform", "translateX("+ translateX+"px)");
    $(".carous-item.curr").removeClass("curr");
    $ele.addClass("curr");

    //carouse索引动作、动画
    $(".carous-inex li").removeClass("curr");
    $(".carous-inex li").eq(index).addClass("curr");
}