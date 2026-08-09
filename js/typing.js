document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.getElementById("envelope");
    const waxSeal = document.getElementById("waxSeal");
    const letterCard = document.getElementById("letterCard");
    const typingElement = document.getElementById("typingText");
    const cursor = document.getElementById("cursor");
    const nextButton = document.getElementById("nextButton");

    const messageText = `Happy birthday d pondati 😘.. Intha day full a na una happy a pathupan 😊 ethuku apramum pasama happy  pathupan😊💖..ne en life la vanthathuku aprm tha en life change agichi ipo tha na happy eruka,because of u only 🥺.. ne ena vittutu poidatha yapaum seriya ✨💝..ne ena amma Mari pathukura .. na yathu ketalum vangi thara kasu ilananlum amount yaru kitayachi ketu vangi thara na kasta pada kudathunu 🥺🥺.. so ne en life la kedacaha periya gift 🎁💝. Na una yapum miss panida matenn.. yaruku intha Mari oru ponu kedaika matanga, en a Vera ponaa eruntha yanaku athu Venum ethu venumnu torcher panuvanga,,ana ne apdi Ila d thanga pulla yanku ena venumo atha tha vangi thara 🥺🥹.. ne ena vittutu yapaum poidatha seriya na yantha thapu panalum manichidu na kovathula tha pesuvanea thavara nana pesa maten😟.. anyways 
HAPPY BIRTHDAY D PONDATIIIII 💋💋💋💋`;

    let index = 0;
    let isOpen = false;

    envelope.addEventListener("click", openLetter);
    waxSeal.addEventListener("click", openLetter);

    function openLetter(e) {
        if (e) e.stopPropagation();
        if (isOpen) return;
        isOpen = true;

        // Animate Wax Seal and Envelope
        waxSeal.classList.add("break");
        envelope.classList.add("open");

        // Reveal Letter Card after envelope opening animation
        setTimeout(() => {
            letterCard.classList.add("show");
            setTimeout(typeWriter, 400);
        }, 700);
    }

    function typeWriter() {
        if (index < messageText.length) {
            const char = messageText.charAt(index);
            if (char === "\n") {
                typingElement.innerHTML += "<br>";
            } else {
                typingElement.innerHTML += char;
            }
            index++;
            
            // Randomize typing speed for realistic handwriting feel
            const delay = char === "." || char === "!" || char === "💕" ? 250 : Math.random() * 20 + 20;
            setTimeout(typeWriter, delay);
        } else {
            // Typing completed
            if (cursor) cursor.style.display = "none";
            setTimeout(() => {
                if (nextButton) {
                    nextButton.classList.add("visible");
                }
            }, 500);
        }
    }
});
