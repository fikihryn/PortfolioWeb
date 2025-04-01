document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.createElement("button");
    menuToggle.classList.add("hamburger");
    menuToggle.innerHTML = "&#9776;"; // Icon hamburger

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    
    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });

    // Menambahkan tombol hamburger hanya jika layar kecil
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            if (!header.contains(menuToggle)) {
                header.insertBefore(menuToggle, header.firstChild);
            }
        } else {
            if (header.contains(menuToggle)) {
                header.removeChild(menuToggle);
                nav.classList.remove("active");
            }
        }
    }
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});
