// Interactive Gallery Lightbox & Filter System
document.addEventListener("DOMContentLoaded", () => {
    const photoCards = document.querySelectorAll(".photo-card");
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeLightbox = document.getElementById("closeLightbox");
    const filterBtns = document.querySelectorAll(".filter-btn");

    // Click on photo card to view in Lightbox
    photoCards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            const caption = card.querySelector("h3");

            if (lightboxImg && img) lightboxImg.src = img.src;
            if (lightboxCaption && caption) lightboxCaption.innerText = caption.innerText;
            if (lightboxModal) lightboxModal.classList.add("active");

            if (window.triggerFireworks) {
                const rect = card.getBoundingClientRect();
                window.triggerFireworks(rect.left + rect.width / 2, rect.top);
            }
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener("click", () => {
            if (lightboxModal) lightboxModal.classList.remove("active");
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove("active");
            }
        });
    }

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            photoCards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.style.display = "block";
                    setTimeout(() => card.style.opacity = "1", 50);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => card.style.display = "none", 300);
                }
            });
        });
    });
});
