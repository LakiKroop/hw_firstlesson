window.addEventListener('DOMContentLoaded', () => {

	const cartWrapper = document.querySelector('.cart__wrapper'),
		cart = document.querySelector('.cart'),
		close = document.querySelector('.cart__close'),
		open = document.querySelector('#cart'),
		goodsBtn = document.querySelectorAll('.goods__btn'),
		products = document.querySelectorAll('.goods__item'),
		confirm = document.querySelector('.confirm'),
		badge = document.querySelector('.nav__badge'),
		totalCost = document.querySelector('.cart__total > span'),
		titles = document.querySelectorAll('.goods__title');

	function openCart() {
		cart.style.display = 'block';
		document.body.style.overflow = 'hidden';
	}

	function closeCart() {
		cart.style.display = 'none';
		document.body.style.overflow = '';
	}

	open.addEventListener('click', openCart);
	close.addEventListener('click', closeCart);

	goodsBtn.forEach(function(btn, i) {
		btn.addEventListener('click', () => {
			let item = products[i].cloneNode(true),
				trigger = item.querySelector('button'),
				removeBtn = document.createElement('div'),
				empty = cartWrapper.querySelector('.empty');

			trigger.remove();

			showConfirm();
			calcGoods(1);

			removeBtn.classList.add('goods__item-remove');
			removeBtn.innerHTML = '&times';
			item.appendChild(removeBtn);

			cartWrapper.appendChild(item);

			calcTotal();
			removeFromCart();
		});
	});

	/*	titles.forEach(function(item) {
			if (item.textContent.length < 70) {
				return;
			} else {
				const str = item.textContent.slice(0, 71) + '...';
				// const str = '${item.textContent.slice(0, 71)} ...';
				item.textContent = str;
			}
		}) 
	*/


	function sliceTitle() {
		titles.forEach(function(item) {
			if (item.textContent.length < 70) {
				return;
			} else {
				const str = item.textContent.slice(0, 71) + '...';

				item.textContent = str;
			}
		});
	}
	sliceTitle();

	function showConfirm() {
		confirm.style.display = 'block';
		let counter = 100;
		const id = setInterval(frame, 10);
		function frame() {
			if ( counter == 10) {
				clearInterval(id);
				confirm.style.display = 'none';
			} else {
				counter--; // -- уменшает на одну единицу
				confirm.style.opacity = '.' + counter;
				confirm.style.transform = `translateY(-${counter}px)`;
			}
		}
	}
	// setInterval(sliceTitle, 100) через каждие
	// setTimeout(sliceTitle, 100) во время этого времени


	function calcGoods(i) {
		const items = cartWrapper.querySelectorAll('.goods__item');
			  empty = cartWrapper.querySelector('.empty');
		badge.textContent = i + items.length;
		if ( items.length == 0) {
				empty.style.display = 'block';
			} else {
				empty.style.display = "none";
			}
	}


	function calcTotal() {
		const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
		let total = 0;
		prices.forEach(function(item) {
			total += +item.textContent;
		});
		totalCost.textContent = total;
	}

	function removeFromCart() {
		const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
		removeBtn.forEach(function(btn) {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				calcGoods(0);
				calcTotal();
			});
		});
	}

});




