module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      borderColor: {
        e4a788: '#e4a788',
      },
      colors: {
        dark: '#333333', // Define your dark mode background color
        brown: {
          '500': '#44281d',
          '700': '#3b221a',
        },
        e4a788: '#e4a788',
      },
    },
  },
  variants: {},
  plugins: [],
};