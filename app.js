document.addEventListener("DOMContentLoaded", function() {
    // HTML এলিমেন্ট সিলেক্ট করা হচ্ছে
    let openShopping = document.querySelector('.shopping');
    let closeShopping = document.querySelector('.closeShopping');
    let body = document.querySelector('body'); // পুরো বডি সিলেক্ট করা হচ্ছে যাতে ক্লাস যোগ করা যায়

    // শপিং খোলার ইভেন্ট
    openShopping.addEventListener('click', () => {
        body.classList.add('active'); // শপিং কার্ট খোলা
    });

    // শপিং বন্ধ করার ইভেন্ট
    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });
});


let products = [
    {
        id: 3,
        name: 'BURGER',
        image: '3.jpeg',
        price: 12000
    },
    {
        id: 4,
        name: 'PASTRY',
        image: '4.jpeg',
        price: 13000
    },
    {
        id: 5,
        name: 'NOODLESS',
        image: '5.JPEG',
        price: 14000
    },
    {
        id: 6,
        name: 'FISH CURRY',
        image: '6.JPEG',
        price: 15000
    },
    {
        id: 7,
        name: 'PASTA',
        image: '7.JPEG',
        price: 16000
    },
    {
        id: 8,
        name: 'CAKE',
        image: '8.JPEG',
        price: 17000
    },
];


let listCards = [];
let list = document.getElementById("list");
let totalElement = document.querySelector('.total'); 
let quantityElement = document.querySelector('.quantity'); 

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add("product-card");
        newDiv.innerHTML = `
            <img src="image/${value.image}" alt="${value.name}" />
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    let listCardElement = document.querySelector('.listCard');
    listCardElement.innerHTML = '';

    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src ="image/${value.image}" alt="${value.name}"/></div>
                <div>${value.name}</div>
                <div>$${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, -1)"> - </button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, 1)"> + </button>
                </div>
            `;
            listCardElement.appendChild(newDiv);
        }
    });

    totalElement.innerText = totalPrice.toLocaleString();
    quantityElement.innerText = count;
}


function changeQuantity(key, delta) {
    if (listCards[key] != null) {
        listCards[key].quantity += delta;
        if (listCards[key].quantity <= 0) {
            listCards[key] = null;
        }
    }
    reloadCard();
}