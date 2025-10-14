/** @type {import('tailwindcss').Config} */
exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        dodgerblue: "#0572ce",
        gray: "#23222d",
        slategray: {
          "100": "#6e7391",
          "200": "#637883",
        },
        darkslategray: "#332f2d",
        whitesmoke: {
          "100": "#f9f9f9",
          "200": "#ececec",
        },
        lavender: {
          "100": "#dce9ff",
          "200": "#d4d8ea",
        },
        gainsboro: "#e6e6e6",
        lightsteelblue: "#babfd1",
        royalblue: {
          "100": "#6e82ff",
          "200": "#5e7ff2",
          "300": "#5368e8",
        },
        darkslateblue: {
          "100": "#38355b",
          "200": "#362264",
        },
        black: "#000",
        aliceblue: "#eff5ff",
        dimgray: "#5b5b5b",
        skyblue: "#F3FBFF"
      },
      spacing: {},
      fontFamily: {
        lato: "Lato",
        poppins: "Poppins",
        inter: "Inter",
      },
      borderRadius: {
        "8xs": "5px",
        "11xl": "30px",
        "3xs": "10px",
        "6xl": "25px",
      },
    },
    fontSize: {
      lg: "18px",
      sm: "14px",
      mini: "15px",
      base: "16px",
      "13xl": "32px",
      lgi: "19px",
      "7xl": "26px",
      xl: "20px",
      xs: "12px",
      "2xs": "11px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq975: {
        raw: "screen and (max-width: 975px)",
      },
      mq950: {
        raw: "screen and (max-width: 950px)",
      },
      mq835: {
        raw: "screen and (max-width: 835px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq700: {
        raw: "screen and (max-width: 700px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};