window.onload = function() {
    alert("Welcome to my personal website!");
};

// 1. Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Get target section ID
        const targetSection = document.getElementById(targetId);
        
        // Smooth scroll to the target section
        window.scrollTo({
            top: targetSection.offsetTop - 60, // Adjust for fixed header
            behavior: 'smooth'
        });
    });
});

// 2. Form Validation for Contact Form
const contactForm = document.querySelector('form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission for validation
    
    // Clear previous error messages
    clearErrors();
    
    // Simple validation checks
    let isValid = true;

    if (nameInput.value.trim() === "") {
        isValid = false;
        showError(nameInput, "Name is required.");
    }
    if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
        isValid = false;
        showError(emailInput, "Please enter a valid email.");
    }
    if (messageInput.value.trim() === "") {
        isValid = false;
        showError(messageInput, "Message cannot be empty.");
    }

    if (isValid) {
        alert("Form submitted successfully!");
        contactForm.reset(); // Reset form fields
    }
});

// Function to show error message
function showError(input, message) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.innerText = message;
    input.parentElement.appendChild(error);
}

// Function to clear error messages
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
}

// Simple email validation function
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// 3. Portfolio Modal (Click on Project for Details)
const portfolioItems = document.querySelectorAll('#portfolio > div');
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

portfolioItems.forEach(item => {
    item.addEventListener('click', function () {
        const title = item.querySelector('h3').innerText;
        const description = item.querySelector('p').innerText;
        const imgSrc = item.querySelector('img').src;

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${imgSrc}" alt="${title}">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
        modal.style.display = "block";
    });
});

// Close the modal when clicking on the close button
const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });
}

// Close the modal if clicked outside of the modal content
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
