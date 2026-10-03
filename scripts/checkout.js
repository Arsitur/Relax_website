import products from '../data/menu.json';
import { readCart } from './cart.js';
import { siteUrl, escapeHTML } from './site.js';
const orders = readCart(products);
const ordersDiv = document.querySelector(".all>.orders-div>.content>.wrap>.orders");
const allOrdersSection = document.querySelector('.orders-div>.content');
const ordersContent = document.querySelector('.all>.orders-div>.content>.wrap')
const totalPriceDiv = document.querySelector(".all>.orders-div>.content>.wrap>.total>.total-price");
const loadingAnim = document.querySelector(".all>.orders-div>.content>.loading")
const subTotal = document.querySelector("#subtotal");
const continueButton = document.querySelector('#continue-button')

Promise.resolve(products).then((querySnapshot) =>
{
    let keysArray = []

    for (let key in orders)
    {
        if (orders.hasOwnProperty(key))
        {
            keysArray.push(key)
        }
    }

    let totalPrice = 0

    querySnapshot.forEach(product =>
    {
        if (keysArray.includes(product.id))
        {
            ordersDiv.innerHTML += `<checkout-order name="${escapeHTML(product.name)}" price="${product.price}" img="${siteUrl(product.photoURL)}"
                        quantity="${orders[product.id]}"></checkout-order>`;
            totalPrice += product.price * orders[product.id];
        }
    })
    totalPriceDiv.innerText = `${totalPrice + 35}.00 MDL`;
    subTotal.innerText = `${totalPrice}.00 MDL`;
    ordersContent.style.display = 'flex';
    loadingAnim.style.display = 'none'
    if (keysArray.length) continueButton.classList.remove('disabled');
    else ordersDiv.textContent = 'Coșul este gol.';
})

const adressInput = document.querySelector("#adress-input");
const apartamentInput = document.querySelector("#apartament-input");
const phoneInput = document.querySelector("#phone-input");
const checkoutForm = document.querySelector(".all>.information")


checkoutForm.addEventListener('submit', (e) =>
{
    e.preventDefault();
    window.alert('Acesta este un demo pentru portofoliu. Nu sunt procesate comenzi sau plăți.');
})

const infoButton = document.querySelector('.all>.information>.method>.inputs>.input>.info>.content>button');
const infoPopup = document.querySelector('.all>.information>.method>.inputs>.input>.info>.content>.popup');

infoButton.addEventListener('click', (e) =>
{
    e.stopPropagation();
    infoPopup.classList.toggle('show')
})

document.addEventListener('click', (event) =>
{
    if (!infoPopup.contains(event.target))
    {
        infoPopup.classList.remove('show');
    }
});

