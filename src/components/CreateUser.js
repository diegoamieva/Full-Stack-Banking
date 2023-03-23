import { Button,Grid,useTheme,useMediaQuery,makeStyles,Typography,TextField,CircularProgress,Snackbar } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import {registerWithEmailAndPassword,auth} from "../firebase";

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


export default function CreateUser(){

    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    



    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [amount,setAmount] = useState(0)


    const [emailHelper,setEmailHelper] = useState('');
    const [passwordHelper,setPasswordHelper] = useState('');

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");

    const [user,setUser] = useState('')

    const onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setAmount(amount);
      }
    }

    const onChange = event => {
        let valid;

        switch(event.target.id)
        {
            case 'email' :
                setEmail(event.target.value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);

                if(!valid){
                    setEmailHelper('Invaild email');
                }else
                {
                    setEmailHelper('');
                }
                break;

            case 'password' :
                setPassword(event.target.value)
                valid = /.{6,}/.test(event.target.value);

                if(!valid) {
                    setPasswordHelper('Invalid password')
                }else{
                    setPasswordHelper('')
                }
                break;
                
                default:
                    break;
            }
    }

    const Push = (e) => {
        e.preventDefault();
        setLoading(true);
        registerWithEmailAndPassword(name, email, password,amount)
        .then(() => { 
            // alert("Details have been saved")
            setLoading(false);
            setAlert({ open: true, color: "#4BB543" });
            setAlertMesssage("Customer Created Successfully !!");
        }).catch((error) => { 
            // alert(error.message) 
            setLoading(false);
            setAlert({ open: true, color: "#FF3232" });
            setAlertMesssage("Something went wrong! Please try again.");
        });
        setName('');
        setEmail('');
        setPassword('');
        setAmount('');
    }

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
          Register
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
                            Create New User
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                    >
                        <Typography style={{color:theme.palette.common.blue}}>Log Out to Create New User</Typography>
    
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
                            Create New User
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                        container
                        direction='column' 
                        style={{maxWidth:matchesXS ? '20em' : matchesSM? '25em' :'40em'}}
                    >
                    <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                        <Typography style={{color:theme.palette.common.blue}}>Name</Typography>
                        <TextField 
                            id="name" 
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item style={{marginBottom:'0.5em'}}>
                        <Typography style={{color:theme.palette.common.blue}}>Enter your E-mail</Typography>
                        <TextField 
                            id="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            error={emailHelper.length !== 0}
                            helperText={emailHelper}
                            value={email}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item style={{marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Password</Typography>
                        <TextField 
                            id="password" 
                            type="password" 
                            variant="outlined" 
                            fullWidth
                            error={passwordHelper.length !== 0}
                            helperText={passwordHelper}
                            value={password}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item style={{marginBottom:'0.5em'}}>
                        <Typography style={{color:theme.palette.common.blue}}>Amount </Typography>
                        <TextField 
                            id="amount" 
                            variant="outlined"
                            fullWidth
                            value={amount}
                            onChange={onAmountChange}
                        />
                    </Grid>
                    <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                        <Button 
                            disabled={
                                name.length === 0 ||
                                email.length === 0 ||
                                password.length === 0 ||
                                amount.length === 0 
                            }
                            variant='contained' 
                            className={classes.sendButton}
                            onClick={Push}
                        >
                          {loading ? <CircularProgress size={30} /> : buttonContents}
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
