// main.js — students will add JavaScript here as features are built

// ------------------------------------------------------------------ //
// Video modal ("See how it works" on the landing page)                //
// ------------------------------------------------------------------ //

(function () {
    const modal = document.querySelector("[data-video-modal]");
    if (!modal) return;

    const iframe = modal.querySelector("[data-video-iframe]");
    let lastFocused = null;

    function openModal() {
        lastFocused = document.activeElement;
        iframe.src = iframe.dataset.src;          // setting src starts playback
        modal.hidden = false;
        document.body.classList.add("modal-open");
        modal.querySelector(".video-modal-close").focus();
    }

    function closeModal() {
        iframe.src = "";                          // clearing src stops playback
        modal.hidden = true;
        document.body.classList.remove("modal-open");
        if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll("[data-video-open]").forEach(function (btn) {
        btn.addEventListener("click", openModal);
    });

    modal.querySelectorAll("[data-video-close]").forEach(function (el) {
        el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.hidden) closeModal();
    });
})();
