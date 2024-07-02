document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Update the cart count and cart items on page load
    if (cartCountElement) {
        updateCartCount();
    }
    if (cartItemsElement && cartTotalElement) {
        updateCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            const product = { id: productId, name: productName, price: productPrice };

            addToCart(product);
        });
    });

    function addToCart(product) {
        cart.push(product);
        saveCart();
        updateCartCount();
        if (cartItemsElement && cartTotalElement) {
            updateCart();
        }
    }

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ₹${product.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(index);
            });

            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);

            total += product.price;
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        if (cartItemsElement && cartTotalElement) {
            updateCart();
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
