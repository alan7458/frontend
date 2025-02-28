$(document).ready(function () {
    $('.buttons').append('<div id="themer-btn" class="ugly-button">Themes</div>');
    $('.buttons').append('<div id="themes" style="display: none;"></div>');

    $(document).on('click', '#themer-btn', function () {
        let button = $(this);
        let config = $('#themes');

        let buttonOffset = button.offset();
        let buttonHeight = button.outerHeight();
        let configHeight = config.outerHeight();
        let configWidth = config.outerWidth();
        let buttonWidth = button.outerWidth();

        config.css({
            "position": "absolute",
            "top": buttonOffset.top - config.outerHeight() - 10,
            "left": buttonOffset.left + (buttonWidth / 2) - (configWidth / 2),
        });

        config.stop().fadeToggle("fast");
    });

    const styles = {
        "BMP Glass": "screen.css",
        "MPP.Net": "mppnet.css",
        "Fire MPP": "firempp.css",
        "MPP Classic": "mppclassic.css"
    };

    let $container = $("#themes");
    $.each(styles, function (name, file) {
        let $button = $('<div style="margin-top: 4px; margin-bottom: 4px;" class="ugly-button"></div>').text(name).data("css-file", file);
        $container.append($button);
    });

    function applyCSS(file) {
        let $linkTag = $("#dynamic-style");
        if ($linkTag.length === 0) {
            $linkTag = $('<link id="dynamic-style" rel="stylesheet" type="text/css">').appendTo('head');
        }
        $linkTag.attr("href", file);
    }

    $(document).on("click", "#themes .ugly-button", function () {
        applyCSS($(this).data("css-file"));
    });

    applyCSS(styles["Default"]);
});
