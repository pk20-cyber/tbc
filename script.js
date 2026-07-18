/* =========================================================================
   CONTACT SETTINGS — edit these two lines to go live
   ========================================================================= */
const WHATSAPP_NUMBER = "8652071503"; // country code + number, no + or spaces
const INSTAGRAM_HANDLE = "thebrekkieclubb"; // without the @

/* =========================================================================
   Below this line is display logic — no need to edit anything here.
   ========================================================================= */
(function(){
  const igLink = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
  const igProfile = `https://instagram.com/${INSTAGRAM_HANDLE}`;

  const MENU_JSON_FALLBACK = [
    {
      category: "Sweet Picks",
      items: [
        {
          id: "blueberry-muffins",
          name: "Blueberry Lemon Muffins",
          description: "Freshly baked, light, and fluffy muffins loaded with juicy blueberries and a bright lemon glaze.",
          price: "₹ 195",
          image: "assets/blueberry-muffins.jpg",
          alt: "Blueberry Lemon Muffins",
          tag: "Sweet"
        },
        {
          id: "chocolate-banana-bread",
          name: "Double Chocolate Banana Bread",
          description: "Rich, moist banana bread packed with premium dark chocolate chips and Dutch-process cocoa.",
          price: "₹ 220",
          image: "assets/blueberry-muffins.jpg",
          alt: "Double Chocolate Banana Bread",
          tag: "Sweet"
        }
      ]
    },
    {
      category: "Savoury Favourites",
      items: [
        {
          id: "veg-club-sandwich",
          name: "The Vegetarian Club Sandwich",
          description: "Classic triple-decker with crisp veggies, herbed spread, and sliced cheese on toasted bread.",
          price: "₹ 295",
          image: "assets/savoury-sandwich.jpg",
          alt: "The Vegetarian Club Sandwich",
          tag: "Savoury"
        },
        {
          id: "egg-sando",
          name: "Japanese Egg Sando",
          description: "Pillow-soft milk bread filled with a rich, creamy, and seasoned Japanese-style egg salad.",
          price: "₹ 265",
          image: "assets/savoury-sandwich.jpg",
          alt: "Japanese Egg Sando",
          tag: "Savoury"
        }
      ]
    },
    {
      category: "TBC Specials",
      items: [
        {
          id: "cinnamon-rolls",
          name: "Cinnamon Rolls with Raspberry Icing",
          description: "Warm, gooey cinnamon rolls topped with a signature sweet and tangy raspberry glaze.",
          price: "₹ 240",
          image: "assets/cinnamon-rolls.jpg",
          alt: "Cinnamon Rolls with Raspberry Icing",
          tag: "Special"
        },
        {
          id: "orange-bundt-cake",
          name: "Orange Bundt Cake",
          description: "Fragrant, citrus-infused bundt cake with a delicate crumb and a fresh orange juice glaze.",
          price: "₹ 260",
          image: "assets/cinnamon-rolls.jpg",
          alt: "Orange Bundt Cake",
          tag: "Special"
        },
        {
          id: "falafel-sandwich",
          name: "Falafel Hummus Sandwich",
          description: "Crisp house-made falafel patties, creamy smooth hummus, and pickles in fresh toasted bread.",
          price: "₹ 280",
          image: "assets/savoury-sandwich.jpg",
          alt: "Falafel Hummus Sandwich",
          tag: "Special"
        }
      ]
    }
  ];

  const MENU_BY_ID = {};
  const orderState = {};

  function buildMenuIndex(data) {
    data.forEach(category => {
      category.items.forEach(item => {
        MENU_BY_ID[item.id] = item;
        orderState[item.id] = 0;
      });
    });
  }

  function renderMenu(data) {
    const container = document.getElementById('menu-container');
    if (!container) return;

    container.innerHTML = data.map(category => `
      <div class="menu-category">
        <h3 class="category-title">${category.category}</h3>
        <div class="menu-carousel">
          <button class="menu-carousel-control menu-carousel-control--prev" type="button" aria-label="Show previous menu items">←</button>
          <div class="menu-grid">
            ${category.items.map(item => `
            <div class="menu-item-card" data-item-id="${item.id}">
              <div class="menu-item-details">
                <div class="menu-item-info">
                  <div class="menu-item-header">
                    <h4 class="menu-item-name">${item.name}</h4>
                    <span class="menu-item-tag tag-${item.tag.toLowerCase()}">${item.tag}</span>
                  </div>
                  <p class="menu-item-desc">${item.description}</p>
                  <button class="menu-item-read-more" type="button" aria-expanded="false">Read more</button>
                  <div class="menu-item-price">${item.price}</div>
                </div>
                <div class="menu-item-action">
                  <button class="counter-btn minus-btn" aria-label="Decrease quantity" disabled>−</button>
                  <span class="item-count">0</span>
                  <button class="counter-btn plus-btn" aria-label="Increase quantity">+</button>
                </div>
              </div>
              <img class="menu-item-img" src="${item.image}" alt="${item.alt}">
            </div>
            `).join('')}
          </div>
          <button class="menu-carousel-control menu-carousel-control--next" type="button" aria-label="Show next menu items">→</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.menu-item-card').forEach(card => {
      const id = card.getAttribute('data-item-id');
      const plusBtn = card.querySelector('.plus-btn');
      const minusBtn = card.querySelector('.minus-btn');
      const readMoreBtn = card.querySelector('.menu-item-read-more');

      if (plusBtn) {
        plusBtn.addEventListener('click', () => adjustItemQuantity(id, 1));
      }
      if (minusBtn) {
        minusBtn.addEventListener('click', () => adjustItemQuantity(id, -1));
      }
      if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
          const isExpanded = card.classList.toggle('menu-item-card--expanded');
          readMoreBtn.textContent = isExpanded ? 'Show less' : 'Read more';
          readMoreBtn.setAttribute('aria-expanded', String(isExpanded));
        });
      }
    });

    container.querySelectorAll('.menu-carousel').forEach(carousel => {
      const track = carousel.querySelector('.menu-grid');
      const previous = carousel.querySelector('.menu-carousel-control--prev');
      const next = carousel.querySelector('.menu-carousel-control--next');
      const scrollAmount = () => Math.max(track.clientWidth * 0.8, 300);

      const updateControls = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        previous.hidden = maxScroll <= 1 || track.scrollLeft <= 1;
        next.hidden = maxScroll <= 1 || track.scrollLeft >= maxScroll - 1;
      };

      previous?.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
      next?.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
      track.addEventListener('scroll', updateControls, { passive: true });
      if ('ResizeObserver' in window) {
        new ResizeObserver(updateControls).observe(track);
      } else {
        window.addEventListener('resize', updateControls);
      }
      requestAnimationFrame(updateControls);
    });
  }

  function loadMenuJson() {
    return fetch('./menu.json')
      .then(response => {
        if (!response.ok) throw new Error('Menu JSON fetch failed');
        return response.json();
      })
      .catch(() => MENU_JSON_FALLBACK);
  }

  function normaliseMenuData(data) {
    // Supports the current category structure, or a flat list of items with a
    // `category` field so menu.json can stay simple as the menu grows.
    const entries = Array.isArray(data)
      ? data
      : (data.categories || data.items || MENU_JSON_FALLBACK);

    if (entries.every(entry => Array.isArray(entry.items))) return entries;

    const categories = new Map();
    entries.forEach(item => {
      const categoryName = item.category || 'Menu';
      if (!categories.has(categoryName)) {
        categories.set(categoryName, { category: categoryName, items: [] });
      }
      categories.get(categoryName).items.push(item);
    });
    return [...categories.values()];
  }

  loadMenuJson().then(data => {
    const menuData = normaliseMenuData(data);
    buildMenuIndex(menuData);
    renderMenu(menuData);
    renderPopups(Array.isArray(data?.popups) ? data.popups : []);
    updateOrder();
  });

  // Base WhatsApp URL helper
  function getWhatsAppLink(messageText) {
    const encodedMsg = encodeURIComponent(messageText);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
  }

  const defaultWaMessage = "Hi The Brekkie Club! I'd like to place a pre-order.";
  
  // Set initial links
  document.querySelectorAll('#hero-instagram, #sticky-instagram')
    .forEach(el => el.href = igLink);
  document.getElementById('footer-instagram').href = igProfile;

  // Dom Elements for Order Builder
  const orderBuilder = document.getElementById('order-builder');
  const orderBuilderCount = document.getElementById('order-builder-count');
  const orderBuilderItems = document.getElementById('order-builder-items');
  const orderBuilderPreview = document.getElementById('order-builder-preview-text');
  const copyOrderButton = document.getElementById('copy-order-btn');
  const cookingInstructions = document.getElementById('cooking-instructions');
  const orderBuilderWa = document.getElementById('order-builder-whatsapp');
  const orderBuilderClose = document.getElementById('order-builder-close');
  let isOrderMessageEdited = false;

  function updateOrderLinks(message) {
    const currentWaLink = getWhatsAppLink(message);
    document.querySelectorAll('#menu-whatsapp, #sticky-whatsapp, #footer-whatsapp, #order-builder-whatsapp')
      .forEach(el => {
        if (el) el.href = currentWaLink;
      });
  }

  function messageWithCookingInstructions(message) {
    const instructions = cookingInstructions?.value.trim();
    return instructions
      ? `${message.trim()}\n\nCooking instructions: ${instructions}`
      : message;
  }

  if (orderBuilderPreview) {
    orderBuilderPreview.addEventListener('input', () => {
      isOrderMessageEdited = true;
      updateOrderLinks(messageWithCookingInstructions(orderBuilderPreview.value));
    });
  }

  if (cookingInstructions) {
    cookingInstructions.addEventListener('input', () => {
      updateOrderLinks(messageWithCookingInstructions(orderBuilderPreview?.value || defaultWaMessage));
    });
  }

  if (copyOrderButton && orderBuilderPreview) {
    copyOrderButton.addEventListener('click', async () => {
      const message = messageWithCookingInstructions(orderBuilderPreview.value);
      try {
        await navigator.clipboard.writeText(message);
      } catch {
        orderBuilderPreview.select();
        document.execCommand('copy');
        orderBuilderPreview.setSelectionRange(0, 0);
      }
      copyOrderButton.textContent = 'Copied!';
      window.setTimeout(() => { copyOrderButton.textContent = 'Copy'; }, 1600);
    });
  }

  // Toggle Minimize Order Builder
  let isMinimized = false;
  if (orderBuilderClose) {
    orderBuilderClose.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent trigger when clicking header in minimized state
      isMinimized = !isMinimized;
      if (isMinimized) {
        orderBuilder.classList.add('order-builder--minimized');
      } else {
        orderBuilder.classList.remove('order-builder--minimized');
      }
    });
  }

  // Allow clicking header to restore when minimized
  const orderBuilderHeader = document.querySelector('.order-builder-header');
  if (orderBuilderHeader) {
    orderBuilderHeader.addEventListener('click', () => {
      if (isMinimized) {
        isMinimized = false;
        orderBuilder.classList.remove('order-builder--minimized');
      }
    });
  }

  // Function to build and update the pre-order message
  function updateOrder() {
    let totalItems = 0;
    const selectedItems = [];

    // Count items and format list
    Object.keys(orderState).forEach(id => {
      const qty = orderState[id];
      totalItems += qty;
      if (qty > 0) {
        selectedItems.push({
          id: id,
          name: MENU_BY_ID[id]?.name || id,
          qty: qty
        });
      }
    });

    // Update UI components
    if (orderBuilderCount) orderBuilderCount.textContent = totalItems;

    // Compile message text
    let messageText = defaultWaMessage;
    if (totalItems > 0) {
      const itemListText = selectedItems.map(item => `• ${item.qty}x ${item.name}`).join('\n');
      messageText = `Hi The Brekkie Club! I'd like to place a pre-order:\n\n${itemListText}\n\nPlease confirm!`;
    }

    if (!isOrderMessageEdited && orderBuilderPreview) {
      orderBuilderPreview.value = messageText;
    }
    updateOrderLinks(messageWithCookingInstructions(orderBuilderPreview?.value || messageText));

    // Update Order Builder Drawer UI
    if (totalItems > 0) {
      orderBuilder.classList.add('order-builder--visible');
      
      // Update item list inside builder
      if (orderBuilderItems) {
        orderBuilderItems.innerHTML = selectedItems.map(item => `
          <li>
            <span class="item-name">${item.name}</span>
            <div class="item-action-qty">
              <button class="qty-adjust-btn minus" data-id="${item.id}">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-adjust-btn plus" data-id="${item.id}">+</button>
            </div>
          </li>
        `).join('');

        // Attach listener to builder qty buttons
        orderBuilderItems.querySelectorAll('.qty-adjust-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const isPlus = e.target.classList.contains('plus');
            adjustItemQuantity(id, isPlus ? 1 : -1);
          });
        });
      }

      // Update message preview
    } else {
      orderBuilder.classList.remove('order-builder--visible');
      orderBuilder.classList.remove('order-builder--minimized');
      isMinimized = false;
      isOrderMessageEdited = false;
      if (orderBuilderPreview) orderBuilderPreview.value = defaultWaMessage;
      if (cookingInstructions) cookingInstructions.value = '';
      updateOrderLinks(defaultWaMessage);
    }
  }

  // Adjust item quantity helper
  function adjustItemQuantity(id, delta) {
    const currentQty = orderState[id] || 0;
    const newQty = Math.max(0, currentQty + delta);
    orderState[id] = newQty;

    // Update index page card display
    const itemCard = document.querySelector(`.menu-item-card[data-item-id="${id}"]`);
    if (itemCard) {
      const countEl = itemCard.querySelector('.item-count');
      const minusBtn = itemCard.querySelector('.minus-btn');
      if (countEl) countEl.textContent = newQty;
      if (minusBtn) {
        if (newQty > 0) {
          minusBtn.removeAttribute('disabled');
          itemCard.classList.add('menu-item-card--selected');
        } else {
          minusBtn.setAttribute('disabled', 'true');
          itemCard.classList.remove('menu-item-card--selected');
        }
      }
    }

    updateOrder();
  }

  // Popups rendering
  const featuredWrap = document.getElementById('popup-featured-wrap');
  const list = document.getElementById('popup-list');
  const empty = document.getElementById('popup-empty');

  function mapsLink(name){
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
  }

  function renderPopups(popups) {
    if (featuredWrap) featuredWrap.innerHTML = '';
    if (list) list.innerHTML = '';

    if (!popups.length){
      if (empty) empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';
    const [next, ...rest] = popups;

    if (featuredWrap) {
      featuredWrap.innerHTML = `
        <div class="popup-featured">
          <div>
            <span class="popup-tag">Next Up</span>
            <h3>${next.location}</h3>
            <div class="popup-meta">${next.date} · ${next.time} · ${next.address}</div>
          </div>
          <a class="btn btn-gold" href="${mapsLink(next.location)}" target="_blank" rel="noopener">Get Directions</a>
        </div>
      `;
    }

    if (list) {
      list.innerHTML = rest.map(p => `
        <div class="popup-row">
          <div>
            <div class="popup-row-loc">${p.location}</div>
            <div class="popup-row-date">${p.date} · ${p.time} · ${p.address}</div>
          </div>
          <a href="${mapsLink(p.address)}" target="_blank" rel="noopener">Get directions →</a>
        </div>
      `).join('');
    }
  }
})();
