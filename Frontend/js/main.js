/* ===============================================================Main==================================================================*/

/* =================== Hero Typing Animation =================== */
const typedText = document.getElementById('typed-text');
const words = ["Full Stack Developer.", "Web Enthusiast.", "AI Enthusiast.", "Problem Solver"];
let wordIndex = 0, charIndex = 0;
function type() {
    if (wordIndex >= words.length) wordIndex = 0;
    if (charIndex < words[wordIndex].length) {
        typedText.textContent += words[wordIndex][charIndex];
        charIndex++;
        setTimeout(type, 100);
    } else { setTimeout(erase, 1000); }
}
function erase() {
    if (charIndex > 0) {
        typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    } else { wordIndex++; setTimeout(type, 500); }
}
type();

// Scroll Animation
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
    threshold: 0.3
};

const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("show");
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Counter Animation
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    counter.innerText = "0";

    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;

        const increment = target / 100;

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target + "+";
        }
    };

    updateCounter();
});


/* =================== Skills Animation =================== */

const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');
function animateSkills() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;
    if (sectionPos < screenPos - 100) {
        skillBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress');
        });
        window.removeEventListener('scroll', animateSkills);
    }
}
window.addEventListener('scroll', animateSkills);


/* =================== Contact Form with Validation & Toast =================== */

const contactForm = document.getElementById('contactForm');

function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showToast("Please fill in all fields!");
        return;
    }

    if (!validateEmail(email)) {
        showToast("Please enter a valid email!");
        return;
    }

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
            "form-name": "contact",
            name: name,
            email: email,
            message: message
        })
    })
        .then(() => {
            showToast("Your message has been sent successfully!");
            contactForm.reset();
        })
        .catch(() => {
            showToast("Something went wrong. Please try again.");
        });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
}