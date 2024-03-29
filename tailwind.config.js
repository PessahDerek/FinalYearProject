/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'spin': "spin 0.3s linear infinite"
            },
            colors: {
                'base': {
                    DEFAULT: '#D4DEF7',
                    50: '#FBFCFE',
                    100: '#F6F8FD',
                    200: '#EEF2FC',
                    300: '#E5EBFA',
                    400: '#DDE5F9',
                    500: '#D4DEF7',
                    600: '#A5BBEE',
                    700: '#7597E6',
                    800: '#4673DD',
                    900: '#2455C6',
                    950: '#204BAF'
                },
                'primary': {
                    DEFAULT: '#0A2647',
                    50: '#287DE1',
                    100: '#1E73D6',
                    200: '#195FB2',
                    300: '#144C8F',
                    400: '#0F396B',
                    500: '#0A2647',
                    600: '#030C16',
                    700: '#000000',
                    800: '#000000',
                    900: '#000000',
                    950: '#000000'
                },
                'secondary': {
                    DEFAULT: '#26C485',
                    50: '#B2F0D7',
                    100: '#A1EDCE',
                    200: '#7EE6BD',
                    300: '#5CDFAB',
                    400: '#3AD999',
                    500: '#26C485',
                    600: '#1D9565',
                    700: '#146645',
                    800: '#0B3725',
                    900: '#020805',
                    950: '#000000'
                },
                'accent': {
                    DEFAULT: '#9B5DE5',
                    50: '#FDFBFE',
                    100: '#F2EAFC',
                    200: '#DCC6F6',
                    300: '#C6A3F0',
                    400: '#B180EB',
                    500: '#9B5DE5',
                    600: '#7D2DDD',
                    700: '#621DB5',
                    800: '#481584',
                    900: '#2E0D54',
                    950: '#210A3C'
                },
                'red': {
                    DEFAULT: '#DF2935',
                    50: '#F7C9CC',
                    100: '#F4B7BB',
                    200: '#EF939A',
                    300: '#EA7078',
                    400: '#E44C57',
                    500: '#DF2935',
                    600: '#B51B25',
                    700: '#84141B',
                    800: '#530C11',
                    900: '#220507',
                    950: '#0A0202'
                },
                'black': {
                    DEFAULT: '#0D1B1E',
                    50: '#458E9E',
                    100: '#3E8190',
                    200: '#326873',
                    300: '#264E57',
                    400: '#19353A',
                    500: '#0D1B1E',
                    600: '#000000',
                    700: '#000000',
                    800: '#000000',
                    900: '#000000',
                    950: '#000000'
                },
            },
        },
    },
    plugins: [],
}

