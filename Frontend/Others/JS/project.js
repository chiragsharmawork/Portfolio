/* =================== Projects Filter & Modal =================== */

const projects = [
    {
        img: 'assets/projects/project1.png',
        title: 'Tute Dude Redesign',
        desc: 'Full-stack redesign of Tute Dude with improved user experience.',
        category: 'fullstack',
        link: '#'
    },
    {
        img: 'assets/projects/project2.png',
        title: 'Netflix Clone',
        desc: 'React based modern UI with dynamic content rendering.',
        category: 'frontend',
        link: '#'
    },
    {
        img: 'assets/projects/project3.png',
        title: 'Hotel Booking System',
        desc: 'Node.js + Express backend project with booking logic.',
        category: 'backend',
        link: '#'
    }
];

const grid = document.getElementById('projectsGrid');
const buttons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const closeModal = document.getElementById('closeModal');

function displayProjects(filter = 'all') {
    grid.innerHTML = '';

    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
            <img src="${project.img}" alt="${project.title}">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-buttons">
                    <a href="${project.link}" target="_blank" class="btn-primary">Live</a>
                    <button class="btn-outline view-btn">Details</button>
                </div>
            </div>
        `;

        card.querySelector('.view-btn').addEventListener('click', () => {
            modalTitle.textContent = project.title;
            modalDesc.textContent = project.desc;
            modalLink.href = project.link;
            modal.style.display = 'flex';
        });

        grid.appendChild(card);
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayProjects(button.dataset.filter);
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

displayProjects();