/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./content/**/*.{html,md}', './layouts/**/*.html'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            pre: {
              backgroundColor: null,
              color: null,
              padding: '1em',
              lineHeight: 1.5,
              marginTop: '1em',
              marginBottom: '1em'
            },
            code: {
              fontWeight: '400'
            },
            a: {
              fontWeight: '400'
            },
            h2: {
              marginTop: '1.5em',
              marginBottom: '1em'
            },
            h3: {
              marginTop: '1.4em',
              marginBottom: '0.6em'
            },
            h4: {
              marginTop: '1.2em',
              marginBottom: '0.5em'
            },
            'thead th': {
              textAlign: 'left'
            },
            'code::before': false,
            'code::after': false
            //'blockquote p:first-of-type::before': false,
            //'blockquote p:last-of-type::after': false,
            //pre: false,
            //code: false
            //'pre code': false
          }
        },
        lg: {
          css: {
            lineHeight: '1.75',
            pre: {
              padding: '1em',
              lineHeight: 1.5,
              margin: 0
            },
            h2: {
              marginTop: '1.5em',
              marginBottom: '1em'
            },
            h3: {
              marginTop: '1.4em',
              marginBottom: '0.6em'
            },
            h4: {
              marginTop: '1.2em',
              marginBottom: '0.5em'
            },
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
