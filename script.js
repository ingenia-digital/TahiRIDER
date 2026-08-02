let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, price: precio });
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaItems = document.getElementById('cart-items');
    const totalPrecioSpan = document.getElementById('cart-total-price');
    
    if (!listaItems || !totalPrecioSpan) return;

    listaItems.innerHTML = '';

    if (carrito.length === 0) {
        listaItems.innerHTML = '<li style="color: var(--text-muted); text-align: center; padding: 1.5rem 0; font-size: 0.9rem;">El carrito está vacío</li>';
        totalPrecioSpan.innerText = '$0';
        return;
    }

    let total = 0;
    carrito.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-title">${item.nombre}</span>
                <span class="cart-item-price">$${item.price.toLocaleString()}</span>
            </div>
            <button class="remove-btn" onclick="eliminarDelCarrito(${index})" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
        `;
        listaItems.appendChild(li);
    });

    totalPrecioSpan.innerText = `$${total.toLocaleString()}`;
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Selecciona algún producto antes de enviar el pedido.");
        return;
    }

    // Reemplaza este número por tu número de WhatsApp real con código de país y área
    const numeroWhatsApp = "5493476000000"; 

    let mensaje = "Hola! Tahi Rider ⚡, quiero realizar el siguiente pedido:\n\n";
    let total = 0;

    carrito.forEach((item) => {
        mensaje += `* ${item.nombre} - $${item.price.toLocaleString()}\n`;
        total += item.price;
    });

    mensaje += `\n*TOTAL A PAGAR: $${total.toLocaleString()}*\n\nFormas de pago elegidas: Mercado Pago / Efectivo / Transferencia. Quedo a la espera de los datos.`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}
