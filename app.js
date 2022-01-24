const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const checkCartBtn = document.querySelector(".check-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const rateDOM = document.querySelector(".rate-center");
const comingDOM = document.querySelector(".coming-center");
const allDOM = document.querySelector(".all-center");
const searchDOM = document.querySelector(".search-center");
const search = document.getElementById("search");

let cart = [];

let buttonsDOM = [];

class Products{
  async getProducts(){
    try {
      let result = await fetch('./products.json');
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const {title, price, rate, trailer, date} = item.fields;
        const {id} = item.sys;
        const image = item.fields.image.fields.file.url;
        return {title,price,rate,trailer, date, id, image}
      });
      return products
    } catch (e) {
      console.log(e);
    }
  }
}

class UI{


  displayProducts(products){

    search.addEventListener('input', (e) => {
        e.preventDefault();
        let filteredMovie = products.filter(product => product.title === search.value || product.title.toLowerCase() === search.value || product.title.split(" ")[0].toLowerCase() === search.value || product.title.split(" ")[1] === search.value || product.title.split(" ")[2] === search.value);
        let fitlerResult = '';
        filteredMovie.forEach(product => {
          fitlerResult += `
          <article class="product">
            <div class="img-container search-result" style="background-image:url('${product.image}');">
            <div class="overlay">

            </div>
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i>
              add to cart
            </button>
            <button class="heart-btn">
              <i class="fas fa-heart"></i>
              ${product.rate}
            </button>
            <button class="play-btn" style="padding-left:5%;">
              <a href="${product.trailer}" target="_blank">
                <i class="fas fa-play"></i>
              </a>
            </button>
            </div>

            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
          </article><br>
          `
        });
        searchDOM.innerHTML = fitlerResult;


    });

    let allResult = '';
    products.forEach(product => {
      allResult += `
      <article class="product">
        <div class="img-container">
          <img src=${product.image} href=${product.trailer} alt="" class="product-img">
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            add to cart
          </button>
          <button class="heart-btn">
            <i class="fas fa-heart"></i>
            ${product.rate}
          </button>
          <button class="play-btn">
            <a href="${product.trailer}" target="_blank">
              <i class="fas fa-play"></i>
            </a>
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
      </article>
      `
    });

    allDOM.innerHTML = allResult;

    let result = '';

    let todayMovies = products.filter(product => product.date === 17)
    let movies = todayMovies.slice(0, 4);
    movies.forEach(product => {
      result += `
      <article class="product">
        <div class="img-container">
          <img src=${product.image} href=${product.trailer} alt="" class="product-img">
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            add to cart
          </button>
          <button class="heart-btn">
            <i class="fas fa-heart"></i>
            ${product.rate}
          </button>
          <button class="play-btn">
            <a href="${product.trailer}" target="_blank">
              <i class="fas fa-play"></i>
            </a>
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
      </article>
      `
    });
    productsDOM.innerHTML = result;

    let ratedResult = '';

    let rate = products.filter(product => product.rate > 8);
    let rateSlice = rate.slice(0,4);

    rateSlice.forEach(product => {
      ratedResult += `
      <article class="product">
        <div class="img-container">
          <img src=${product.image} href=${product.trailer} alt="" class="product-img">
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            add to cart
          </button>
          <button class="heart-btn">
            <i class="fas fa-heart"></i>
            ${product.rate}
          </button>
          <button class="play-btn">
            <a href="${product.trailer}" target="_blank">
              <i class="fas fa-play"></i>
            </a>
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
      </article>
      `
    });
    rateDOM.innerHTML = ratedResult;

    let comingResult = '';

    let comingSoon = products.filter(product => product.date > 17);
    let comingSlice = comingSoon.slice(0, 4);

    comingSlice.forEach(product => {
      comingResult += `
      <article class="product">
        <div class="img-container">
          <img src=${product.image} href=${product.trailer} alt="" class="product-img">
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            add to cart
          </button>
          <button class="heart-btn">
            <i class="fas fa-heart"></i>
            ${product.rate}
          </button>
          <button class="play-btn">
            <a href="${product.trailer}" target="_blank">
              <i class="fas fa-play"></i>
            </a>
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
      </article>
      `
    });
    comingDOM.innerHTML = comingResult;
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = buttons;

    buttons.forEach((button) => {
      const id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }

      button.addEventListener('click', event => {
        event.target.innerText = 'In Cart';
        event.target.disabled = true;

        let cartItem = {...Storage.getProduct(id), amount: 1};

        cart = [...cart, cartItem];

        Storage.saveCart(cart);

        this.setCartValues(cart);

        this.addCartItem(cartItem);
      })

    });
  }
  setCartValues(cart){
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item){
    const div = document.createElement('div');
    div.classList.add('cart-item');
    let cartResult = `<img src=${item.image} alt="">
      <div>
        <h3>${item.title}</h3>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
      </div>`;
    div.innerHTML = cartResult;
    cartContent.appendChild(div);
  }

  showCart(){
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
  setupAPP(){
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);
  }
  populateCart(cart){
    cart.forEach((item) => this.addCartItem(item));
  }

  cartLogic(){
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });

    checkCartBtn.addEventListener('click', () => {
      window.alert("you bought these tickets");
    });



    cartContent.addEventListener('click', event => {
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains('fa-chevron-up')) {
          let addAmount = event.target;
          let id = addAmount.dataset.id;
          let tempItem = cart.find(item => item.id === id);
          tempItem.amount = tempItem.amount + 1;
          Storage.saveCart(cart);
          this.setCartValues(cart);
          addAmount.nextElementSibling.innerHTML = tempItem.amount;
        } else if (event.target.classList.contains('fa-chevron-down')) {
          let lowerAmount = event.target;
          let id = lowerAmount.dataset.id;
          let tempItem = cart.find(item => item.id === id);
          tempItem.amount = tempItem.amount - 1;
          if (tempItem.amount > 0) {
            Storage.saveCart(cart);
            this.setCartValues(cart)
            lowerAmount.previousElementSibling.innerHTML = tempItem.amount;
          }else{
            cartContent.removeChild(lowerAmount.parentElement.parentElement);
            this.removeItem(id);
          }
        }
    });
  }

  clearCart(){
    let cartItems = cart.map(item => item.id);
    cartItems.forEach((id) => {this.removeItem(id)});
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }

  removeItem(id){
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i> add to cart`;
  }

  getSingleButton(id){
    return buttonsDOM.find(button => button.dataset.id === id);
  }
}

class Storage{
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let product = JSON.parse(localStorage.getItem('products'));
    return product.find(product => product.id === id);
  }
  static saveCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  static getCart(){
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  ui.setupAPP();

  products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(() => {
    ui.getBagButtons();
    ui.cartLogic();
  });
});
