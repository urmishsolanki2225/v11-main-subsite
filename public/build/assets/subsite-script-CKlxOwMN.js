import{$ as e,S as d}from"./sticky-event-listener.esm-B82MuG7d.js";import"./_commonjsHelpers-BosuxZz1.js";e(function(){var v=e(".nosubmenu").not(":first").hasClass("active"),_=e(".nav_main_item").hasClass("active");(v||_)&&(e(".nav_main").find("li:first").removeClass("active"),e(".nav_main ul").find("li:first").removeClass("active")),e("#navToggle").on("click",function(){var s=e("#mainNav").hasClass("show");e("#mainNav").toggleClass("show",!s),e(document.body).toggleClass("active_nav",!s)}),e(".searchToggle").on("mouseenter",function(){e(this).parent().addClass("show"),e("input",e(this).parent()).trigger("focus")}),e("#searchBar").on("mouseleave",function(){e("input",this).val()||e(this).removeClass("show")}),e("#search_cancel_button").on("click",function(s){return s.preventDefault(),s.stopPropagation(),e("#searchBar").removeClass("show"),!0}),e("#languageSelection_toggle").on("click",function(){e("#languageSelection_list").toggleClass("show")}),e("#mainNav .nav_drop_section h2").on("click",function(){var s=e(this).hasClass("active");e(this).parents(".nav_main").find("h2").removeClass("active"),e(this).parents(".nav_main").find(".nav_drop_listing").removeClass("show_nav_drop_listing"),e(this).toggleClass("active",!s).next(".nav_drop_listing").toggleClass("show_nav_drop_listing",!s)}),e(".nav_main_item").on("mouseenter",function(){e(".nav_drop",this).addClass("show_nav_drop")}),e(".nav_main_item").on("mouseleave",function(){e(".nav_drop",this).removeClass("show_nav_drop")}),e(".carousel").each(function(){var s="stop",t=this,a=!1,n=0,c=e(".carousel_items article",this),i=e(".carousel_controls span",this);function o(){c.removeClass("carousel_show"),e(c[n]).addClass("carousel_show"),i.removeClass("carousel_active"),e(i[n]).addClass("carousel_active")}function l(){if(s==="stop"){clearTimeout(a);return}s="pause",clearTimeout(a)}function r(){s="play",o(),a=setTimeout(function(){n=(n+1)%c.length,r()},8e3)}function u(){s="stop",clearTimeout(a)}e(t).on("mouseenter",function(){s==="play"&&l()}),e(t).on("mouseleave",function(){s==="pause"&&r()}),e(".carousel_blocker",t).on("click",function(f){e(this).css("pointer-events","none"),u()}),i.on("click",function(){u(),n=parseInt(e(this).attr("data-carousel-control-idx")),o()}),r()}),e(".collection_items_inline .inline_item_do_show_content").click(function(){e(this).parents("article.inline_item").removeClass("inline_item_hide_content")}),e(".collection_items_inline .inline_item_do_hide_content").click(function(){e(this).parents("article.inline_item").addClass("inline_item_hide_content")}),e(".subcollections_list_unhide_all_siblings").on("click",function(){e(this).parent("li").addClass("subcollections_list_hide").siblings().removeClass("subcollections_list_hide")}),document.querySelectorAll(".detect_sticky").forEach(s=>{new d(s),s.addEventListener("sticky",t=>{s.classList.toggle("stuck",t.detail.stuck)})}),e(".contact_us_offices .card_affiliate").on("click","header",s=>{e(s.currentTarget).parent(".card_affiliate").hasClass("active")?e(s.currentTarget).parent(".card_affiliate").removeClass("active"):(e(s.currentTarget).parent(".card_affiliate").addClass("active"),e(s.currentTarget).parent(".card_affiliate").siblings(".card_affiliate").removeClass("active"))}),e(".contact_us_offices .card_affiliate:first").addClass("active"),e(".subscribe-carousel").each(s=>{const t=e(".subscribe-carousel-form form",s),a=e(".subscribe-carousel > div",s);e(".subscribe-carousel-start",s).on("click",()=>{a.removeClass("active"),e(".subscribe-carousel-form",s).addClass("active")}),t.submit(n=>{const c={};t.serializeArray().forEach(({name:i,value:o})=>c[i]=o),e("button[type=submit]",s).prop("disabled",!0),e.post(t.attr("action"),c).always(()=>{e("button[type=submit]",s).prop("disabled",!1),a.removeClass("active")}).done((i,o,l)=>{e(".subscribe-carousel-result-success",s).addClass("active")}).fail((i,o,l)=>{console.warn(i,o,l,this),e(".subscribe-carousel-result-success",s).addClass("active")}),n.preventDefault()}),e(".subscribe-carousel-result-error button",s).on("click",()=>{a.removeClass("active"),e(".subscribe-carousel-form",s).addClass("active")})})});