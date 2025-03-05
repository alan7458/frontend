$(document).ready(function () {
    const quotes = [
        "* maybe try pressing <b>enable ebsprite.js</b> before trying to configure the layers.",
        "* try the themes button. first of it's kind.",
        "* message bmp7458 on discord and recommend some new useless features.",
        "* im running out of quote ideas.",
        "* it's a beautiful day outside.",
        "* menu coming soon."
    ];

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

    $("body").append(`<img id="ut-character" src="./sans_overworld.png" alt="sans">`);
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
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            showTextBox(randomQuote);
        }
        $("#ut-speech-bubble").remove();
    });
    
});
