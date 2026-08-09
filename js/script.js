// Countdown Timer targeting August 10 & Gift Surprise Modal
document.addEventListener("DOMContentLoaded", () => {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function getTargetDate() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let target = new Date(`August 10, ${currentYear} 00:00:00`);
        
        if (now > target && (now.getTime() - target.getTime() > 24 * 60 * 60 * 1000)) {
            target = new Date(`August 10, ${currentYear + 1} 00:00:00`);
        }
        return target;
    }

    const targetDate = getTargetDate();

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60) ) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Gift Box Interaction with Modal & Fireworks
    const giftBox = document.getElementById("giftBox");
    const giftModal = document.getElementById("giftModal");
    const closeGiftModal = document.getElementById("closeGiftModal");

    if (giftBox) {
        giftBox.addEventListener("click", (e) => {
            giftBox.classList.add("open");

            if (window.triggerFireworks) {
                const rect = giftBox.getBoundingClientRect();
                window.triggerFireworks(rect.left + rect.width / 2, rect.top);
            }

            setTimeout(() => {
                if (giftModal) giftModal.classList.add("active");
            }, 400);
        });
    }

    if (closeGiftModal && giftModal) {
        closeGiftModal.addEventListener("click", () => {
            giftModal.classList.remove("active");
        });

        giftModal.addEventListener("click", (e) => {
            if (e.target === giftModal) {
                giftModal.classList.remove("active");
            }
        });
    }
});
