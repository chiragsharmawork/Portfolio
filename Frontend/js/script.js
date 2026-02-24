
/* ============================================================Header==================================================================*/
/* =================== Hamburger Menu =================== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
});

// Close menu on link click (mobile UX)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
    });
});

/* =================== Smooth Scroll Active Links =================== */
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const sectionTop = sec.offsetTop;
        if (scrollY >= sectionTop - 100) current = sec.getAttribute('id');
    });
    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) a.classList.add('active');
    });
});

/*==============================================================OTHERS==================================================================*/

/* =================== Preloader =================== */
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const typedPreloader = document.getElementById("typed-preloader");
    const progressFill = document.querySelector(".progress-fill");
    const glowName = document.querySelector(".glow-name");
    // Detect if it's a refresh
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    // Check Internet on load
    if (!navigator.onLine) {
        showError("⚠️ Error 404: No Internet Connection");
        return;
    }
    if (isReload) {
        // Quick spinner on refresh
        document.querySelector(".progress-bar").remove();
        glowName.remove();
        typedPreloader.innerHTML =
            `<div class="spinner"></div> 
        <p style="margin-top:20px;color:#38bdf8;">Loading...</p>`;
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 500);
    } else {
        // First-time visitor → Fancy Preloader
        let text = "Welcome to Portfolio";
        let index = 0;

        function typeEffect() {
            if (index < text.length) {
                typedPreloader.textContent += text.charAt(index);
                index++;
                setTimeout(typeEffect, 70);
            } else {
                progressFill.style.width = "100%";
                setTimeout(() => {
                    preloader.classList.add("hidden");
                }, 2000);
            }
        }
        typeEffect();
    }
});

// Always scroll to top (Home) on refresh
window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
});

// If user goes offline during loading
window.addEventListener("offline", () => {
    showError("⚠️ Error 404: Connection Lost");
});

// Show error message function
function showError(message) {
    const preloader = document.getElementById("preloader");
    const typedPreloader = document.getElementById("typed-preloader");
    const glowName = document.querySelector(".glow-name");
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) progressBar.remove();
    if (glowName) glowName.remove();
    typedPreloader.innerHTML = `<p style="color:red;font-size:18px;">${message}</p>`;
}


// /* =================== Back to Top Button =================== */
// const backToTop = document.getElementById('backToTop');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 100) backToTop.style.display = 'block';
//     else backToTop.style.display = 'none';
// });
// backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

/* =================== Scroll Animations =================== */
const sectionsToAnimate = document.querySelectorAll('.education-timeline, .skills-wrapper, .contact-wrapper');
window.addEventListener('scroll', () => {
    sectionsToAnimate.forEach(sec => {
        const sectionPos = sec.getBoundingClientRect().top;
        const screenPos = window.innerHeight;
        if (sectionPos < screenPos - 100) sec.classList.add('visible');
    });
});


/* =================== Floating Socials Visibility =================== */
const floatingSocial = document.getElementById('floatingSocial');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { floatingSocial.classList.add('show'); }
    else { floatingSocial.classList.remove('show'); }
});

/* =================== Hire Me Pop Up Button =================== */

const hirePopup = document.getElementById('hirePopup');
const closeBtn = document.querySelector('.close-btn');
const countdownEl = document.getElementById('countdown');
const hireBtn = document.querySelector('.hire-btn');
let countdown = 15;
let countdownInterval;

// Function to start countdown
function startCountdown() {
    countdownEl.textContent = countdown;
    hireBtn.classList.add('animate'); // start animation
    countdownInterval = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            hirePopup.style.display = 'none';
            hireBtn.classList.remove('animate'); // stop animation
        }
    }, 1000);
}

// Show popup after 1 minute
setTimeout(() => {
    hirePopup.style.display = 'flex';
    countdown = 15; // reset countdown
    startCountdown();
}, 20000);

// Close on X click
closeBtn.addEventListener('click', () => {
    hirePopup.style.display = 'none';
    clearInterval(countdownInterval);
    hireBtn.classList.remove('animate');
});

// If user clicks "Hire Me" button, open contact section and close popup
hireBtn.addEventListener('click', () => {
    hirePopup.style.display = 'none';
    clearInterval(countdownInterval);
    hireBtn.classList.remove('animate');
});
