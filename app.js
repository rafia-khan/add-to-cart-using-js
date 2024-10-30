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
        body.classList.remove('active'); // শপিং কার্ট বন্ধ
    });
});

// পণ্য তালিকা
let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1jpeg.jpeg',
        price: 12000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.jpeg',
        price: 13000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.JPEG',
        price: 14000
    }
];

// পণ্য তালিকা যুক্ত করার জন্য initApp ফাংশন
let listCards = [];
let list = document.getElementById("list"); // HTML থেকে list ডিভ খুঁজে পাওয়া
let totalElement = document.querySelector('.total'); // total এলিমেন্ট সিলেক্ট করা হচ্ছে
let quantityElement = document.querySelector('.quantity'); // quantity এলিমেন্ট সিলেক্ট করা হচ্ছে

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add("product-card"); // নতুন ক্লাস যুক্ত করেছি যাতে CSS প্রয়োগ করা যায়
        newDiv.innerHTML = `
            <img src="image/${value.image}" alt="${value.name}" />
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv); // list ডিভের মধ্যে নতুন div যোগ করা
    });
}

initApp(); // initApp ফাংশন কল করা

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity++; // পরিমাণ বাড়ানো
    }
    reloadCard(); // কার্ট রিলোড করা
}

function reloadCard() {
    let listCardElement = document.querySelector('.listCard'); // কার্টের UL সিলেক্ট করা
    listCardElement.innerHTML = ''; // পুরানো তথ্য মুছে ফেলা

    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) { // যদি পণ্য থাকে
            totalPrice += value.price * value.quantity; // মোট মূল্য আপডেট করা
            count += value.quantity; // মোট পরিমাণ আপডেট করা

            // নতুন এলিমেন্ট তৈরি করা
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
            listCardElement.appendChild(newDiv); // UL এ নতুন এলিমেন্ট যোগ করা
        }
    });

    totalElement.innerText = totalPrice.toLocaleString(); // মোট মূল্য আপডেট করা
    quantityElement.innerText = count; // মোট পরিমাণ আপডেট করা
}

// পরিমাণ পরিবর্তনের জন্য changeQuantity ফাংশন
function changeQuantity(key, delta) {
    if (listCards[key] != null) {
        listCards[key].quantity += delta;
        if (listCards[key].quantity <= 0) {
            listCards[key] = null;
        }
    }
    reloadCard();
}