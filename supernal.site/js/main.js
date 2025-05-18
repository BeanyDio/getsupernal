function onScrollShowCards() {
  const cards = document.querySelectorAll('.card');
  const triggerBottom = window.innerHeight * 0.99;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', onScrollShowCards);
window.addEventListener('load', () => {
  setTimeout(onScrollShowCards, 100);
});

window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelector('.hero-title')?.classList.add('show');
  }, 100);
  setTimeout(function() {
    document.querySelector('.hero-subtitle')?.classList.add('show');
  }, 300);
  setTimeout(function() {
    document.querySelector('.hero-btns')?.classList.add('show');
  }, 500);
  setTimeout(function() {
    document.querySelector('.hero-visual')?.classList.add('show');
  }, 700);
});

const downloadButtons = document.querySelectorAll('.download-btn.right-align-btn, .nav-button.download-btn.hero-main-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCancelButton = document.querySelector('.modal-cancel');
const modalCloseButton = document.querySelector('.modal-close');
const modalDownloadButton = document.querySelector('.modal-download'); 

const notificationOverlay = document.querySelector('.notification-overlay');
const notificationCloseButton = document.querySelector('.notification-close');

function openModal() {
    modalOverlay.classList.add('visible');
}

function closeModal() {
    modalOverlay.classList.remove('visible');
}

function openNotificationModal() {
    notificationOverlay.classList.add('visible');
}

function closeNotificationModal() {
    notificationOverlay.classList.remove('visible');
}

downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); 
        openModal();
    });
});

modalCancelButton.addEventListener('click', closeModal);
modalCloseButton.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

modalDownloadButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    closeModal(); 
    openNotificationModal();

    setTimeout(function() {
        window.location.href = 'https://go.linkify.ru/1hg3'; 
    }, 3000); 
});

notificationCloseButton.addEventListener('click', closeNotificationModal);

notificationOverlay.addEventListener('click', function(e) {
    if (e.target === notificationOverlay) {
        closeNotificationModal();
    }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
    }

    if (e.key === 'F12') {
        e.preventDefault();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
    }

    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
         e.preventDefault();
    }
});

// Get the necessary elements
const menuButton = document.querySelector('.menu-button');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const closeMenuButton = document.querySelector('.close-menu');

// Function to open the mobile menu
function openMobileMenu() {
  mobileMenuOverlay.classList.add('visible');
}

// Function to close the mobile menu
function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('visible');
}

// Add event listeners
if (menuButton) {
  menuButton.addEventListener('click', openMobileMenu);
}

if (closeMenuButton) {
  closeMenuButton.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking outside of the menu content
if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', (event) => {
    // Check if the click was directly on the overlay, not the menu content
    if (event.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });
}