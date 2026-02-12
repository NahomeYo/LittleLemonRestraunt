// JavaScript to toggle animations on click

document.addEventListener('DOMContentLoaded', () => {
  const lemonLogos = document.querySelectorAll('.littleLemonLogo');
  const fallingLemons = document.querySelectorAll('.lemonFallAnim');

  // Function to toggle animation classes
  const toggleAnimation = (element, className) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  };

  // Add click event listeners to lemon elements
  lemonLogos.forEach((logo) => {
    logo.addEventListener('click', () => toggleAnimation(logo, 'reverse'));
  });

  fallingLemons.forEach((lemon) => {
    lemon.addEventListener('click', () => toggleAnimation(lemon, 'reverse'));
  });
});