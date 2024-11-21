// colorSchemes.js

const colors = {
    spaceblue: "#005f99",
    spacegray: "#262626",
    white: "#ffffff",
    black: "#000000",
    snow: "#f9f9f9",
    gray: "808080",
    gray2: "333333",
    grayTransparent: "rgba(128, 128, 128, 0.5)",
    green: "green",
    red: "red"
};

export const colorSchemes = {
    default: {
        primary: colors.white,
        secondary: colors.spaceblue,
        background: colors.spacegray,
        header: colors.gray,
        shadow: colors.grayTransparent,
        text: colors.snow,
        highlight: colors.spaceblue,
        disabled: colors.gray,
        success: colors.green,
        failure: colors.red
    },
    highContrast: {
        primary: colors.black,
        secondary: colors.gray,
        background: colors.snow,
        shadow: colors.gray2,
        text: colors.black,
        highlight: colors.spaceblue,
        disabled: colors.gray
    },
};

export function applyScheme(scheme) {
    const root = document.documentElement;
    Object.entries(scheme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
}