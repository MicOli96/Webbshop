import { alpha, createTheme } from '@mui/material/styles';

/**
 * Moominvalley palette — pulled from Tove Jansson's watercolour washes
 * (aged paper cream, moss, dusty sky, Little My's berry-red, autumn mustard)
 * rather than a generic brand palette.
 */
export const moomin = {
  cream: '#F2ECDD',
  paper: '#FBF7EC',
  ink: '#2B2A28',
  inkSoft: '#665D53',
  sage: '#6B8068',
  sageDark: '#4F6152',
  sky: '#7FA8B8',
  berry: '#B85C6B',
  mustard: '#D8A73D',
} as const;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: moomin.sage, dark: moomin.sageDark, contrastText: moomin.cream },
    secondary: { main: moomin.berry, contrastText: '#FFFFFF' },
    error: { main: moomin.berry },
    warning: { main: moomin.mustard },
    background: { default: moomin.cream, paper: moomin.paper },
    text: { primary: moomin.ink, secondary: moomin.inkSoft },
    divider: alpha(moomin.ink, 0.12),
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: '"Karla", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 500, letterSpacing: '-0.01em' },
    h2: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 500, letterSpacing: '-0.01em' },
    h3: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 500 },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 500 },
    h5: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    subtitle1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 500 },
    button: { fontFamily: '"Karla", sans-serif', fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: moomin.cream },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: moomin.cream,
          color: moomin.ink,
          borderBottom: `1px solid ${alpha(moomin.ink, 0.1)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 4, boxShadow: 'none', paddingInline: 18 },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': { borderWidth: 1.5 },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: `1px solid ${alpha(moomin.ink, 0.14)}`,
          backgroundColor: moomin.paper,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, color: moomin.inkSoft, borderBottomWidth: 1.5 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: moomin.sage, borderWidth: 1.5 },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `1px solid ${alpha(moomin.ink, 0.14)}`,
          boxShadow: `0 12px 32px ${alpha(moomin.ink, 0.14)}`,
        },
      },
    },
  },
});

export default theme;
