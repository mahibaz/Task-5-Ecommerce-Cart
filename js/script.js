const xButton = document.querySelector('.x-btn');
const whiteboard = document.getElementById('whiteboard');

function toggleWhiteboard() {
  const isWhiteboardVisible = whiteboard.style.right === '0px'; 

  if (isWhiteboardVisible) {
    whiteboard.style.right = '-400px'; 
  } else {
    whiteboard.style.right = '0px'; 
  }
}

xButton.addEventListener('click',()=>{
  whiteboard.style.right = '';
})

document.addEventListener('DOMContentLoaded',ecommerce);


function loadContent(){
  let buttonRemove = document.querySelectorAll('.cart-remove');
  buttonRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  
  let quantityElements = document.querySelectorAll('.cart-quantity');
  quantityElements.forEach((input)=>{
    input.addEventListener('change',changeQuantity);
  });

  let cartButtons = document.querySelectorAll('.cart-img');
  cartButtons.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });

  updateTotal();

}


function removeItem(){
  if(confirm('remove from your cart')){
    let item = this.parentElement;
    let item1 = item.parentElement;
    let title = item1.querySelector('.card-title');
    console.log(title);
    itemList = itemList.filter(el=> el.title!=title);
    const remove1 = document.querySelector('.cart-box');
    remove1.remove();
    loadContent();
  }
  
}

function changeQuantity(){
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  } 
  loadContent()
}

let itemList = [];

function addCart(){
  let item = this.parentElement;
  let item1 = item.parentElement;
  let item2 = item1.parentElement;
  let title = item1.querySelector('.card-title').innerHTML;
  let price = item1.querySelector('.card-text').innerHTML;
  let imgSrc = item2.querySelector('.card-img-top').src;
  let newProduct = {
    title,price,imgSrc
  }

  if (itemList.find((e)=>e.title == newProduct.title)) {
    alert("Product already added");
    return;
  }
  else{
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title,price,imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-boxes');
  cartBasket.append(element);
  loadContent();
}



function createCartProduct(title,price,imgSrc){

  return `<div class="d-flex cart-box">
    <img class="" width="100px" src="${imgSrc}" alt="">
  <div class="d-flex flex-column ms-2">
    <p>${title}</p>
    <p>${price}</p>
    <input class="cart-quantity" type="number" id="quantity" name="quantity">
  </div>
  <div class="d-flex justify-content-end flex-grow-1 align-items-center">
    <img class="cart-remove" src="images/trash.png" alt="img" width="30px">
  </div>
  </div>`;
  
}



function updateTotal(){
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total');

  let total = 0;

  cartItems.forEach(product=>{
    let priceElement = product.querySelector('.d-flex p:nth-child(2)'); 
    let price = parseFloat(priceElement.textContent.slice(1)); 
    let qty = product.querySelector('.cart-quantity').value;

    if (isNaN(qty) || qty < 1) {
      qty = 1;
      quantityInput.value = 1; 
    }
    total += price * qty;

  })

  totalValue.innerHTML = '$' + total.toFixed(2);
}

function ecommerce() {
  loadContent();

  const buyNowButton = document.querySelector('.btn-danger');
  buyNowButton.addEventListener('click', buyNowClicked);
}

function buyNowClicked() {
  if (itemList.length === 0) {
    alert("Your cart is empty. Please add some products before proceeding to checkout.");
  } else {
    alert("Thank you for your purchase! Your order is being processed.");
    itemList = [];

    const cartBasket = document.querySelector('.cart-boxes');
    cartBasket.innerHTML = '';

    const totalValue = document.querySelector('.total');
    totalValue.innerHTML = '$0.00';
  }
}