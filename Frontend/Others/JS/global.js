/* =================== Toggle-Btn =================== */
document.querySelectorAll(".question").forEach((question) => {
    question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector(".answer");
        const toggleBtn = question.querySelector(".toggle-btn");

        if (faqItem.classList.contains("active")) {
            // Collapse
            answer.style.maxHeight = answer.scrollHeight + "px";
            setTimeout(() => {
                answer.style.maxHeight = "0";
            }, 10);
            faqItem.classList.remove("active");
            toggleBtn.textContent = "+";
        } else {
            // Expand
            faqItem.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
            toggleBtn.textContent = "–";
        }
    });
});
/* =================== Contact Form with Validation & Toast =================== */


// F&Q Form

const faqForm = document.getElementById('faqForm');

faqForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('faq-name').value.trim();
    const email = document.getElementById('faq-email').value.trim();
    const message = document.getElementById('faq-message').value.trim();

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
            "form-name": "faq",
            name,
            email,
            message
        })
    })
        .then(() => {
            showToast("Your question has been submitted!");
            faqForm.reset();
        })
        .catch(() => {
            showToast("Something went wrong. Please try again.");
        });
});


// HIRE ME FORM 

const hireForm = document.getElementById('hireForm');

function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

hireForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('hire-name').value.trim();
    const email = document.getElementById('hire-email').value.trim();
    const projectType = document.getElementById('project-type').value;
    const budget = document.getElementById('budget').value;
    const timeline = document.getElementById('timeline').value;
    const message = document.getElementById('hire-message').value.trim();

    if (!name || !email || !projectType || !budget || !timeline || !message) {
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
            "form-name": "hire-me",
            name,
            email,
            project_type: projectType,
            budget,
            timeline,
            message
        })
    })
        .then(() => {
            showToast("Your inquiry has been submitted successfully!");
            hireForm.reset();
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
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

