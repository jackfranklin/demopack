import niceDog from './nice-dog.jpg'

const div = document.createElement('div')
div.classList.add('app-root')
div.innerHTML = 'I did this in Demopack!'

const img = document.createElement('img')
img.src = niceDog
img.alt = 'This dog is well nice'
img.width = 600

div.appendChild(img)

document.body.appendChild(div)
