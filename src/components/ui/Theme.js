import { createTheme } from '@material-ui/core/styles';
 
const arcBlack = '#07090a';
const arcOrange = '#FFBA60';
const arcGrey ='##fafafa'
 
export default createTheme({
  palette: {
    common: {
      black: arcBlack,
      orange: arcOrange
    },
    primary: {
      main: arcBlack
    },
    secondary: {
      main: arcOrange
    }
  },
  typography:{
      tab:{
        fontFamily:'Raleway',
        textTransform:'none',
        fontWeight:700,
        fontSize:'1rem',
        color:'white'
      },
      estimate:{
        fontFamily:'Raleway',
        fontSize:'1rem',
        textTransform:'none',
        color:'white'
      },
      h2:{
        fontFamily:'Raleway',
        fontWeight:700,
        fontSize:'2.5rem',
        color:arcBlack,
        lineHeight:1.5
      },
      h3: {
        fontFamily: "Raleway",
        fontSize: "2.5rem",
        color: arcBlack
      },
      h4:{
        fontFamily:'Raleway',
        fontSize:'1.75rem',
        color:arcBlack,
        fontWeight:700
      },
      subtitle1:{
        fontSize:'1.25rem',
        fontWeight:300,
        color:arcGrey
      },
      subtitle2: {
        color: "white",
        fontWeight: 300,
        fontSize: "1.25rem"
      },
      body1: {
        fontSize: "1.25rem",
        color: arcGrey,
        fontWeight: 300
      },
      caption: {
        fontSize: "1rem",
        fontWeight: 300,
        color: arcGrey
      },
      learnButton: {
        borderColor: arcBlack,
        borderWidth: 2,
        textTransform: "none",
        color: arcBlack,
        borderRadius: 50,
        fontFamily: "Roboto",
        fontWeight: "bold"
      }
  },
  overrides :{
    MuiInputLabel:{
      root:{
        color:arcBlack,
        fontSize:'1rem'
      }
    },
    MuiInput:{
      root: {
        color: arcGrey,
        fontWeight: 300
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcBlack}`
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${arcBlack}`
        }
      }
    }
  }
});
