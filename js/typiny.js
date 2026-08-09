const envelope = document.getElementById("envelope");

const nextButton = document.getElementById("nextButton");

const text = `

Happy Birthday ❤️

You are one of the most special people in my life.

Thank you for bringing happiness,
love,
kindness,
and beautiful memories into every moment.

May your smile always stay bright.

May every dream come true.

May every day bring you success.

Enjoy your special day.

Happy Birthday once again.

❤️ Forever ❤️

`;

let i = 0;

const typing = document.getElementById("typingText");

envelope.onclick = function () {

    envelope.classList.add("open");

    setTimeout(typeWriter, 800);

}

function typeWriter() {

    if (i < text.length) {

        typing.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter, 35);

    }

    else {

        nextButton.style.display = "inline-block";

    }

}