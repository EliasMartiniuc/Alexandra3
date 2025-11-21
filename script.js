/* Product Data (Placeholder - will be expanded) */
const products = [
    {
        id: 1,
        name: "Aloe Vera Gel",
        price: 28.50,
        image: "images/aloe-vera-gel.jpg",
        category: "Drinks"
    },
    {
        id: 2,
        name: "Forever Bright Toothgel",
        price: 9.50,
        image: "images/toothgel.jpg",
        category: "Personal Care"
    },
    {
        id: 3,
        name: "Aloe Propolis Creme",
        price: 22.75,
        image: "images/propolis-creme.jpg",
        category: "Skincare"
    },
    {
        id: 4,
        name: "Argi+",
        price: 65.00,
        image: "images/argi-plus.jpg",
        category: "Nutrition"
    },
    {
        id: 5,
        name: "Aloe Lips",
        price: 4.15,
        image: "images/aloe-lips.jpg",
        category: "Personal Care"
    },
    {
        id: 6,
        name: "Forever Bee Pollen",
        price: 18.20,
        image: "images/bee-pollen.jpg",
        category: "Bee Products"
    }
];

/* Cart Logic */
let cart = JSON.parse(localStorage.getItem('foreverCart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    // Add to document
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300); // Wait for transition to finish
    }, 3000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart(); // If on cart page
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCart(); // If on cart page
        }
    }
}

function saveCart() {
    localStorage.setItem('foreverCart', JSON.stringify(cart));
}

/* UI Interactions */
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Scroll Header Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
