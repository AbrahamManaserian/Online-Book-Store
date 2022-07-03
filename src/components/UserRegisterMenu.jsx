import * as React from 'react';
import firestore from '../firebase'
import  {getAuth,createUserWithEmailAndPassword,signOut,
        signInWithEmailAndPassword,onAuthStateChanged,updateProfile} from 'firebase/auth'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { Button, CardMedia, Grid, TextField } from '@mui/material';
import {cyan, grey, teal} from '@mui/material/colors';
import { useForm } from "react-hook-form";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';

import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const asd = require('../images/BookLips.jpeg')




export  function InputPassward(props) {
  const handleChange = (prop) => (event) => {
    props.setValues({ ...props.values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    props.setValues({
      ...props.values,
      showPassword: !props.values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // console.log(values.password)
  return (
           <FormControl sx={{maxWidth:195}}  variant="outlined">
             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
             <OutlinedInput
               size='small'
               // id="outlined-adornment-password"
               type={props.values.showPassword ? 'text' : 'password'}
               value={props.values.password}
               onChange={handleChange('password')}
               endAdornment={
                 <InputAdornment position="end">
                   <IconButton
                     // aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     onMouseDown={handleMouseDownPassword}
                     edge="end"
                     >
                     {props.values.showPassword ? <VisibilityOff /> : <Visibility />}
                   </IconButton>
                 </InputAdornment>
               }
               label="Password"
               />
           </FormControl>
  );
}

export  function LoginMenu(props) {
  const [images,setImages] = React.useState([])
  const [passward, setPassWard] = React.useState({
    password: '',
    showPassword: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { register,getValues,setValue, formState: { errors,isValid,dirtyFields }, handleSubmit,watch,value } = useForm({mode:'onChange',defaultValues:{
    // image:[],
    yearTo:'',
    image:null,
    checkbox:{lists:[],
    }
  }});
  const auth = getAuth()
  async function handleLogOut () {
    try {
      await signOut(auth)
    } catch (error) {
      // console.log(error)
    }
  }
  // console.log(getValues('image'))
  React.useEffect(async()=>{
    if(watch('image')?.length>0) {
      const storage= getStorage()
      const imageref = await ref(storage,`profileImages/img/${Date.now()}`)
      const loaded = await uploadBytes(imageref,watch('image')?.[0])
      const img = await getDownloadURL(imageref)
      const arr =[...images,{ url:img,
                              file:watch('image')[0]
                            }
                  ]
       setImages(arr)
    }
    
  },[watch('image')])
  console.log(images)
  async function handleSignUp (setPhoto) {
    try {
      await createUserWithEmailAndPassword(auth,getValues('regMail'),passward.password)
      
      const storage= getStorage()
      const imageRef= await ref(storage,`profileImages/${auth.currentUser.uid}/${getValues('image')?.[0].name}`)
      await uploadBytes(imageRef,getValues('image')[0])
      const profileImage = await getDownloadURL(imageRef)
      await updateProfile(auth.currentUser, {
        displayName: `${getValues('name')} ${getValues('srname')}`, photoURL:profileImage
      })
      console.log(profileImage)
      setPhoto(profileImage)
    } catch(error) {
      console.log(error)
    }
  }

  async function handleSignIn () {
    try {
      await signInWithEmailAndPassword(auth,getValues('mail'),passward.password)
    } catch(error) {
      // console.log(error.message)
    }
  }
  console.log(Date.now())
  
  return (
    <div>
      {!props.button?
        <Button  sx={{fontSize:12,height:40,maxWidth:50, backgroundColor:cyan[500],color:'white',":hover":{backgroundColor:cyan[800]}}}
                 onClick={handleClick}
        >
           Log in
        </Button>:
        <MenuItem onClick={handleClick} >
          <ListItemIcon>
             <PersonAdd fontSize="small" />
           </ListItemIcon>
           Add another account
         </MenuItem>}
      
      <Menu
        
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box></Box>
        <Box sx={{maxWidth:520}}>
         <form>
        <Grid spacing={1} padding={1} item container xs={12} >
          <Grid item xs={12} sm={6} container justifyContent='center'>
             <TextField  {...register("mail")} size="small"  label="Email" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent='center'>
             <InputPassward values = {passward} setValues={setPassWard}></InputPassward>
          </Grid>
          <Grid  item container justifyContent='flex-end'  xs={12} >
            <Button  sx={{fontSize:14,height:30,width:70, backgroundColor:teal[500],color:'white',":hover":{backgroundColor:teal[800]}}}
              onClick={handleSignIn}
            >
              Log in
            </Button>
          </Grid>
          <Grid paddingBottom={1} item container justifyContent='center'  xs ={12}>
            <Typography sx={{color:'red',textDecoration:'underline',textAlign: 'center'}} >
              If you have not an account, please sign up
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} container justifyContent='center'>
            <TextField {...register("name")} size="small"  label="Name" variant="outlined" />
          </Grid>
          <Grid item sm={6} xs={12} container justifyContent='center'>
            <TextField {...register("srname")} size="small"  label="Srname" variant="outlined" />
          </Grid>
          
          <Grid item container justifyContent='center' sm={6}  xs={12}>
            <TextField {...register("regMail")} size="small"  label="Email address" variant="outlined" />
          </Grid>
          <Grid item container justifyContent='center' sm={6}  xs={12}>
             <InputPassward values = {passward} setValues={setPassWard}></InputPassward>
          </Grid>
          <Grid  item container justifyContent='flex-end' xs={12} >
            <Button  sx={{fontSize:14,height:30,width:80,marginTop:1.5, backgroundColor:teal[500],color:'white',":hover":{backgroundColor:teal[800]}}}
              onClick={()=> handleSignUp(props.setPhoto)}
            >
              sign up
            </Button>
          </Grid>
          <Grid item xs ={12}>
          <Button
              variant="contained"
              component="label"
          >
              Upload Files
              <input {...register("image")}
                type="file"
                hidden
              />
            </Button>
            <Grid item xs={12}>
              <Typography sx={{fontSize:12,color:'blue',marginTop:1}}>Upload a profile photo</Typography>
            </Grid>
            <Grid item container xs={12}>
              {images.length>0&&images.map((item,index)=>{
                return(
                  <CardMedia
                  key={index}
            sx={{width:90,height:90,m:0.5}}
               component="img"
              //  height="50"
               width='50'
               image={item.url}
               alt="Image"
            />
                )
              })}
            {/* <CardMedia
            sx={{width:70,height:70}}
               component="img"
              //  height="50"
               width='50'
               image={images[1]}
               alt="Image"
            /> */}
            </Grid>
          </Grid>
        </Grid>
        </form> 
        </Box>
      </Menu>
    </div>
  );
}

export  function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 42, height: 42 }} src={props.image} ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={props.image} onClick={()=>alert('asd')} /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <LoginMenu setPhoto={props.setPhoto}
                   button={true}
                   >

                   </LoginMenu>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={props.handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default function UserRegisterMenu(props) {
  const [userState,setUserState] =React.useState()
  const [photo,setPhoto] =React.useState()
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
   if (user) {
     setUserState(user)
   } else {
     setUserState(false)
   }
 });

  async function handleLogOut () {
    try {
      await signOut(auth)
    } catch (error) {
      // console.log(error)
    }
  }
  
  return(
    <div>
      {!userState?<LoginMenu setPhoto={setPhoto}></LoginMenu>:
          <AccountMenu image={photo||userState?.photoURL}
                       handleLogOut={handleLogOut}
                       setPhoto={setPhoto}>
          </AccountMenu>
      }
    </div>
  )
} 

