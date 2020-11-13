const cartStorageName = "cart";

export const getCart = () => {
    let cart = localStorage.getItem(cartStorageName);
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

export const getCartCount = () => {
    let cart = localStorage.getItem(cartStorageName);
    if (cart == null) {
        return 0;
    } else {
        return JSON.parse(cart).length;
    }
}

export const clearCart = () => {
    localStorage.removeItem(cartStorageName);
}

export const addToCart = (id) => {
    let cart = localStorage.getItem(cartStorageName);
    if (cart === null) {
        cart = [id];
    } else {
        cart = JSON.parse(cart);
        if (!cart.includes(id)) {
            cart.push(id);
        }
    }
    localStorage.setItem(cartStorageName, JSON.stringify(cart));
}

export const removeFromCart = (id) => {
    let cart = localStorage.getItem(cartStorageName);
    if (cart !== null) {
        cart = JSON.parse(cart);
        cart = cart.filter(p => p.id !== id);
    }
    localStorage.setItem(cartStorageName, JSON.stringify(cart));
}