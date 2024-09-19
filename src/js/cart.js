let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

iconCart.addEventListener('click', ()=> {
    body.classList.toggle('showCart')
    console.log("clicked")
})

closeCart.addEventListener('click', () =>{
    body.classList.toggle('showCart')
    console.log("clicked")

})