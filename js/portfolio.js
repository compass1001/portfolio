currentSlideNo = [1,1,1,1];
currentRowNo = 1;
totalImages = 45;
rowNames = ["Web Design", "Slider", "Logo","Business Cards", "Mobile","Brochure","Poster","Cards"]
arr = [11, 21, 25, 30, 32, 36, 39, 45];
totalRows = arr.length;
jQuery(window).load(function(){
        jQuery('.to-be-continued').each(function(index, element) {
                var height = $(this).parent().outerHeight();
                jQuery(this).height(height);
                jQuery(this).css("line-height",height + "px");
        });
});
jQuery(function() {
        $('#header-wrapper a, #specialty a').bind('click',function(event){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1500,'easeInOutExpo');
            event.preventDefault();
        });
});
$(document).tooltip({
        position:{
                at:"right+15 center",
                my:"left center"
        }
});
jQuery.fn.center = function () {
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}
jQuery.fn.vcenter = function () {
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    return this;
}
function buttonDisplay(num){
        jQuery(".design-prev").removeClass("hidden");
        jQuery(".design-next").removeClass("hidden");
        if(num == 1){
                jQuery(".design-prev").addClass("hidden");
                jQuery(".design-next").removeClass("hidden");
        }
        if(num == totalImages){
                jQuery(".design-prev").removeClass("hidden");
                jQuery(".design-next").addClass("hidden");
        }
}
jQuery('#header').css("background","red");
jQuery( document ).ready(function() {
        screenWidth = jQuery(window).width();
        screenHeight = jQuery(window).height();
        headerHeight = jQuery('#header').height();
        footerHeight = jQuery('#footer').height();
        
        jQuery(".section").css({
                "min-height":screenHeight,
                "padding-top": headerHeight + 20
        });
        var sectionDesignHeight = screenHeight - headerHeight - footerHeight;
        jQuery('#slider-container').height(sectionDesignHeight - 40);
        jQuery('iframe').load(function(){
                jQuery(this).height(sectionDesignHeight-100);
        });
        
        for(var i = 0; i < totalRows; i++){
                var rowNo = i + 1;
                var sliderNavVertical = '<button number="' + rowNo + '">' + rowNames[i] + '</button>';
                var row = '<div class="slider-row" id="slider-row-' + rowNo + '"></div>';
                var nav = '<div class="slider-nav" id="slider-nav-' + rowNo + '" align=right></div>';
                jQuery('#slider-nav-vertical').append(sliderNavVertical);
                jQuery('#slider').append(row);
                jQuery('#slider').append(nav);
        }
        
        for(var i = 0; i < totalImages; i++ ){
                switch(true){
                        case i < arr[0]:
                                var row = 1;
                                var slideNo = i + 1;
                                break;
                        case i < arr[1]:
                                var row = 2;
                                var slideNo = i + 1 - arr[0];
                                break;
                        case i < arr[2]:
                                var row = 3;
                                var slideNo = i + 1 - arr[1];
                                break;
                        case i < arr[3]:
                                var row = 4;
                                var slideNo = i + 1 - arr[2];
                                break;
                        case i< arr[4]:
                                var row = 5;
                                var slideNo = i + 1 - arr[3];
                                break;
                        case i < arr[5]:
                                var row = 6;
                                var slideNo = i + 1 - arr[4];
                                break;
                        case i < arr[6]:
                                var row = 7;
                                var slideNo = i + 1 - arr[5];
                                break;
                        default:
                                var row = 8;
                                var slideNo = i + 1 - arr[6];
                }
                var slide = '<img class="slide slide-'+ slideNo +'" src="images/design/' + (i + 1) + '.jpg" />';
                var sliderNav = '<button>' + slideNo + '</button>';
                jQuery('#slider-row-' + row).append(slide);
                jQuery('#slider-nav-' + row).append(sliderNav);	
                if(jQuery.inArray((i + 1),arr) > -1){
                        var toBeContinuedWidth = jQuery('#slider-container').width()
                        var toBeContinued = '<div class="to-be-continued">To Be Continued...</div>';
                        jQuery('#slider-row-' + row).append(toBeContinued);
                }
        }
        var lastRow = '<div class="slider-row"><img src="../images/ancient-lady/to-be-continued.jpg" /></div>';
        jQuery('.circle-project').click(function(){
                var linkTo = $(this).attr("link");
                console.log(linkTo);
                var myTop = $("#" + linkTo).offset().top-20;
                $('html, body').animate({
                        scrollTop: myTop
                }, 800);
        });
        
        jQuery('#slider').append(lastRow);
        jQuery(".slider-nav button").click(function(){
                var rowNo = jQuery(this).parent().attr("id").substr(11);
                var sliderRow = jQuery(this).parent().prev();
                var slideNo = jQuery(this).html();
                var slides= jQuery(sliderRow).find(".slide");
                var scrollWidth = 0;
                jQuery(".slider-nav button").each(function(index, element) {
                        jQuery(this).removeClass("current");
                });
                jQuery(this).addClass("current");
                if(currentSlideNo[rowNo - 1] >= slideNo){
                        var start = slideNo - 1;
                        var end = currentSlideNo[rowNo - 1] - 1;
                        var scrollFlag = -1;
                }else{
                        var start = currentSlideNo[rowNo - 1] - 1;
                        var end = slideNo - 1;
                        var scrollFlag = 1;
                };
                jQuery(slides).slice(start,end).each(function(index, element){
                        var slideWidth = jQuery(this).width();
                        scrollWidth += (slideWidth + 12);
                });
                scrollWidth = scrollFlag * scrollWidth;
                jQuery(sliderRow).animate({"margin-left": "-=" + scrollWidth},500);
                currentSlideNo[rowNo - 1] = parseInt(slideNo);
        });
        jQuery("#slider-nav-vertical button").click(function(index, element){
                var rowNo = jQuery(this).attr("number");
                var rows = jQuery(this).parent().next().find('.slider-row');
                var scrollHeight = 0;
                jQuery("#slider-nav-vertical button").each(function(index, element) {
                        jQuery(this).removeClass("current");
                });
                jQuery(this).addClass("current");
                if(currentRowNo >= rowNo){
                        var start = rowNo - 1;
                        var end = currentRowNo - 1;
                        var scrollFlag = -1;
                        console.log(start);
                }else{
                        var start = currentRowNo - 1;
                        var end = rowNo - 1;
                        var scrollFlag = 1;
                }
                console.log("start:" + start);
                console.log("end:" + end)
                jQuery(rows).slice(start,end).each(function(index, element){
                        var rowHeight = jQuery(this).height();
                        scrollHeight += (rowHeight + 10);
                        var i = 0;
                        console.log(i + ":" + scrollHeight);
                        i++;
                });
                scrollHeight = scrollFlag * scrollHeight;
                jQuery(slider).animate({"margin-top": "-=" + scrollHeight},500);
                console.log("rowNo:" + currentRowNo)
                currentRowNo = parseInt(rowNo);
                console.log("currentRowNo:" + currentRowNo);
        });
        jQuery(".slider-row img").click(function(){
                jQuery(".slider-row img").each(function(index, element) {
                        jQuery(this).removeClass("clicked");
                });
                jQuery(this).addClass("clicked");
                var designImagePanel = '<div class="design-image"><img src="' + jQuery(this).attr("src") + '" /></div>';
                jQuery("#design-image-panel").prepend(designImagePanel);
                jQuery("#design-image-panel").addClass("displayed");
                jQuery("#design-image-panel").width(screenWidth);
                jQuery("#design-image-panel").height(screenHeight);
                $(".design-image img").center();
                jQuery(".design-prev").vcenter();
                jQuery(".design-next").vcenter();
                var num = jQuery(".design-image img").attr("src").match(/\d+/g);
                buttonDisplay(num);
                
        });
 
        jQuery(".gray-area").click(function(){
                jQuery("#design-image-panel").removeClass("displayed");
                jQuery(".design-image").remove();
        });
        jQuery(".design-prev").click(function(){
                var oldImage = jQuery(".design-image img").attr("src");
                var num = oldImage.match(/\d+/g);
                jQuery(".design-next").removeClass("hidden");
                if(num > 1){
                        var newNum = parseInt(num) - 1;
                        var newImage = oldImage.replace(num,newNum);
                        jQuery(".design-image img").attr("src",newImage);
                }
                buttonDisplay(newNum);
                jQuery(".design-image img").center();
                jQuery(".design-prev").vcenter();
                jQuery(".design-next").vcenter();
        });
        jQuery(".design-next").click(function(){
                var oldImage = jQuery(".design-image img").attr("src");
                var num = oldImage.match(/\d+/g);
                jQuery(".design-prev").removeClass("hidden")
                if(num < totalImages){
                        var newNum = parseInt(num) + 1;
                        var newImage = oldImage.replace(num,newNum);
                        jQuery(".design-image img").attr("src",newImage);
                        //if(num == totalImages - 1)
                               // jQuery(".design-next").addClass("hidden");
                }
                buttonDisplay(newNum);
                jQuery(".design-image img").center();
                jQuery(".design-prev").vcenter();
                jQuery(".design-next").vcenter();
        });
        $("#contact-button, span").click(function(){
                if($("#contact-button").hasClass("clicked")){
                        $("#contact-button").animate({
                                "margin-left":"0"
                        },200);
                        $("#contact-info").animate({
                                "margin-left":"-4%"
                        },200);
                }else{
                        $("#contact-button").animate({
                                "margin-left":"4%"
                        },200);
                        $("#contact-info").animate({
                                "margin-left":"0"
                        },200);
                }
                $("#contact-button").toggleClass("clicked");
        });
        $("#contact-button").mouseup(function(){
                $(this).removeClass("pressed");
        });
        $("#contact-button").mousedown(function(){
                $(this).addClass("pressed");
        });
        $(".contact-info-button img").hover(function(){
                var image = $(this).attr("src");
                var hoverImage = image.replace("gray","orange");
                $(this).attr("src",hoverImage);
        },function(){
                var hoverImage = $(this).attr("src");
                var image = hoverImage.replace("orange","gray");
                $(this).attr("src",image);
        });
         
        $(".project-title").click(function(){
                $(this).parent().next( ".project-content" ).slideToggle( "slow" );
                //var projectId = $(this).parents(".project").attr("id");
               // window.location.hash = projectId;
                var myTop = $(this).parents('.project').offset().top-20;
                $('html, body').animate({
                        scrollTop: myTop
                }, 500);
        });
        $(".project").each(function(index,element){
                $(this).css("top",-index * 130);
        });
        $(".project").each(function(index,element){
                var number = index + 1;
                if(index % 2 == 0){
                        var area = '<area a="javascript:void(0);" for="project" shape="circle" coords="100,100,100">';
                }else{
                        var area = '<area a="javascript:void(0);" for="project" shape="circle" coords="860,100,100">';
                }
                var map = '<map name="project-' + number + '">' + area + '</map>';
                $(map).insertAfter($(this).find(".title-bar img"));
                $(this).find(".title-bar img").attr("usemap","#project-" + number);
        });
        $("area[for='project']").click(function(){
                $(this).parents(".project").find( ".project-content" ).slideToggle( "slow" );
                //var projectId = $(this).parents(".project").attr("id");
                //window.location.hash = projectId;
                var myTop = $(this).parents('.project').offset().top-20;
                $('html, body').animate({
                        scrollTop: myTop
                }, 500);
        });
});