// Hämta varukorgen från localStorage eller skapa en tom array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, imageUrl) {
    const product = {
        name: name,
        price: price,
        image: imageUrl,
        quantity: 1
    };
    // Kolla om produkten redan finns i varukorgen
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    // Spara varukorgen i localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Skapa och visa notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Produkt tillagd i varukorgen!';
    document.body.appendChild(notification);
    
    // Ta bort notifikationen efter animationen
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Funktion för att visa varukorgens innehåll
function displayCart() {
    const cartContainer = document.getElementById('varukorg-innehåll');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<h2>Varukorgen är tom</h2>';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    
     // Create header with total and clear cart button
     const headerElement = document.createElement('div');
     headerElement.className = 'cart-header';
     headerElement.innerHTML = `
         <h3>Totalt: ${total}kr</h3>
         <div class="cart-buttons">
             <button onclick="showConfirmButtons(this)" class="clear-cart-btn">Töm varukorg</button>
             <div class="confirm-buttons hidden">
                 <button onclick="confirmClearCart(true, this)">Ja</button>
                 <button onclick="confirmClearCart(false, this)">Nej</button>
             </div>
         </div>
     `;
     cartContainer.appendChild(headerElement);

    // Then append all products
    cart.forEach(item => {
        const productElement = document.createElement('article');
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Antal: ${item.quantity}</p>
            <p>Pris: ${item.price}kr</p>
            <button onclick="removeFromCart('${item.name}')">Ta bort</button>
        `;
        cartContainer.appendChild(productElement);
    });
}

// Funktion för att ta bort produkt från varukorgen
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function showConfirmButtons(button) {
    const cartButtons = button.closest('.cart-buttons');
    button.style.display = 'none';
    cartButtons.querySelector('.confirm-buttons').classList.remove('hidden');
}

function confirmClearCart(confirmed, buttonElement) {
    if (confirmed) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    } else {
        const cartButtons = buttonElement.closest('.cart-buttons');
        cartButtons.querySelector('.clear-cart-btn').style.display = 'block';
        cartButtons.querySelector('.confirm-buttons').classList.add('hidden');
    }
}

// Kör displayCart när sidan laddas
document.addEventListener('DOMContentLoaded', displayCart());