/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1F3F6E",
        accent: "#F5B301",
        surface: "#EAF3FB",
        muted: "#7A8494",
        success: "#2E9E5B",
        warning: "#E8952B",
        line: "#D5DEE8",
        field: "#9AA3B2",
        info: "#1A6FE0",
        "info-bg": "#E3F0FF",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
    },
  },
};
