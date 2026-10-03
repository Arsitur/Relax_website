// The demo basket lives only on this device; it is not an order or a Firebase record.
export function readCart(products) {
    try {
        const stored = JSON.parse(localStorage.getItem('orders') || '{}');
        const known = new Set(products.map(item => item.id));
        return Object.fromEntries(Object.entries(stored ?? {}).filter(([id, quantity]) => known.has(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 99));
    } catch { return {}; }
}
