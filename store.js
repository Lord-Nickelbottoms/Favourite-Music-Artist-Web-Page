//to ensure that the page has loaded first before js file does in case js requires elements that need to load
if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
}

//if page is no longer loading i.e done loading
else {
	ready()
}

function ready()
{
	var removeCartItmButton = document.getElementsByClassName("btn-danger")

	for (var i = 0; i < removeCartItmButton.length; i++) {
		var button = removeCartItmButton[i]
		button.addEventListener("click", removeCartItem)
	}

	var quantityInput = document.getElementsByClassName('cart-quantity-input')

	for (var i = 0; i < quantityInput.length; i++) {
		var input = quantityInput[i]
		input.addEventListener("change", quantityChanged)
	}

	var addToCartButton = document.getElementsByClassName('shop-item-button')
	for (var i = 0; i < addToCartButton.length; i++) {
		var button = addToCartButton[i]
		button.addEventListener("click", addToCartClicked)
	}
}


function removeCartItem(event)
{
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}

function quantityChanged(event)
{
	var input = event.target

	//isNaN checks to see if input is a number or not
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	updateCartTotal()
}

function addToCartClicked(event)
{
	//we're getting the title, price and image variables to hold the info from the button that is clicked
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText

	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

	console.log(title, price, imageSrc)

	addItemToCart(title, price, imageSrc)
	updateCartTotal()
}


function addItemToCart(title, price, imageSrc)
{
	var cartRow = document.createElement('div')

	cartRow.classList.add('cart-row')
	//this allows you to add a class to the html below

	var cartItems = document.getElementsByClassName('cart-items')[0]


	var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			alert("This item is already added to the cart")
			return
			//this will exit the loop and function and prevent the code below from execution
		}
	}

	cartRowContents = `
				<div class="cart-item cart-column">
					<img src="${imageSrc}" class="cart-item-image">
					<span class="cart-item-title">${title}</span>
				</div>

				<span class="cart-price cart-column">${price}</span>

				<div class="cart-quantity cart-column">
					<input type="number" value="2" class="cart-quantity-input">
					<button type="button" class="btn btn-danger">Remove</button>
				</div>
	`

	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)

	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
	//this is to get the Remove button to work on the new item in the cart as ready() is only added to those that are already present
}


function updateCartTotal()
{
	var cartItemContainer = document.getElementsByClassName("cart-items")[0]
	//getElementsByClassName will get an array of all the objects with the class, using [0] will only select the first one
	var cartRows = cartItemContainer.getElementsByClassName("cart-row")

	var total = 0

	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName("cart-price")[0]
		var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]

		var price = parseFloat(priceElement.innerText.replace('$', ''))
		//parseFloat will change a string into a float which is a number with decimal points e.g 19.50

		var quantity = quantityElement.value

		total = total + (price * quantity)
		//after each loop, the total will increase from the previous total amount
	}

	total = Math.round(total * 100) / 100	//to round the number to 2 decimal points
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}