$(document).ready(function()
{
var aa=$("#copyright").val();
if (aa == null) {
window.location.href = "http://www.kangrian.com/";
};
$("#copyright").attr("href","http://www.kangrian.com/");
$("#copyright").text("Kang Rian");
$("#copyright").attr("title","KangRian.com | Creative Web & Graphic Designer from Bandung, Indonesia.");
$("#copyright").attr("style","display: inline-block !important");    
$("#copyright").attr("style","position:relative!important");
$("#copyright").css("position","relative");
$("#copyright").css("zIndex","+999");
});
