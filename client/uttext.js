$(document).ready(function () {
    const quotes = [
        "* maybe you should try pressin' <b>enable ebsprite.js</b> before messin' with the layers.",
        "* hey, maybe the themes button is worth a shot. first time for everything.",
        "* got a new idea for ya — message bmp7458 on discord and suggest some features.",
        "* i’m runnin’ outta ideas here.",
        "* it’s a beautiful day outside, huh?",
        "* the menu’s comin’... eventually.",
        "* stop clickin' already.",
        "* do ya really wanna have a bad time?",
        "* if you don’t stop clickin’ me...",
        "* hey, stop.",
        "* i said stop.",
        "* you sure you wanna see me go through the same ol’ JSON array of quotes?",
        "* maybe its your CSS.",
        "* maybe it’s time to touch some grass.",
        "* press the cat button instead. meow.",
        `* what?\nyou think i'm just going to stand there and take it?`,
        "* you’d better watch out.",
        "* if you click me one more time...",
        "* alright. thats it."
    ];

    let currentQuoteIndex = 0;

    function showTextBox(text) {
        if ($("#ut-text-box").length) return;

        const textBox = $(`
            <div id="ut-text-box">
                <div id="ut-text">${text}</div>
            </div>
        `);

        $("body").append(textBox);

        let index = 0;
        const textElement = $("#ut-text");
        const originalText = textElement.text();
        textElement.text("");

        function typeWriter() {
            if (index < originalText.length) {
                textElement.append(originalText.charAt(index));
                index++;
                setTimeout(typeWriter, 40);
            }
        }
        typeWriter();

        textBox.on("click", function () {
            $(this).remove();
        });
    }

    let character = './utsprite/undyne.gif';
    $('body').append(`<img id="utbattle" src="${character}"><!--STOP LOOKING.-->`);

    $("<style>").prop("type", "text/css").html(`
    #utbattle {
        position: absolute;
        alignment: center;
        display: none;
    }
`).appendTo("head");

    function positionAbove(targetId, offset = 10) {
        let target = $(`#${targetId}`);
        if (target.length) {
            let position = target.offset();
            let targetWidth = target.outerWidth();
            let utbattleWidth = $("#utbattle").width();

            $("#utbattle").css({
                left: (position.left + targetWidth / 2 - utbattleWidth / 2) + "px",
                top: (position.top - $("#utbattle").height() - offset) + "px"
            });
        }
    }

    $(window).on("load resize", function () {
        positionAbove("piano");
    });

    $("body").append(`<img id="ut-character" src="./utsprite/sans_overworld.png" alt="sans">`);
    $("body").append(`
        <div id="ut-speech-bubble">
            <div id="ut-speech-text">try and click me a few times.</div>
        </div>
    `)

    $("<style>").prop("type", "text/css").html(`
        @font-face {
            font-family: 'Pixel Comic Sans';
            src: url('sans.ttf') format('truetype');
        }

        #ut-character {
            position: fixed;
            bottom: 150px;
            right: 10px;
            width: 64px;
            cursor: pointer;
            transition: transform 0.1s ease-in-out;
            z-index: 1000;
        }

        #ut-speech-bubble {
            text-shadow: none;
            position: fixed;
            bottom: 160px;
            right: 70px;
            width: 99px;
            height: 61px;
            font-family: 'Pixel Comic Sans', sans-serif;
            font-size: 13px;
            color: black;
            padding-left: 15px;
            padding-top: 15px;
            background: url('./bubble.png') no-repeat center;
            z-index: 1000;
        }
        #ut-speech-text {
            max-width: 80px;
            overflow: hidden;
        }

        #ut-character:active {
            transform: scale(1.1);
        }
        #ut-text-box {
            position: fixed;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            max-width: 400px;
            background: black;
            color: white;
            font-family: 'Pixel Comic Sans', sans-serif;
            line-height: 28px;
            font-size: 20px;
            padding: 20px;
            border: 4px solid white;
            text-align: left;
            box-shadow: 4px 4px white;
            z-index: 1000;
        }
    `).appendTo("head");

    $("#ut-character").on("click", function () {
        const textBox = $("#ut-text-box");

        if (textBox.length) {
            textBox.remove();
        } else {
            if (currentQuoteIndex < quotes.length) {
                showTextBox(quotes[currentQuoteIndex]);
                currentQuoteIndex++;
            } else {
                $(this).css('pointer-events', 'none');
                showTextBox('* see ya.')
                $("#ut-character").animate({
                    top: "-150px",
                    left: "-150px"
                }, 6000, function () {
                    $(this).remove();
                });
                return;
            }
        }
        $("#ut-speech-bubble").remove();
    });
});