import { createMuiTheme } from "@material-ui/core/styles";
import { content } from './content'

const { color } = content
const defaultTheme = createMuiTheme({})
const { breakpoints, typography: { pxToRem }, palette } = defaultTheme
const theme = createMuiTheme({
    ...defaultTheme,
    typography: {
        subtitle1: {
            fontSize: 12,
        },
        body1: {
            fontWeight: 500,
        },
        h1: {
            fontSize: "5rem",
            [breakpoints.down("xs")]: {
                fontSize: "3rem"
            }
        }
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: color.primary,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            //light: '#0066ff',
            main: color.secondary,
            // dark: will be calculated from palette.secondary.main,
            // contrastText: '#ffcc00',
        },
    }
    // overrides: {

    //     MuiTypography: {

    //         h1: {
    //             fontSize: "5rem",
    //             [breakpoints.down("xs")]: {
    //                 fontSize: "3rem"
    //             }
    //         },

    //     },
    // },
    // palette: {
    //     primary: {
    //         // light: will be calculated from palette.primary.main,
    //         main: '#669933',
    //         // dark: will be calculated from palette.primary.main,
    //         // contrastText: will be calculated to contrast with palette.primary.main
    //     },
    //     secondary: {
    //         //light: '#0066ff',
    //         main: '#00bcd4',
    //         // dark: will be calculated from palette.secondary.main,
    //         contrastText: '#ffcc00',
    //     },
    //     // error: will use the default color
    // },

});

// const theme = {
//     ...defaultTheme,
//     overrides: {
//         MuiTypography: {
//             h1: {
//                 fontSize: "5rem",
//                 [breakpoints.down("xs")]: {
//                     fontSize: "3rem"
//                 }
//             }
//         },
//         palette: {
//             primary: pink,
//             secondary: indigo 
//         },
//     }
// }

export default theme