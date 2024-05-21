const palette = {
  //Whites and greys
  neutral100: "#FFFBFB",
  neutral200: "#E9E8E8",
  neutral300: "#E3E3E3",
  neutral400: "#ADABAB",
  neutral500: "#D3D3D3",
  neutral600: "#D9D9D9",
  neutral700: "#747474",

  //Main color, same color of logo
  primary100: "#E53A12",
  primary200: "#F19C88",
  //Secondary color
  secondary100: "#3A7ED7",

  //Blacks
  black100: "#323232",
  //Whites
  white: "#FFFF"
} as const;

export const colors = {
  palette,

  transparent: "rgba(0, 0, 0, 0)",
  main: palette.primary100,
  text: palette.black100,

  contest:palette.primary200,
  dateText: palette.neutral700,
  neutral05: palette.neutral500,

  textDim: palette.primary100,
  secondary: palette.secondary100,

  secondarytext: palette.neutral400,

  background: palette.neutral100,
};
