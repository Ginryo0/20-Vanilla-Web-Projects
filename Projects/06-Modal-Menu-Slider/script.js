const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal'); // this is actually the backdrop

let nav_shown = 0;
// Toggling nav
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
  // let width =
  //   nav_shown % 2 == 0 ? `${document.body.clientWidth - 200}px` : '100%';
  // document.body.style.width = width;
  // nav_shown++;
});

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

//Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on backdrop click
window.addEventListener('click', (e) =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);
