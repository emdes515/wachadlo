const pendulum = document.getElementById('pendulum')
const spren = document.getElementById('spren')
const math = document.getElementById('math')

const liczBtn = document.getElementById('licz')
const clearBtn = document.getElementById('clear')

const l = document.getElementById('l')
const g = document.getElementById('g')
const Tm = document.getElementById('Tm')
const fm = document.getElementById('fm')

const m = document.getElementById('m')
const k = document.getElementById('k')
const Ts = document.getElementById('Tm')
const fs = document.getElementById('fs')

clearBtn.addEventListener('click', () => {
  l.value = ''
  g.value = ''
  Tm.value = ''
  fm.value = ''

  m.value = ''
  k.value = ''
  Ts.value = ''
  fs.value = ''
})

let pendulumType = 'matematyczne'

pendulum.addEventListener('change', (event) => {
  spren.classList.toggle('doNotDisplay')
  math.classList.toggle('doNotDisplay')

  pendulumType = event.target.value
})

liczBtn.addEventListener('click', () => {
  if (pendulumType === 'matematyczne') {
    const result = countTypeMath({
      l: l.value,
      g: g.value,
      T: Tm.value,
      f: fm.value,
    })

    l.value = result.l
    g.value = result.g
    Tm.value = result.T
    fm.value = result.f
  } else {
    const result = conutTypeSpren({
      m: m.value,
      k: k.value,
      T: Ts.value,
      f: fs.value,
    })

    if (!result.msg) {
      m.value = result.m
      k.value = result.k
      Ts.value = result.T
      fs.value = result.f
    }
  }
})

function countTypeMath({ l, g, T, f }) {
  let missing = []
  if (!l) missing.push('l')
  if (!g) missing.push('g')
  if (!T) missing.push('T')
  if (!f) missing.push('f')

  if (missing.length !== 2) {
    console.log('Niepoprawne dane wejściowe.')
    return
  }

  if (missing.includes('l') && missing.includes('g')) {
    l = Math.pow((2 * Math.PI) / T, 2) * g
    g = l / Math.pow((2 * Math.PI) / T, 2)
  } else if (missing.includes('l') && missing.includes('T')) {
    l = Math.pow((2 * Math.PI) / T, 2) * g
    T = 2 * Math.PI * Math.sqrt(l / g)
  } else if (missing.includes('l') && missing.includes('f')) {
    l = Math.pow(1 / f, 2) * g
    f = 1 / T
  } else if (missing.includes('g') && missing.includes('T')) {
    g = l / Math.pow((2 * Math.PI) / T, 2)
    T = 2 * Math.PI * Math.sqrt(l / g)
  } else if (missing.includes('g') && missing.includes('f')) {
    f = 1 / T
    g = Math.pow(1 / f, 2) * l
  } else if (missing.includes('T') && missing.includes('f')) {
    f = 1 / T
    T = 1 / f
    g = Math.pow(1 / f, 2) * l
  }

  parseFloat(l).toFixed(5)
  parseFloat(g).toFixed(5)
  parseFloat(T).toFixed(5)
  parseFloat(f).toFixed(5)

  return { l, g, T, f }
}

function conutTypeSpren({ m, k, T, f }) {
  let brakujace = []
  if (!m) brakujace.push('m')
  if (!k) brakujace.push('k')
  if (!T) brakujace.push('T')
  if (!f) brakujace.push('f')

  if (brakujace.length !== 2) {
    console.log('Niepoprawne dane wejściowe.')
    return
  }

  if (brakujace.includes('m') && brakujace.includes('k')) {
    m = Math.pow((2 * Math.PI) / T, 2) * k
    k = m / Math.pow((2 * Math.PI) / T, 2)
  } else if (brakujace.includes('m') && brakujace.includes('T')) {
    m = Math.pow((2 * Math.PI) / T, 2) * k
    T = 2 * Math.PI * Math.sqrt(m / k)
  } else if (brakujace.includes('m') && brakujace.includes('f')) {
    m = Math.pow(1 / f, 2) * k
    f = 1 / T
  } else if (brakujace.includes('k') && brakujace.includes('T')) {
    k = m / Math.pow((2 * Math.PI) / T, 2)
    T = 2 * Math.PI * Math.sqrt(m / k)
  } else if (brakujace.includes('k') && brakujace.includes('f')) {
    f = 1 / T
    k = Math.pow(1 / f, 2) * m
  } else if (brakujace.includes('T') && brakujace.includes('f')) {
    f = 1 / T
    T = 1 / f
    k = Math.pow(1 / f, 2) * m
  }

  return { m, k, T, f }
}
