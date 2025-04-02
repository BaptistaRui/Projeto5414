// This file contains JavaScript code for the website. 
// Add interactivity and dynamic behavior below.

document.addEventListener('DOMContentLoaded', function() {
    // Example: Add a click event to a button with the ID 'myButton'
    const myButton = document.getElementById('myButton');
    if (myButton) {
        myButton.addEventListener('click', function() {
            alert('Button clicked!');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            console.log('Form submitted:', formData);
            // Add your form submission logic here
            alert('Thank you for your message!');
            contactForm.reset();
        });
    }
});