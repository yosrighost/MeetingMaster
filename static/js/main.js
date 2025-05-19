// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 200);
    });

    // Handle mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarMenu = document.querySelector('#navbarNav');
            navbarMenu.classList.toggle('show');
        });
    }

    // Form validation for the order form
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Get form elements
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const orderItems = document.querySelectorAll('input[name="order_items"]:checked');
            
            // Reset error messages
            document.querySelectorAll('.invalid-feedback').forEach(el => {
                el.style.display = 'none';
            });
            
            // Validate name
            if (!name.value.trim()) {
                document.getElementById('nameError').style.display = 'block';
                name.classList.add('is-invalid');
                isValid = false;
            } else {
                name.classList.remove('is-invalid');
                name.classList.add('is-valid');
            }
            
            // Validate phone
            if (!phone.value.trim()) {
                document.getElementById('phoneError').style.display = 'block';
                phone.classList.add('is-invalid');
                isValid = false;
            } else {
                phone.classList.remove('is-invalid');
                phone.classList.add('is-valid');
            }
            
            // Validate if at least one menu item is selected
            if (orderItems.length === 0) {
                document.getElementById('itemsError').style.display = 'block';
                isValid = false;
            }
            
            // Prevent form submission if validation fails
            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    // Calculate order total on the order page
    const calculateTotal = function() {
        const orderItems = document.querySelectorAll('input[name="order_items"]:checked');
        let total = 0;
        
        orderItems.forEach(item => {
            const price = parseFloat(item.dataset.price);
            if (!isNaN(price)) {
                total += price;
            }
        });
        
        const totalElement = document.getElementById('orderTotal');
        if (totalElement) {
            totalElement.textContent = total.toFixed(2) + ' TND';
        }
    };
    
    // Add event listeners to order checkboxes
    const orderCheckboxes = document.querySelectorAll('input[name="order_items"]');
    orderCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
    
    // Initial calculation
    calculateTotal();
    
    // Add image gallery hover effects
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
