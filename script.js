
// Search Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const foodCards = document.querySelectorAll(".food-card");
const categoryButtons = document.querySelectorAll(".category-btn");
const noResults = document.getElementById("noResults");

let selectedCategory = "All";

// Search and Category Filtering
function filterFoods() {

    const searchText = searchInput.value.toLowerCase();
    let visibleCount = 0;

    foodCards.forEach(card => {

        const name = card.querySelector("h3")
                        .textContent.toLowerCase();

        const category = card.dataset.category;

        const description = card.querySelector("p")
                                .textContent.toLowerCase();

        const matchesSearch =
            name.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            selectedCategory === category;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleCount !== 0;
}

searchBtn.addEventListener("click", filterFoods);
searchInput.addEventListener("input", filterFoods);

// Category Filtering
categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterFoods();
    });
});

// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// Shopping Cart
let cart = [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Add Food to Cart
document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item =>
            item.name === name
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

    });

});

// Display Cart
function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        const name = document.createElement("span");
        name.textContent =
            `${item.name} × ${item.quantity}`;

        const price = document.createElement("strong");
        price.textContent =
            `₹${item.price * item.quantity}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", () => {
            removeItem(index);
        });

        div.append(name, price, removeBtn);

        cartItems.appendChild(div);

    });

    cartTotal.textContent = total;

}

// Remove Item
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

// Checkout
document.getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert(
            "Order placed successfully! " +
            "This is a frontend demo. No real payment was made."
        );

        cart = [];
        updateCart();

    });

// Login and Register Modal
const authModal = document.getElementById("authModal");
const modalTitle = document.getElementById("modalTitle");
const nameField = document.getElementById("nameField");
const authForm = document.getElementById("authForm");
const modalMessage = document.getElementById("modalMessage");

function openModal(type) {

    authModal.style.display = "flex";

    modalTitle.textContent = type;

    nameField.hidden = type !== "Register";
    nameField.required = type === "Register";

    authForm.reset();

    modalMessage.textContent = "";

}

function closeModal() {
    authModal.style.display = "none";
}

// Form Submission
authForm.addEventListener("submit", function(event) {

    event.preventDefault();

    modalMessage.textContent =
        "Form submitted! Backend authentication is not connected.";

    modalMessage.style.color = "green";

});

// Close Modal Outside Click
authModal.addEventListener("click", function(event) {

    if (event.target === authModal) {
        closeModal();
    }

});

// Initial Cart
updateCart();
