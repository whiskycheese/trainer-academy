module.exports = {
  future: {},
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#DC5F00",
        tertiary: "#CF0A0A",
        quaternary: "#EEEEEE",
      },
      fontFamily: {
        'agbalumo': ['Agbalumo', 'sans-serif']
      },
      backgroundImage: {
        "main-visual": "url('/src/assets/mv-man.jpg')",
        "rock-pattern": "url('/src/assets/black-rock.jpeg')",
        "black-pattern": "url('/src/assets/bg-black.png')",
      },
    },
  },
  variants: {},
  plugins: [],
}