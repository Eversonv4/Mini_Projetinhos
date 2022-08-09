const acordeon = document.querySelectorAll('.contentBox')

for (i = 0; i < acordeon.length; i++) {
  acordeon[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}
