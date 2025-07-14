document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Función para cerrar el menú móvil
function closeMenuMobile() {
    mobileMenu.classList.add('hidden');
}
closeMobileMenu.addEventListener('click', closeMenuMobile);

// Cerrar menú al hacer click en cualquier link de sección del menú mobile
const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenuMobile);
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
    darkIcon.classList.add('hidden');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
    lightIcon.classList.add('hidden');
}

themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    }
});

// Navigation active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Terminal typing effect for home section
const terminalContent = document.getElementById('terminal-content');

// Define the terminal lines with proper formatting
const terminalLines = [
    { type: 'command', text: 'whoami' },
    { type: 'output', text: 'Backend Developer' },
    { type: 'command', text: 'ls -la skills/' },
    { type: 'output', text: 'PHP  Java  JavaScript  Python' },
    { type: 'command', text: 'echo $STATUS' },
    { type: 'highlight', text: 'Ready to discuss your next project!' },
    { type: 'cursor', text: '' }
];

// Function to create a terminal line with proper styling
function createTerminalLine(lineData) {
    const lineElement = document.createElement('div');
    lineElement.className = 'terminal-line';

    if (lineData.type === 'command') {
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = 'franco@backend-dev:~$ ';

        const command = document.createElement('span');
        command.className = 'terminal-output';
        command.textContent = lineData.text;

        lineElement.appendChild(prompt);
        lineElement.appendChild(command);
    }
    else if (lineData.type === 'highlight') {
        const output = document.createElement('span');
        output.className = 'terminal-highlight';
        output.textContent = lineData.text;
        lineElement.appendChild(output);
    }
    else if (lineData.type === 'cursor') {
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = 'franco@backend-dev:~$ ';

        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';

        lineElement.appendChild(prompt);
        lineElement.appendChild(cursor);
    }
    else {
        const output = document.createElement('span');
        output.className = 'terminal-output';
        output.textContent = lineData.text;
        lineElement.appendChild(output);
    }

    return lineElement;
}

// Function to animate typing for a specific line
function typeWriter(element, text, i, cb) {
    if (i < text.length) {
        if (element.childNodes.length > 0 && element.lastChild.nodeType === Node.TEXT_NODE) {
            element.lastChild.nodeValue += text.charAt(i);
        } else {
            element.appendChild(document.createTextNode(text.charAt(i)));
        }
        i++;
        setTimeout(() => typeWriter(element, text, i, cb), 20);
    } else if (cb) {
        setTimeout(cb, 300);
    }
}

// Function to animate the entire terminal
function animateTerminal() {
    terminalContent.innerHTML = '';
    let currentLineIndex = 0;

    function processNextLine() {
        if (currentLineIndex >= terminalLines.length) return;

        const lineData = terminalLines[currentLineIndex];
        const lineElement = createTerminalLine(lineData);

        // For command and highlight types, we want to animate the typing
        if (lineData.type === 'command') {
            const commandSpan = lineElement.querySelector('.terminal-output');
            commandSpan.textContent = '';
            terminalContent.appendChild(lineElement);

            typeWriter(commandSpan, lineData.text, 0, () => {
                currentLineIndex++;
                setTimeout(processNextLine, 200);
            });
        }
        else if (lineData.type === 'highlight') {
            const highlightSpan = lineElement.querySelector('.terminal-highlight');
            highlightSpan.textContent = '';
            terminalContent.appendChild(lineElement);

            typeWriter(highlightSpan, lineData.text, 0, () => {
                currentLineIndex++;
                setTimeout(processNextLine, 200);
            });
        }
        else {
            // For output and cursor, just append them
            terminalContent.appendChild(lineElement);
            currentLineIndex++;
            setTimeout(processNextLine, 200);
        }
    }

    // Start the animation
    processNextLine();
}

// Start the animation when the page loads
window.addEventListener('load', animateTerminal);

// Form validation
const contactForm = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Create error message elements
const nameError = document.createElement('span');
nameError.className = 'text-red-500 text-sm mt-1 hidden';
nameInput.parentNode.insertBefore(nameError, nameInput.nextSibling);

const emailError = document.createElement('span');
emailError.className = 'text-red-500 text-sm mt-1 hidden';
emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

const messageError = document.createElement('span');
messageError.className = 'text-red-500 text-sm mt-1 hidden';
messageInput.parentNode.insertBefore(messageError, messageInput.nextSibling);

contactForm.addEventListener('submit', function (event) {
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        nameError.classList.remove('hidden');
        nameInput.classList.add('border-red-500');
        isValid = false;
    } else {
        nameError.classList.add('hidden');
        nameInput.classList.remove('border-red-500');
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
    } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) { // Simple email format check
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
    } else {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        messageError.classList.remove('hidden');
        messageInput.classList.add('border-red-500');
        isValid = false;
    } else {
        messageError.classList.add('hidden');
        messageInput.classList.remove('border-red-500');
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

// Devuelve el SVG original según el nombre de imagen del proyecto
function getProjectSVG(imageName) {
    switch (imageName) {
        case 'svg-cms':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0h-6m6 0h-2.5M19 11v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0h-6m6 0h-2.5" />
                            </svg>`;
        case 'svg-b2b':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>`;
        case 'svg-spa':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2m0 0V5h6M9 7h6" />
                            </svg>`;
        case 'svg-microservices':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>`;
        case 'svg-portal':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>`;
        case 'svg-booking':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>`;
        case 'svg-logistics':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>`;
        case 'svg-streaming':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>`;
        case 'svg-auth':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>`;
        case 'svg-automation':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-cyan" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>`;
        default:
            // SVG genérico si no hay coincidencia
            return `<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24 text-cyan' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10' stroke-width='2' /></svg>`;
    }
}

// Renderizado dinámico de proyectos en el slider
async function renderProjectsSlider() {
    const response = await fetch('./src/projects.json');
    const projects = await response.json();
    const wrapper = document.querySelector('.swiper-wrapper');
    wrapper.innerHTML = '';

    projects.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide project-card bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg';

        // Imagen o SVG (puedes personalizar esto según tu preferencia)
        const imgDiv = document.createElement('div');
        imgDiv.className = 'h-48 bg-slate-200 dark:bg-slate-700 flex items-center justify-center';
        imgDiv.innerHTML = getProjectSVG(project.image);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'p-6 flex flex-col h-full';

        const title = document.createElement('h3');
        title.className = 'text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100';
        title.textContent = project.title;

        const desc = document.createElement('p');
        desc.className = 'text-slate-600 dark:text-slate-400 mb-4';
        desc.textContent = project.description;

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'flex flex-wrap gap-2 mb-4';
        project.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'px-3 py-1 bg-cyan/10 text-cyan text-xs rounded-full';
            tagSpan.textContent = tag;
            tagsDiv.appendChild(tagSpan);
        });

        const linksDiv = document.createElement('div');
        linksDiv.className = 'flex space-x-4';
        const repoLink = document.createElement('a');
        repoLink.href = project.repo;
        repoLink.className = 'text-cyan hover:text-blue transition-colors';
        repoLink.innerHTML = `<i class='fab fa-github mr-1'></i> ${project.repoLabel}`;
        linksDiv.appendChild(repoLink);

        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);
        contentDiv.appendChild(tagsDiv);
        contentDiv.appendChild(linksDiv);

        slide.appendChild(imgDiv);
        slide.appendChild(contentDiv);
        wrapper.appendChild(slide);
    });

    // Re-inicializar Swiper para que detecte los nuevos slides
    if (window.swiper) {
        window.swiper.update();
    }


    const swiper = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 32,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
}

window.addEventListener('DOMContentLoaded', renderProjectsSlider);