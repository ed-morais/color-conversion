// Funções de conversão entre sistemas de cores

// Converte RGB para Hexadecimal
function rgbToHex (r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// Converte Hexadecimal para RGB
function hexToRgb (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

// Converte RGB para HSL
function rgbToHsl (r, g, b) {
  // Normaliza os valores RGB para o intervalo [0, 1]
  ;(r /= 255), (g /= 255), (b /= 255)
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  var h,
    s,
    l = (max + min) / 2

  if (max == min) {
    h = s = 0 // acromático
  } else {
    var d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  // Retorna os valores HSL arredondados
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

// Converte HSL para RGB
function hslToRgb (h, s, l) {
  // Normaliza os valores HSL
  h /= 360
  s /= 100
  l /= 100
  var r, g, b

  if (s == 0) {
    r = g = b = l // acromático
  } else {
    // Função auxiliar para calcular os valores RGB
    function hue2rgb (p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s
    var p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  // Retorna os valores RGB arredondados
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

// Converte RGB para HSV
function rgbToHsv (r, g, b) {
  // Normaliza os valores RGB para o intervalo [0, 1]
  ;(r /= 255), (g /= 255), (b /= 255)
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  var h,
    s,
    v = max

  var d = max - min
  s = max == 0 ? 0 : d / max

  if (max == min) {
    h = 0 // acromático
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  // Retorna os valores HSV arredondados
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  }
}

// Converte HSV para RGB
function hsvToRgb (h, s, v) {
  // Normaliza os valores HSV
  h /= 360
  s /= 100
  v /= 100
  var r, g, b

  var i = Math.floor(h * 6)
  var f = h * 6 - i
  var p = v * (1 - s)
  var q = v * (1 - f * s)
  var t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      ;(r = v), (g = t), (b = p)
      break
    case 1:
      ;(r = q), (g = v), (b = p)
      break
    case 2:
      ;(r = p), (g = v), (b = t)
      break
    case 3:
      ;(r = p), (g = q), (b = v)
      break
    case 4:
      ;(r = t), (g = p), (b = v)
      break
    case 5:
      ;(r = v), (g = p), (b = q)
      break
  }

  // Retorna os valores RGB arredondados
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

// Converte RGB para CMYK
function rgbToCmyk (r, g, b) {
  // Normaliza os valores RGB para o intervalo [0, 1]
  r /= 255
  g /= 255
  b /= 255

  var k = 1 - Math.max(r, g, b)
  var c = (1 - r - k) / (1 - k)
  var m = (1 - g - k) / (1 - k)
  var y = (1 - b - k) / (1 - k)

  // Retorna os valores CMYK arredondados em porcentagem
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  }
}

// Converte CMYK para RGB
function cmykToRgb (c, m, y, k) {
  // Normaliza os valores CMYK para o intervalo [0, 1]
  c /= 100
  m /= 100
  y /= 100
  k /= 100

  // Calcula os valores RGB
  var r = 255 * (1 - c) * (1 - k)
  var g = 255 * (1 - m) * (1 - k)
  var b = 255 * (1 - y) * (1 - k)

  // Retorna os valores RGB arredondados
  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b)
  }
}

// Função auxiliar para limitar valores dentro de um intervalo
function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

// Função principal para atualizar a visualização da cor
function updateColorPreview (event) {
  let r, g, b
  // Identifica qual seção (sistema de cores) foi alterada
  const targetSection = event.target.closest('section')

  // Determina qual sistema de cores foi alterado e converte para RGB
  switch (targetSection.id) {
    case 'rgb-section':
      // Lê os valores RGB diretamente, aplicando limites
      r = clamp(parseInt(document.getElementById('red').value) || 0, 0, 255)
      g = clamp(parseInt(document.getElementById('green').value) || 0, 0, 255)
      b = clamp(parseInt(document.getElementById('blue').value) || 0, 0, 255)
      break
    case 'hsl-section':
      // Lê os valores HSL, aplica limites e converte para RGB
      const h = clamp(
        parseInt(document.getElementById('hue').value) || 0,
        0,
        360
      )
      const s = clamp(
        parseInt(document.getElementById('hsl-saturation').value) || 0,
        0,
        100
      )
      const l = clamp(
        parseInt(document.getElementById('lightness').value) || 0,
        0,
        100
      )
      const rgbFromHsl = hslToRgb(h, s, l)
      r = rgbFromHsl.r
      g = rgbFromHsl.g
      b = rgbFromHsl.b
      break
    case 'hsv-section':
      // Lê os valores HSV, aplica limites e converte para RGB
      const hv = clamp(
        parseInt(document.getElementById('hsv-hue').value) || 0,
        0,
        360
      )
      const sv = clamp(
        parseInt(document.getElementById('hsv-saturation').value) || 0,
        0,
        100
      )
      const v = clamp(
        parseInt(document.getElementById('value').value) || 0,
        0,
        100
      )
      const rgbFromHsv = hsvToRgb(hv, sv, v)
      r = rgbFromHsv.r
      g = rgbFromHsv.g
      b = rgbFromHsv.b
      break
    case 'cmyk-section':
      // Lê os valores CMYK, aplica limites e converte para RGB
      const c = clamp(
        parseInt(document.getElementById('cyan').value) || 0,
        0,
        100
      )
      const m = clamp(
        parseInt(document.getElementById('magenta').value) || 0,
        0,
        100
      )
      const y = clamp(
        parseInt(document.getElementById('yellow').value) || 0,
        0,
        100
      )
      const k = clamp(
        parseInt(document.getElementById('key').value) || 0,
        0,
        100
      )
      const rgbFromCmyk = cmykToRgb(c, m, y, k)
      r = rgbFromCmyk.r
      g = rgbFromCmyk.g
      b = rgbFromCmyk.b
      break
  }

  // Atualiza a visualização da cor
  document.getElementById(
    'color-preview'
  ).style.backgroundColor = `rgb(${r}, ${g}, ${b})`

  // Atualiza todos os valores em todos os sistemas de cores
  updateAllColorValues(r, g, b, targetSection.id)
}

// Função para atualizar todos os valores em todos os sistemas de cores
function updateAllColorValues (r, g, b, excludeSection) {
  // Atualiza os campos RGB, se não for a seção excluída
  if (excludeSection !== 'rgb-section') {
    document.getElementById('red').value = r
    document.getElementById('green').value = g
    document.getElementById('blue').value = b
  }

  // Atualiza os campos HSL, se não for a seção excluída
  if (excludeSection !== 'hsl-section') {
    const hsl = rgbToHsl(r, g, b)
    document.getElementById('hue').value = hsl.h
    document.getElementById('hsl-saturation').value = hsl.s
    document.getElementById('lightness').value = hsl.l
  }

  // Atualiza os campos HSV, se não for a seção excluída
  if (excludeSection !== 'hsv-section') {
    const hsv = rgbToHsv(r, g, b)
    document.getElementById('hsv-hue').value = hsv.h
    document.getElementById('hsv-saturation').value = hsv.s
    document.getElementById('value').value = hsv.v
  }

  // Atualiza os campos CMYK, se não for a seção excluída
  if (excludeSection !== 'cmyk-section') {
    const cmyk = rgbToCmyk(r, g, b)
    document.getElementById('cyan').value = cmyk.c
    document.getElementById('magenta').value = cmyk.m
    document.getElementById('yellow').value = cmyk.y
    document.getElementById('key').value = cmyk.k
  }
}

// Adiciona eventos de input a todos os campos de entrada numérica
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('input', updateColorPreview)
})

// Inicializa a visualização da cor com preto (0, 0, 0)
updateAllColorValues(0, 0, 0, '')
