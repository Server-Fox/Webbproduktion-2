let produkter = {
    data: [
        {
            name: 'Intel Core i9-14900KF',
            catagory: 'cpu',
            image: '/img/index/i9-14900KF.webp',
            price: 4999,
            quantity: 1
        },
        {
            name: 'AMD Ryzen 9 7950X3D',
            catagory: 'cpu',
            image: '/img/produkter/cpu/Ryzen-9-7950X-3D.webp',
            price: 6999,
            quantity: 1
        },
        {
            name: 'Intel Core i5-12600K',
            catagory: 'cpu',
            image: '/img/produkter/cpu/i5-12600K.webp',
            price: 2999,
            quantity: 1
        },
        {
            name: 'AMD Ryzen 5 8600G',
            catagory: 'cpu',
            image: '/img/produkter/cpu/ryzen-5-8600g.webp',
            price: 1999,
            quantity: 1
        },
        {
            name: 'AMD Ryzen 7 9800X3D',
            catagory: 'cpu',
            image: '/img/produkter/cpu/Ryzen-9-7950X-3D.webp',
            price: 5399,
            quantity: 1
        },
        {
            name: 'Nvidia GeForce RTX 4090',
            catagory: 'gpu',
            capasity_vram: 24,
            image: '/img/index/4090.webp',
            price: 27999,
            quantity: 1
        },
        {
            name: 'AMD Radeon RX 7900XT',
            catagory: 'gpu',
            capasity_vram: 16,
            image: '/img/produkter/gpu/rx7900xt.webp',
            price: 7999,
            quantity: 1
        },
        {
            name: 'Nvidia GeForce RTX 3060',
            catagory: 'gpu',
            capasity_vram: 12,
            image: '/img/produkter/gpu/NVIDIA-EVGA-GeForce-RTX-3060.webp',
            price: 2999,
            quantity: 1
        },
        {
            name: 'AMD Radeon RX 6600',
            catagory: 'gpu',
            capasity_vram: 8,
            image: '/img/produkter/gpu/AMD Radeon RX 6600.webp',
            price: 1999,
            quantity: 1
        },
        {
            name: 'Corsair Vengeance RGB Pro 32GB',
            catagory: 'ram',
            capasity_ram: 32,
            image: '/img/produkter/ram/Corsair Vengeance RGB Pro.webp',
            price: 1299,
            quantity: 1
        },
        {
            name: 'G.Skill Trident Z RGB 16GB',
            catagory: 'ram',
            capasity_ram: 16,
            image: '/img/produkter/ram/G.Skill Trident Z RGB.webp',
            price: 799,
            quantity: 1
        },
        {
            name: 'Crucial Ballistix 32GB',
            catagory: 'ram',
            capasity_ram: 32,
            image: '/img/produkter/ram/Crucial Ballistix.webp',
            price: 1199,
            quantity: 1
        },
        {
            name: 'Kingston HyperX Fury 16GB',
            catagory: 'ram',
            capasity_ram: 16,
            image: '/img/produkter/ram/Kingston HyperX Fury.webp',
            price: 899,
            quantity: 1
        },
        {
            name: 'kingston NV3 M.2 1TB',
            catagory: 'ssd',
            capasity_tb: 1,
            image: '/img/produkter/ssd/Kingston NV3 M.2 1TB.webp',
            price: 649,
            quantity: 1
        },
        {
            name: 'Kingston Fury Renegade 2TB',
            catagory: 'ssd',
            capasity_tb: 2,
            image: '/img/produkter/ssd/Kingston Fury Renegade 2TB.webp',
            price: 1599,
            quantity: 1
        },
        {
            name: 'Samsung 870 EVO 2TB',
            catagory: 'ssd',
            capasity_tb: 2,
            image: '/img/produkter/ssd/Samsung 870 EVO 2TB.webp',
            price: 1499,
            quantity: 1
        }


    ],
};
function displayProducts(category = 'all') {
    const productsContainer = document.getElementById('products');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? produkter.data 
        : produkter.data.filter(product => product.catagory === category);
    
        filteredProducts.forEach(product => {
            const productElement = document.createElement('article');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <img src=".${product.image}" alt="${product.name}">
                <p>${product.price}kr</p>
                <button type="button" onclick="addToCart('${product.name}', ${product.price}, '.${product.image}')">
                    Lägg till i varukorg
                </button>
            `;
            productsContainer.appendChild(productElement);
        });
}

function setupFilters() {
    const aside = document.querySelector('aside');
    const filterSection = document.createElement('div');
    filterSection.className = 'category-filters';
    
    filterSection.innerHTML = `
        <h3>Kategorier</h3>
        <button onclick="displayProducts('all')" class="filter-btn active">Alla</button>
        <button onclick="displayProducts('cpu')" class="filter-btn">Processorer</button>
        <button onclick="displayProducts('gpu')" class="filter-btn">Grafikkort</button>
        <button onclick="displayProducts('ram')" class="filter-btn">RAM</button>
        <button onclick="displayProducts('ssd')" class="filter-btn">Lagring</button>
        <button onclick="displayProducts('moderkort')" class="filter-btn">Moderkort</button>
        <button onclick="displayProducts('psu')" class="filter-btn">Nätaggregat</button>
    `;
    
    aside.appendChild(filterSection);
}

// Sökfunktion
function setupSearch() {
    const searchInput = document.getElementById('sök');
    const searchButton = document.querySelector('.sök-knapp');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';

        const filteredProducts = produkter.data.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );

        filteredProducts.forEach(product => {
            const productElement = document.createElement('article');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <img src="./${product.image}" alt="${product.name}">
                <p>${product.price}kr</p>
                <button type="button" onclick="addToCart('${product.name}', ${product.price}, '../${product.image}')">
                    Lägg till i varukorg
                </button>
            `;
            productsContainer.appendChild(productElement);
        });
    });
}

// Initialisera sidan
document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    setupSearch();
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';
    displayProducts(category);
});