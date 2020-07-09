const customColor = {
  primary: {
    1: "#E7FDFC",
    2: "#B7FAF7",
    3: "#87F7F1",
    4: "#58F4EC",
    5: "#28F1E6",
    6: "#0ED7CD",
    7: "#0BA79F",
    8: "#087872",
    9: "#054844"
  },
  neutral: {
    1: "#D9D9D9",
    2: "#BFBFBF",
    3: "#A6A6A6",
    4: "#8C8C8C",
    5: "#737373",
    6: "#595959",
    7: "#404040",
    8: "#262626",
    9: "#0D0D0D"
  }
}

module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      colors: customColor,
      placeholderColor: customColor
    },
    fontFamily: {
      'overpass': 'Overpass, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'open-sans': '"Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }
  },
  variants: ['responsive', 'hover', 'focus', 'group-hover', 'even', 'last', 'disabled'],
  plugins: [],
}
