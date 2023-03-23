import {signInWithGoogle,signInWithEmailAndPassword,auth} from "../firebase";
import { Button,Grid,useTheme,useMediaQuery,makeStyles,Typography,TextField,CircularProgress,Snackbar } from '@material-ui/core';
import React,{useState,useEffect} from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
    },
    sendButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        height:45,
        width:245,
        fontSize:'1rem',
        marginBottom:'3em',
        backgroundColor:theme.palette.common.orange,
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225
          }
    }
  }));


export default function Login(){

    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    


 
  
    const [loginEmail, setLoginloginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user,setUser] = useState('')


    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
        if (user) {
        setUser(user);
        console.log(user['_delegate']['email']);
        } else {
        setUser("")
        }
        })
    }

    useEffect(() => {
        authListener();
    })

    const buttonContents = (
        <React.Fragment>
          Submit
        </React.Fragment>
      );

      const buttonGoogle = (
        <React.Fragment>
          Sign In with Google
        </React.Fragment>
      );

    if(user){
    return (
        <Grid 
        container 
        direction='column' 
        justifyContent='center'
        style={{
            marginTop:matchesSM ? '4em'  : matchesMD ? '5em' : undefined,
            marginBottom: matchesMD ? '5em' : undefined
        }}
    >
        <Grid item>
            <Grid item container direction='column' style={{alignItems:'center'}}>
                <Grid item>
                    <Typography 
                        variant='h3'
                        align= 'center'
                        style={{lineHeight:1}}
                    >
                        Log in
                    </Typography>
                </Grid>
                <Grid 
                    item 
                >
                    <Typography style={{color:theme.palette.common.blue}}>Log in Successfully!</Typography>

            </Grid>
            </Grid>
        </Grid>
    </Grid>
    );
    }
    else{
        return (
            <Grid 
            container 
            direction='column' 
            justifyContent='center'
            style={{
                marginTop:matchesSM ? '4em'  : matchesMD ? '5em' : undefined,
                marginBottom: matchesMD ? '5em' : undefined
            }}
        >
            <Grid item>
                <Grid item container direction='column' style={{alignItems:'center'}}>
                    <Grid item>
                        <Typography 
                            variant='h3'
                            align= 'center'
                            style={{lineHeight:1}}
                        >
                            Log-in
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                        container
                        direction='column' 
                        style={{maxWidth:matchesXS ? '20em' : matchesSM? '25em' :'40em'}}
                    >
                        
                    <Grid item style={{marginBottom:'0.5em'}}>
                        <Typography style={{color:theme.palette.common.blue}}>Enter your E-mail</Typography>
                        <TextField 
                            id="loginEmail"
                            type="loginEmail"
                            variant="outlined"
                            fullWidth
                            value={loginEmail}
                            onChange={(e) => setLoginloginEmail(e.target.value)
                                }
                        />
                    </Grid>
                    <Grid item style={{marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Password</Typography>
                        <TextField 
                            id="password" 
                            type="password"
                            variant="outlined" 
                            fullWidth
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                        <Button 
                            disabled={
                                loginEmail.length === 0 ||
                                loginPassword.length === 0 
                            }
                            variant='contained' 
                            className={classes.sendButton}
                            onClick={() => {
                                signInWithEmailAndPassword(loginEmail, loginPassword);
                                window.location("./")
                              }}
                        >
                          {loading ? <CircularProgress size={30} /> : buttonContents}
                        </Button>
                    </Grid>
                    <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                        <Button 
                            variant='contained' 
                            className={classes.sendButton}
                            
                            onClick={signInWithGoogle}
    
                        >
                        <i className="fab fa-google"/>
                          {loading ? <CircularProgress size={30} /> : buttonGoogle}
                        </Button>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            <Snackbar
            open={alert.open}
            ContentProps={{
              style: {
                backgroundColor: alert.color
              }
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            message={alertMessage}
            autoHideDuration={4000}
            onClose={() => setAlert(false)}
          />
    
        </Grid>
        );
    }
};
