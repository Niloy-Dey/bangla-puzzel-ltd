let cart = [];

function addToCart(itemName, price, imageUrl) {
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1, imageUrl: imageUrl });
    }

    updateCartDisplay();
    openSidebar();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('flex', 'justify-between', 'items-center', 'border-b', 'pb-2');

        const itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.classList.add('flex', 'items-center');

        const itemNameDiv = document.createElement('div');
        itemNameDiv.textContent = `${item.name}`;
        itemNameDiv.classList.add('font-semibold', 'mr-4');

        const itemQuantityDiv = document.createElement('div');
        itemQuantityDiv.textContent = `${item.quantity}`;
        itemQuantityDiv.classList.add('mr-4');

        const itemPriceDiv = document.createElement('div');
        itemPriceDiv.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        itemPriceDiv.classList.add('mr-4');

        const itemImage = document.createElement('img');
        itemImage.src = item.imageUrl;
        itemImage.alt = item.name;
        itemImage.classList.add('w-20', 'h-20', 'mr-4');

        const quantityButtonsDiv = document.createElement('div');
        quantityButtonsDiv.classList.add('flex', 'items-center');

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('bg-gray-300', 'px-2', 'py-1', 'rounded');
        decreaseButton.onclick = () => decrementQuantity(item.name);

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('bg-gray-300', 'px-2', 'py-1', 'rounded');
        increaseButton.onclick = () => incrementQuantity(item.name);

        quantityButtonsDiv.appendChild(decreaseButton);
        quantityButtonsDiv.appendChild(increaseButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('text-red-500', 'ml-2');
        deleteButton.onclick = () => removeItemFromCart(item.name);

        itemDetailsDiv.appendChild(itemImage);
        itemDetailsDiv.appendChild(itemNameDiv);
        itemDetailsDiv.appendChild(itemQuantityDiv);
        itemDetailsDiv.appendChild(itemPriceDiv);
        itemDetailsDiv.appendChild(quantityButtonsDiv);

        cartItemDiv.appendChild(itemDetailsDiv);
        cartItemDiv.appendChild(deleteButton);

        cartContainer.appendChild(cartItemDiv);
    });
}

function removeItemFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
}
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    const container = document.getElementById("container");

    if (sidebar.style.width !== "400px") {
        sidebar.style.width = "400px";
        container.style.marginRight = "400px";
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const container = document.getElementById("container");

    sidebar.style.width = "0";
    container.style.marginRight = "0";
}

function toggleSidebar() {
    const sidebarWidth = document.getElementById("sidebar").style.width;
    if (sidebarWidth === "400px") {
        closeSidebar();
    } else {
        openSidebar();
    }
}

/* Item increment function */
function incrementQuantity(itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity++;
        updateCartDisplay();
    }
}


/* Item decrement function */
function decrementQuantity(itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartDisplay();
    }
}
