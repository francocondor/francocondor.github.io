
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
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