import * as React from 'react';
import ResponsiveAppBar from  './AppBar.jsx'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {BestSellerNTimes} from './BookCards.jsx'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import RecipeReviewCard from '/Users/abraham/projects/online-boock-store/src/Files/BooksRead.jsx'
import { FormControl } from '@mui/material';
import { useState,useEffect,useRef } from 'react';
// import { Slideshow } from '@mui/icons-material'
import { red,pink,purple } from '@mui/material/colors';
import {SaleSlideshow} from './BookCards.jsx'
import {GoogleCard} from './BookCards.jsx'
import {AdvertisingCard} from './BookCards.jsx'
import {MonthPoper} from './MenuType.jsx'
import { Link, Outlet } from "react-router-dom";
import UserRegisterMenu from './UserRegisterMenu';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const colors = ["#0088FE", "#00C49F", "#FFBB28",'red','green'];
const delay = 2500;

export default function HomePage () {
    return (
        <Box>
          <ResponsiveAppBar/> 
          <Grid container spacing={1}  sx={{paddingTop:2,}} >
            <Grid item sm={4} md={2.5}  sx={{display: { xs: 'none', sm: 'block' }}} >
                 <GoogleCard></GoogleCard>
            </Grid>
            <Grid  item sm={8} md={9.5} xs={12}>
                <Grid container  spacing={1} >
                  <Grid item xs={12} md={8} >
                    <SaleSlideshow></SaleSlideshow> 
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} >
                      <AdvertisingCard></AdvertisingCard>
                  </Grid>
                  <Grid item xs ={12}  >
                    <BestSellerNTimes ></BestSellerNTimes>   
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
            
        </Box>
    )
}

