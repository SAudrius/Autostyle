import type { Config } from 'tailwindcss';


const config = {
    darkMode: [ "class" ],
    content: [ "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}" ],
    prefix: "",
    theme: {
        screens: {
            sm: "555px",
            md: "768px",
            lg: "1200px",
            xl: "1440px",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                md: "4rem",
                lg: "4rem",
                xl: "7.5rem",
            },
        },
        extend: {
            fontFamily: {
                nunito: [ "NunitoSans_10pt-Light" ],
            },
            colors: {
                primary: "#7DFFFF",
                "primary-dark": "#4BCCD2",
                "neutral-900": "#000000",
                "neutral-800": "#161C1D",
                "neutral-500": "#9D9D9D",
                "neutral-100": "#F1F9F9",
                "neutral-000": "#ffffff",
                "shade":"#F2F7F7"
            },
            letterSpacing: {
                tight: "0.25em",
                normal: "0.25em",
                "wide-6": "0.06em",
                "wide-10": "0.10em",
                "wide-12": "0.12em",
                "wide-20": "0.2em",
                "wide-24": "0.24em",
            },
            dropShadow: {
                text: "0 1px 2px rgba(0, 0, 0, 0.25)",
            },
            keyframes: {
                shine: {
                    to: {
                        "background-position-x": "-200%",
                    },
                },
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                'line-by-line': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                loading: "shine 0.75s linear infinite",
                'line-by-line': 'line-by-line 0.35s ease-in-out',
            },
            transitionProperty: {
                'height-visibility': 'height, visibility',
            },
            transitionDuration: {
                '350': '350ms',
            },
            transitionDelay: {
                '350': '350ms',
            },
            backgroundImage: {
                'discovery-gradient': 'linear-gradient(to bottom, rgba(125, 255, 255, 0.02), rgba(75, 204, 210, 0.22))',
            },
        },
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function ( { addComponents }: any ) {
            addComponents( {
                '.container-v2': {
                    maxWidth: '100%',
                    margin: "0 auto",
                    padding: '0 1rem',
                    '@screen sm': {
                        margin: "0 auto",
                        padding: '0 1.5rem',
                    },
                    '@screen md': {
                        margin: "0 auto",
                        padding: '0 2rem',
                    },
                    '@screen lg': {
                        maxWidth: '1328px',
                        margin: "0 auto",
                        padding: '0 4rem',
                    },
                    '@screen xl': {
                        maxWidth: '1440px',
                        margin: "0 auto",
                        padding: '0 7.5rem',
                    },
                },
                '.container-search': {
                    maxWidth: '100%',
                    margin: "0 auto",
                    padding: '0 1rem',
                    '@screen sm': {
                        // maxWidth: '',
                        margin: "0 auto",
                        padding: '0 1.5rem',
                    },
                    '@screen md': {
                        // maxWidth: '200px',
                        margin: "0 auto",
                        padding: '0 2rem',
                    },
                    '@screen lg': {
                        maxWidth: '1200px',
                        margin: "0 auto",
                        padding: '0 2rem',
                    },
                    '@screen xl': {
                        maxWidth: '1440px',
                        margin: "0 auto",
                        padding: '0 2rem',
                    },
                },
            } );
        },
    ],
} satisfies Config;

export default config;
