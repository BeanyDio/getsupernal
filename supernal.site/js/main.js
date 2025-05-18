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

// --- OS Detection and Download Button Handling ---

function getOS() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  let os = 'Other'; // Default to Other

  if (/Windows NT/.test(userAgent)) {
    os = 'Windows';
  } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) {
    os = 'MacOS';
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    os = 'iOS';
  } else if (/Android/.test(userAgent)) { // Проверяем userAgent для Android
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  } else if (/CrOS/.test(userAgent)) {
    os = 'Chrome OS';
  } else {
    os = 'Other';
  }

  return os;
}

const userOS = getOS();
// Обновленный селектор для всех кнопок скачивания
const downloadButtonsToDisable = document.querySelectorAll(
  '.download-btn,' +
  ' .modal-download,' +
  ' .card-footer .btn-primary' // Добавляем кнопку в футере карточек
);

if (userOS !== 'Windows') {
  downloadButtonsToDisable.forEach(button => {
    button.classList.add('download-disabled');

    const originalText = button.textContent.trim();
     // Проверяем, чтобы не добавлять текст "Not Supported" повторно
    if (!originalText.includes('Not Supported')) {
      // Сохраняем оригинальный текст в data-атрибут, если нужно будет его вернуть
      button.setAttribute('data-original-text', originalText);
      button.textContent = `Not Supported: ${userOS}`;
    }


    // Prevent click action
    const preventDownload = function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent other click listeners from firing
      console.log(`Download not supported on ${userOS}`);
    };

    // Add event listener to prevent download. Use capture phase to run before other listeners.
    // Проверяем, чтобы не добавлять обработчик повторно
    if (!button.hasAttribute('data-download-prevented')) {
        button.addEventListener('click', preventDownload, true);
        button.setAttribute('data-download-prevented', 'true');
    }


    // Also disable href for anchor tags
    if (button.tagName === 'A') {
        // Проверяем, чтобы не сохранять href повторно
        if (!button.hasAttribute('data-href')) {
            button.setAttribute('data-href', button.getAttribute('href')); // Store original href
        }
        button.removeAttribute('href'); // Remove href
    }

  });

    // Удаляем существующие обработчики клика для кнопок скачивания, если они не нужны
    // в случае отключения.
    // Находим кнопки по тем же селекторам, что и downloadButtons ранее.
    const heroDownloadButtons = document.querySelectorAll('.nav-button.download-btn.hero-main-btn, .download-btn.right-align-btn');

    heroDownloadButtons.forEach(button => {
      // Проверяем, отключена ли кнопка
      if (button.classList.contains('download-disabled')) {
        // Если кнопка отключена, удаляем или переопределяем обработчик, открывающий модальное окно
        // Простой способ: переопределить onclick, если он есть
        if (button.onclick) {
            button.onclick = function(e) {
                 e.preventDefault();
                 e.stopPropagation();
                 console.log(`Download not supported on ${userOS}`);
            };
        }
        // Также можно попытаться удалить конкретный listener, если мы его добавляли ранее
        // Например: button.removeEventListener('click', openModal);
        // Но переопределение onclick часто проще, если нет сложных цепочек listeners
      }
    });

   // Модифицируем обработчик кнопки в модальном окне, если он отключен
    if (modalDownloadButton && modalDownloadButton.classList.contains('download-disabled')) {
       modalDownloadButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log(`Download not supported on ${userOS}`);
      };
    }
}