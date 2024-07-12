import $ from "jquery";
import StickyEventListener from "sticky-event-listener";

/* eslint-disable */

$(function () {
    $("#navToggle").on("click", function () {
        var navShow = $("#mainNav").hasClass("show");
        $("#mainNav").toggleClass("show", !navShow);
        $(document.body).toggleClass("active_nav", !navShow);
    });

    $(".searchToggle").on("mouseenter", function () {
        $(this).parent().addClass("show");
        $("input", $(this).parent()).trigger("focus");
    });
    $("#searchBar").on("mouseleave", function () {
        if ($("input", this).val()) {
            // searchbar has a value, don't hide
            return;
        }
        // if (!$("input:focus", $(this)).length) {
        $(this).removeClass("show");
        // }
    });
    // $(".searchToggle").on("click", function () {
    //     // $("input#search_input").toggle();
    //     $("#searchBar").addClass("show");
    //     $("#search_input").trigger("focus");
    // });
    $("#search_cancel_button").on("click", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $("#searchBar").removeClass("show");
        return true;
    });

    $("#languageSelection_toggle").on("click", function () {
        // $("#languageSelection_list").toggle();
        $("#languageSelection_list").toggleClass("show");
    });

    $("#mainNav .nav_drop_section h2").on("click", function () {
        // if (isMobileMenu()) {
        // $(this).next(".nav_drop_listing").slideToggle();
        // }
        var dropDownIsActive = $(this).hasClass("active");
        $(this).parents(".nav_main").find("h2").removeClass("active");
        $(this)
            .parents(".nav_main")
            .find(".nav_drop_listing")
            .removeClass("show_nav_drop_listing");
        $(this)
            .toggleClass("active", !dropDownIsActive)
            .next(".nav_drop_listing")
            .toggleClass("show_nav_drop_listing", !dropDownIsActive);
    });

    $(".nav_main_item").on("mouseenter", function () {
        $(".nav_drop", this).addClass("show_nav_drop");
    });
    $(".nav_main_item").on("mouseleave", function () {
        $(".nav_drop", this).removeClass("show_nav_drop");
    });
    // $(".nav_main_item").hover(
    //     function () {
    //         $(".nav_drop", this).addClass("show_nav_drop");
    //         // if (!isMobileMenu()) {
    //         //     layoutMenu();
    //         //     $(".nav_drop", this).stop();
    //         //     $(".nav_drop", this).slideDown();
    //         // }
    //     },
    //     function () {
    //         $(".nav_drop", this).removeClass("show_nav_drop");
    //         // if (!isMobileMenu()) {
    //         //     $(".nav_drop", this).stop();
    //         //     $(".nav_drop", this).slideUp();
    //         // }
    //     }
    // );

    $(".carousel").each(function () {
        var status = "stop";
        var carousel = this;
        var timer = false;
        var current = 0;
        var $items = $(".carousel_items article", this);
        var $controls = $(".carousel_controls span", this);

        function showCurrent() {
            // console.log("carousel status", status, current);
            $items.removeClass("carousel_show");
            $($items[current]).addClass("carousel_show");

            $controls.removeClass("carousel_active");
            $($controls[current]).addClass("carousel_active");
        }

        function pause() {
            if (status === "stop") {
                clearTimeout(timer);
                return; // stay stopped
            }
            status = "pause";
            clearTimeout(timer);
        }
        function resume() {
            status = "play";
            showCurrent();

            timer = setTimeout(function () {
                current = (current + 1) % $items.length;
                resume();
            }, 8000);
        }

        function stop() {
            status = "stop";
            clearTimeout(timer);
        }

        $(carousel).on("mouseenter", function () {
            if (status === "play") {
                pause();
            }
        });

        $(carousel).on("mouseleave", function () {
            if (status === "pause") {
                resume();
            }
        });

        $(".carousel_blocker", carousel).on("click", function (e) {
            $(this).css("pointer-events", "none");
            // console.log("click");
            stop();
            // $($items[0]).click(e);
        });

        $controls.on("click", function () {
            stop();
            current = parseInt($(this).attr("data-carousel-control-idx"));
            showCurrent();
        });

        resume();
    });

    $(".collection_items_inline .inline_item_do_show_content").click(
        function () {
            $(this)
                .parents("article.inline_item")
                .removeClass("inline_item_hide_content");
        }
    );

    $(".collection_items_inline .inline_item_do_hide_content").click(
        function () {
            $(this)
                .parents("article.inline_item")
                .addClass("inline_item_hide_content");
        }
    );

    $(".subcollections_list_unhide_all_siblings").on("click", function () {
        $(this)
            .parent("li")
            .addClass("subcollections_list_hide")
            .siblings()
            .removeClass("subcollections_list_hide");
    });

    // dossier subnav
    if ($("#dossier_subnavigation").length) {
        const win = $(window);
        const scrollTargets = $(".subcollection-listing a[name^=sub_]");
        win.on("scroll", function () {
            const viewportTop = win.scrollTop();
            const viewportBottom = viewportTop + win.height();
            let bottomVisible = undefined;
            scrollTargets.each(function (i, e) {
                if ($(e).offset().top < viewportBottom) {
                    bottomVisible = e;
                }
            });
            $("#dossier_subnavigation li").removeClass("sub_visible");
            if (bottomVisible) {
                $(
                    `#dossier_subnavigation a[href='#${$(bottomVisible).attr(
                        "name"
                    )}']`
                )
                    .parent()
                    .addClass("sub_visible");
            }
        });
    }
    document.querySelectorAll(".detect_sticky").forEach((sticky) => {
        new StickyEventListener(sticky);
        sticky.addEventListener("sticky", (evt) => {
            sticky.classList.toggle("stuck", evt.detail.stuck);
        });
    });

    $(".contact_us_offices .card_affiliate").on("click", "header", (evt) => {
        const isActive = $(evt.currentTarget)
            .parent(".card_affiliate")
            .hasClass("active");
        if (isActive) {
            // simply remove the active
            $(evt.currentTarget)
                .parent(".card_affiliate")
                .removeClass("active");
        } else {
            // add the active
            $(evt.currentTarget).parent(".card_affiliate").addClass("active");
            // and remove the active from sibling cards
            $(evt.currentTarget)
                .parent(".card_affiliate")
                .siblings(".card_affiliate")
                .removeClass("active");
        }
    });
    $(".contact_us_offices .card_affiliate:first").addClass("active");

    $(".subscribe-carousel").each(($subCar) => {
        const $form = $(".subscribe-carousel-form form", $subCar);
        const panels = $(".subscribe-carousel > div", $subCar);
        $(".subscribe-carousel-start", $subCar).on("click", () => {
            panels.removeClass("active");
            $(".subscribe-carousel-form", $subCar).addClass("active");
        });
        $form.submit((evt) => {
            // return;
            // let isValid = true;
            // $("input[required]").each((req) => {
            //     if (!$(req).val()) {
            //         $(req).addClass("required");
            //         isValid = false;
            //     } else {
            //         $(req).removeClass("required");
            //     }
            // });
            const data = {};
            $form
                .serializeArray()
                .forEach(({ name, value }) => (data[name] = value));
            // if (!isValid) {
            //     // required fields missing
            //     evt.preventDefault();
            //     return;
            // }
            $("button[type=submit]", $subCar).prop("disabled", true);
            $.post($form.attr("action"), data)
                .always(() => {
                    $("button[type=submit]", $subCar).prop("disabled", false);
                    panels.removeClass("active");
                })
                .done((data, status, xhr) => {
                    $(".subscribe-carousel-result-success", $subCar).addClass(
                        "active"
                    );
                })
                .fail((xhr, status, err) => {
                    console.warn(xhr, status, err, this);
                    $(".subscribe-carousel-result-success", $subCar).addClass(
                        "active"
                    );
                    // $(".subscribe-carousel-result-error", $subCar).addClass(
                    //     "active"
                    // );
                });
            evt.preventDefault();
        });
        $(".subscribe-carousel-result-error button", $subCar).on(
            "click",
            () => {
                panels.removeClass("active");
                $(".subscribe-carousel-form", $subCar).addClass("active");
            }
        );
    });
});
