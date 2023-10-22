const header = document.getElementById('header')

const startColor = [100, 255, 100, 0.4]
const endColor = [40, 40, 40, 1]

function lerpColor(alpha) {
  const r = (endColor[0] - startColor[0]) * alpha + startColor[0]
  const g = (endColor[1] - startColor[1]) * alpha + startColor[1]
  const b = (endColor[2] - startColor[2]) * alpha + startColor[2]
  const a = (endColor[3] - startColor[3]) * alpha + startColor[3]

  return [r, g, b, a]
}

function getAlpha(element, rectHeightOffset, offset) {
  const rect = element.getBoundingClientRect()
  const dist = rect.top * -1 + 50 + (offset || 0)
  let a = 0
  if (dist < 0) {
    a = 0
  } else if (dist > rect.height - (rectHeightOffset || 0)) {
    a = 1
  } else {
    a = dist / (rect.height - (rectHeightOffset || 0))
  }

  return a
}

function scrolled() {
  const alpha = getAlpha(header, 50)
  const color = lerpColor(alpha)
  header.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
  header.style.backdropFilter = `blur(${(15 - 2) * alpha + 2}px)`

  const tableItems = Array.from(document.querySelectorAll('.element table tr'))
  for (const key in tableItems) {
    tableItems[key].style.opacity = getAlpha(tableItems[key], 0, window.innerHeight - 100)
  }

  const hrItems = Array.from(document.querySelectorAll('.element-divider hr'))
  for (const key in hrItems) {
    hrItems[key].style.width = (1 - hrItems[key].getBoundingClientRect().top / (window.innerHeight - 50)) * (window.innerWidth - 60) + 50 + "px"
  }
}

scrolled()

window.addEventListener("scroll", scrolled)
window.addEventListener("resize", scrolled)

const navButtons = Array.from(document.querySelectorAll('nav button'))
for (const key in navButtons) {
  navButtons[key].addEventListener('click', () => {
    const heading = document.getElementById('heading-' + navButtons[key].innerText.replaceAll(' ', '').toLowerCase())
    if (heading) {
      window.scrollTo({
        top: heading.getBoundingClientRect().top + window.scrollY - 50,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  })
}
