document.addEventListener('DOMContentLoaded', function() {
 
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    const hamburgerBtn = document.createElement('div');
    
    hamburgerBtn.classList.add('hamburger-menu');
    hamburgerBtn.innerHTML = `
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    `;
    
  
    header.insertBefore(hamburgerBtn, nav);
    

    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            nav.classList.remove('active');
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @media screen and (max-width: 768px) {
            header {
                padding: 15px 20px;
            }
            
            header button {
                display: none;
            }
            
            .hamburger-menu {
                display: block;
                cursor: pointer;
                z-index: 1001;
            }
            
            .hamburger-menu .bar1,
            .hamburger-menu .bar2,
            .hamburger-menu .bar3 {
                width: 25px;
                height: 3px;
                background-color: white;
                margin: 5px 0;
                transition: 0.4s;
            }
            
            .hamburger-menu.active .bar1 {
                transform: rotate(-45deg) translate(-5px, 6px);
                background-color: #ff6b00;
            }
            
            .hamburger-menu.active .bar2 {
                opacity: 0;
            }
            
            .hamburger-menu.active .bar3 {
                transform: rotate(45deg) translate(-5px, -6px);
                background-color: #ff6b00;
            }
            
            nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background-color: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(10px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: right 0.3s ease;
                z-index: 1000;
            }
            
            nav.active {
                right: 0;
            }
            
            nav ul {
                flex-direction: column;
                gap: 20px;
                text-align: center;
                padding: 0;
            }
            
            nav ul li a {
                font-size: 18px;
                padding: 10px;
                display: block;
            }
            
            /* Add a mobile contact button at the bottom of the menu */
            nav.active::after {
                content: "Kontak Saya";
                display: block;
                margin-top: 30px;
                background-color: transparent;
                color: white;
                border: 1px solid #ff6b00;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            nav.active::after:hover {
                background-color: #ff6b00;
            }
        }
        
        @media screen and (min-width: 769px) {
            .hamburger-menu {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
});
