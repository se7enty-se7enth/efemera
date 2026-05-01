const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach(item => {
	const header = item.querySelector('.faq__header')
	header?.addEventListener('click', () => {
		faqItems.forEach(otherItem => {
			if (otherItem !== item) {
				otherItem.classList.remove('is-active')
			}
		})
		item.classList.toggle('is-active')
	})
})

const contactLink = document.querySelector('.js-contact-link')
const modalOverlay = document.getElementById('modalOverlay')
const modalContent = document.getElementById('modalContent')
const closeBtn = document.getElementById('modalClose')

function closeModal() {
	modalOverlay?.classList.remove('is-open')
	modalOverlay?.classList.add('is-closing')

	setTimeout(() => {
		if (modalOverlay) {
			modalOverlay.classList.remove('is-closing')
			modalOverlay.style.display = 'none'
		}
		document.body.style.overflow = ''
	}, 400)
}

contactLink?.addEventListener('click', (e) => {
	e.preventDefault()
	if (modalOverlay) {
		modalOverlay.style.display = 'flex'
		setTimeout(() => {
			modalOverlay.classList.add('is-open')
			document.body.style.overflow = 'hidden'
		}, 10)
	}
})

closeBtn?.addEventListener('click', closeModal)

modalOverlay?.addEventListener('click', (e) => {
	if (e.target === modalOverlay) {
		closeModal()
	}
})

document?.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modalOverlay?.classList.contains('is-open')) {
		closeModal()
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const filterBtns = document.querySelectorAll('.filter__btn')
	const catalogItems = document.querySelectorAll('.catalog__item')

	const updateGridPattern = () => {
		const visibleItems = document.querySelectorAll('.catalog__item:not(.is-hidden)')

		visibleItems.forEach((item, index) => {
			item.style.gridColumn = ""
			item.style.gridRow = ""

			if (index % 4 === 0) {
				item.style.gridColumn = "span 2"
				item.style.gridRow = "span 2"
			}
		})
	}

	updateGridPattern()

	filterBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const filter = btn.dataset.filter

			filterBtns.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')

			catalogItems.forEach(item => {
				if (filter === 'all' || item.dataset.category === filter) {
					item.classList.remove('is-hidden')
				} else {
					item.classList.add('is-hidden')
				}
			})

			updateGridPattern()
		})
	})
})

const cartModal = document.getElementById('cartModal')
const closeCartBtn = document.getElementById('cartModalClose')
const cartImg = cartModal?.querySelector('.js-cart-img')
const cartNumber = cartModal?.querySelector('.js-cart-number')
const cartPrice = cartModal?.querySelector('.js-cart-price')

function closeCart() {
	if (!cartModal) return
	cartModal.classList.remove('is-open')
	cartModal.classList.add('is-closing')

	setTimeout(() => {
		cartModal.classList.remove('is-closing')
		cartModal.style.display = 'none'
		document.body.style.overflow = ''
	}, 400)
}

const catalogCards = document.querySelectorAll('.catalog-card, .popular-product__card, .product-card')

catalogCards.forEach(card => {
	card.addEventListener('click', (e) => {
		e.preventDefault()

		const itemImg = card.querySelector('[class*="__img"] img')?.src
		const itemNumber = card.querySelector('[class*="__number"]')?.textContent
		const itemPrice = card.querySelector('[class*="__price"]')?.textContent

		if (cartImg) cartImg.src = itemImg || ''
		if (cartNumber) cartNumber.textContent = itemNumber || ''
		if (cartPrice) cartPrice.textContent = itemPrice || ''

		cartModal.style.display = 'flex'
		setTimeout(() => {
			cartModal.classList.add('is-open')
			document.body.style.overflow = 'hidden'
		}, 10)
	})
})

closeCartBtn?.addEventListener('click', closeCart)

cartModal?.addEventListener('click', (e) => {
	if (e.target === cartModal) {
		closeCart()
	}
})

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && cartModal?.classList.contains('is-open')) {
		closeCart()
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const burger = document.getElementById('burger')
	const header = document.querySelector('.header')
	const body = document.body
	const navLinks = document.querySelectorAll('.header__nav-link')

	const toggleMenu = () => {
		header.classList.toggle('is-open')
		body.classList.toggle('is-locked')
	}

	burger?.addEventListener('click', (e) => {
		e.stopPropagation()
		toggleMenu()
	})

	header?.addEventListener('click', (e) => {
		if (header.classList.contains('is-open') && e.target === header) {
			toggleMenu()
		}
	})

	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (header.classList.contains('is-open')) {
				toggleMenu()
			}
		})
	})
})

const servicesSwiper = new Swiper('.services__slider', {
	slidesPerView: 1,
	spaceBetween: 20,
	grabCursor: true,

	observer: true,
	observeParents: true,
	watchOverflow: true,

	pagination: {
		el: '.services__pagination',
		clickable: true,
	},

	breakpoints: {
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 70,
		}
	}
})