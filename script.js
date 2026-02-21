window.addEventListener('DOMContentLoaded', () => {
  const chk = document.getElementById('chk');

  chk.addEventListener('change', () => {
    document.body.classList.toggle('claro');
  });
});

const titulo = document.querySelector('.titulo');
type(titulo)

function type(element) {
  const nextFrase = element.innerHTML.split('');
  element.innerHTML = '';

  nextFrase.forEach((item, i) => {
    setTimeout(() => element.innerHTML =
  element.innerHTML + item, i * 200)
  })

}