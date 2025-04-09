import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = {
    initialColorMode: { value: "light" },
    breakpoints: {
        base: { value: "0px" },
        xs: { value: "360px" },
        sm: { value: "480px" },
        md: { value: "768px" },
        lg: { value: "1024px" },
        xl: { value: "1280px" },
    },
    useSystemColorMode: false,
    colors: {
        fika: {
            black: { value: "#000" },
            white: { value: "#FFFFFF" },
            sky: {
                300: { value: "#30E3F7" },
                400: { value: "#28A9B8" },
            },
            add: {
                200: { value: "#EEEEEE" },
                250: { value: "#CACACA" },
                300: { value: "#BFBFBF" },
            },
            gray: {
                50: { value: "#F6F6F6" },
                100: { value: "#d9d9d9" },
                150: { value: "#c8c8c8" },
                200: { value: "#A6A6A6" },
                300: { value: "#8F8F8F" },
                400: { value: "#4A4A4A" },
                500: { value: "#747775" },
            },
            green: {
                100: { value: "#B9FFC4" },
                200: { value: "#00FF99" },
                300: { value: "#00B284" },
            },
            orange: {
                100: { value: "#FFE4D8" },
                300: { value: "#FF4D00" },
            },
            pink: {
                50: { value: "#FFFCFE" },
                100: { value: "#FFF5FC" },
                200: { value: "#FFDAEC" },
                300: { value: "#FF82BE" },
                400: { value: "#FC3394" },
                500: { value: "#FF176A" },
                600: { value: "#D23882" },
            },
            blue: {
                50: { value: "#EDF2F7" },
                100: { value: "#B9DCFF" },
                200: { value: "#779BFF" },
                300: { value: "#0075FF" },
            },
            red: {
                100: { value: "#FED7D7" },
                200: { value: "#FF7979" },
                300: { value: "#FF0000" },
            },
            yellow: {
                300: { value: "#FFCD00" },
            },
            purple: {
                200: { value: "#E3D3FF" },
                400: { value: "#3A0099" },
            },
            line: {
                200: { value: "#E0E0E0" },
            },
        },
    },
    fonts: {
        heading: {
            value: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        },
        body: {
            value: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        },
    },
    styles: {
        global: {
            "*::selection": {
                color: { value: "{colors.fika.white}" },
                background: { value: "{colors.fika.pink.300}" },
            },
        },
    },
};

const semanticConfig = {
    colors: {}
};

export const chakraTheme = createSystem(
    defaultConfig,
    defineConfig({
        theme: {
            tokens: {
                ...config,
            },
            semanticTokens: {
                ...semanticConfig,
            },
            recipes: {
            },
        },
    }),
);
