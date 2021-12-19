const hsluv = require('hsluv')

function hsluvaToRgba (h, s, l, a) {
  if (a === undefined) {
    a = 1
  }
  const rgb = hsluv.hsluvToRgb([h, s, l])
  return 'rgba(' +
    (Math.round(255 * rgb[0])) + ', ' +
    (Math.round(255 * rgb[1])) + ', ' +
    (Math.round(255 * rgb[2])) + ', ' +
    a + ')'
}

function genShades (h, s) {
  const res = {}
  for (let i = 1; i < 20; i++) {
    res[50 * i] = hsluv.hsluvToHex([h, s, 100 - 5 * i])
  }
  return res
}

module.exports = {
  content: [
     './static/**/*.{html,js}',
     './content/**/*.{html,js,md}',
     './templates/**/*.{html,js,md}',
   ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    },
    extend: {
      colors: {
        red: genShades(0, 90),
        lred: genShades(0, 50)
      },
      outline: {
        red: '2px solid ' + hsluvaToRgba(10, 20, 50, 1),
        blue: '2px solid ' + hsluvaToRgba(250, 50, 50, 1)
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem'
      },
      width: {
        128: '32rem',
        192: '48rem'
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        condensed: [
          'Open Sans Condensed',
          'Roboto Condensed',
          'AvenirNextCondensed-Bold',
          'Futura-CondensedExtraBold',
          'HelveticaNeue-CondensedBold',
          'Ubuntu Condensed',
          'Liberation Sans Narrow',
          'Franklin Gothic Demi Cond',
          'Arial Narrow',
          'sans-serif-condensed',
          'Arial',
          'Trebuchet MS',
          'Lucida Grande',
          'Tahoma',
          'Verdana',
          'sans-serif'
        ]
      }
    }
  }
}
