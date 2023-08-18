const emptyCart = () => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('cartItems')) {
            sessionStorage.removeItem('cartItems')
            window.location.href="/order/success";
        }
    }
    return [];
};



export default {
    emptyCart
};