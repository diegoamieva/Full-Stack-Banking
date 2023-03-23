import React, { useState, useEffect } from "react";
import { db ,auth} from '../firebase';
import { makeStyles} from '@material-ui/core/styles';
import { TextField ,Button,Grid,Typography,useMediaQuery,useTheme} from "@material-ui/core";
import { CircularProgress,Snackbar } from "@material-ui/core";



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
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function  Withdraw(){
  const classes = useStyles();
  
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

    const [user, setUser] = useState("");
    const [amt, setAmt] = useState(0);
    const [status, setStatus] = useState("done");
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");
   
    const [posts, setPosts] = useState([]);

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
        if (user) {
        setUser(user['_delegate']['email']);
        } else {
        setUser("")
        }
        })
    }

    useEffect(() => {
        authListener();
      const getDataFromFirebase = [];
      const subscriber = db.collection('users').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getDataFromFirebase.push({ ...doc.data(), key: doc.id });
        });
        setPosts(getDataFromFirebase);
      });
      return () => subscriber();
    }, [])
  

const withdrawMoney = async (e)=>{
  e.preventDefault();
  setLoading(true);

  var us = posts.filter(p =>{ return p.email === user});
  console.log('user accunt:',us[0].amount);
  
 if (parseFloat(us[0].amount) < parseFloat(amt)) {
  setLoading(false);
   setAlert({ open: true, color: "#FF3232" });
    setAlertMesssage("User dont have enough funds.");
}
else {
  setStatus('Done')
  var usa = parseFloat(us[0].amount) - parseFloat(amt);

  var usp = await db.collection("users").doc(us[0].key).update({
    amount: parseFloat(usa)
  }).then(() => { 
    // alert("Details have been saved")
    setLoading(false);
    setAlert({ open: true, color: "#4BB543" });
    setAlertMesssage("Money Withdraw Successfully !!!!");
    console.log('status:', status);
    
    
}).catch((error) => { 
    // alert(error.message) 
    setLoading(false);
    setAlert({ open: true, color: "#FF3232" });
    setAlertMesssage("Something went wrong! Please try again.");
});
    setAmt(0);


  console.log('user update:', usp);
}
}
const onAmountChange = (e) => {
          const amt = e.target.value;
          if (!amt || amt.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmt(amt);
        }
        }

        const buttonContents = (
          <React.Fragment>
            Withdraw
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
            marginBottom: matchesMD ? '5em' : '4.5em'
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
                        Withdraw Money
                    </Typography>
                </Grid>
                <Grid 
                    item 
                    container
                    direction='column' 
                    style={{maxWidth:matchesXS ? '20em' : matchesSM? '25em' :'40em'}}
                >
                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Account</Typography>
                    <Typography style={{color:theme.palette.common.blue}}>{user}</Typography>
                </Grid>
                <Grid item style={{marginBottom:'0.5em'}}>
                  <Typography style={{color:theme.palette.common.blue}}>
                    Amount
                  </Typography>
                    <TextField 
                        id="amount"
                        style={{marginTop:'1'}}
                        variant="outlined"
                        fullWidth
                        value={amt}
                        onChange={onAmountChange}
                    />
                </Grid>
                <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                    <Button 
                        disabled={
                            user.length === 0 ||
                            amt.length === 0
                            }
                        variant='contained' 
                        className={classes.sendButton}
                        onClick={withdrawMoney}
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
    )
    }else{
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
                            Withdraw Money
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                    >
                        <Typography style={{color:theme.palette.common.blue}}>Need to Log In</Typography>
    
                </Grid>
                </Grid>
            </Grid>
        </Grid>
        );
    }
}





