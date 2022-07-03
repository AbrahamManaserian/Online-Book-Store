import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {grey, teal} from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import { FlareSharp } from '@mui/icons-material';
import { useState, createContext, useContext } from "react";
import FormHelperText from '@mui/material/FormHelperText';
import { Link, Outlet,NavLink,useSearchParams,useParams } from "react-router-dom";

export const DataContext = createContext()

export  function SearchButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // This part is for searching buttons and menus
    
    function SearchMenu() {
        const [yearFrom, setYearFrom] = React.useState('');
        const [yearTo, setYearTo] = React.useState('');
        const [monthFrom, setMonthFrom] = React.useState('');
        const [monthTo, setMonthTo] = React.useState('');
        const [listState, setListState] = React.useState([]);
        const [searchState,setSearchState] = React.useState({yearFrom:'',
                                                             yearTo:'',
                                                             monthFrom:'',
                                                             monthTo:'',
                                                             listBook:[]})

       
        const handleChangeYearFrom = (event) => {
            if(searchState.yearTo) {
                console.log('asd')
                if (Number(event.target.value)>Number(searchState.yearTo) ) {
                    const obj ={...searchState,yearFrom:'',}
                    setSearchState(obj)
                }else{
                    const obj ={...searchState,yearFrom:event.target.value,}
                    setSearchState(obj)
                }
            }else{
                const obj ={...searchState,yearFrom:event.target.value,}
                setSearchState(obj)
            }
            setYearFrom(event.target.value);
        };

        const handleChangeYearTo = (event) => {
            if(searchState.yearFrom) {
                if(Number(searchState.yearFrom)>Number(event.target.value)) {
                    const obj ={...searchState,yearFrom:'',yearTo:event.target.value,}
                    setSearchState(obj)
                }else{
                    const obj ={...searchState,yearTo:event.target.value,}
                    setSearchState(obj)
                }
            }else if(Number(yearFrom)>Number(event.target.value)) {
                const obj ={...searchState,yearFrom:'',yearTo:event.target.value,}
                setSearchState(obj)
            }else{
                const obj ={...searchState,yearFrom:yearFrom,yearTo:event.target.value,}
                setSearchState(obj)
            }
            setYearTo(event.target.value);
        };
        const handleChangeMonthFrom = (event) => {
            setMonthFrom(event.target.value);
            const obj ={...searchState,monthFrom:event.target.value,}
            setSearchState(obj)
        };
        const handleChangeMonthTo = (event) => {
            setMonthTo(event.target.value);
            const obj ={...searchState,monthTo:event.target.value,}
            setSearchState(obj)
        };
      
        const handleChangeListState = (event) => {
            const {
                target: { value },
            } = event;

            if(value[value.length-1]==='delet') {
                const obj ={...searchState,listBook:[]}
                setSearchState(obj)
                setListState([])
            }else if(value[value.length-1]==='select') {
                const obj ={...searchState,listBook:bookLists}
                setSearchState(obj)
                setListState(bookLists)
            }else {
                const obj ={...searchState,listBook:value}
                setSearchState(obj)
                setListState(
                    typeof (value )=== 'string' ? value.split(',') : value,
                  );
            }
          };
          console.log(searchState)
        const bookLists =[
            "Combined Print and E-Book Fiction",
            "Combined Print and E-Book Nonfiction",
            "Hardcover Fiction",
            "Hardcover Nonfiction",
            "Trade Fiction Paperback",
            "Mass Market Paperback",
            "Paperback Nonfiction",
            "E-Book Fiction",
            "E-Book Nonfiction",
            "Hardcover Advice",
            "Paperback Advice",
            "Advice How-To and Miscellaneous",
            "Hardcover Graphic Books",
            "Paperback Graphic Books",
            "Manga",
            "Combined Print Fiction",
            "Combined Print Nonfiction",
            "Chapter Books",
            "Childrens Middle Grade",
            "Childrens Middle Grade E-Book",
            "Childrens Middle Grade Hardcover",
            "Childrens Middle Grade Paperback",
            "Paperback Books",
            "Picture Books",
            "Series Books",
            "Young Adult",
            "Young Adult E-Book",
            "Young Adult Hardcover",
            "Young Adult Paperback",
            "Animals",
            "Audio Fiction",
            "Audio Nonfiction",
            "Business Books",
            "Celebrities",
            "Crime and Punishment",
            "Culture",
            "Education",
            "Espionage",
            "Expeditions Disasters and Adventures",
            "Fashion Manners and Customs",
            "Food and Fitness",
            "Games and Activities",
            "Graphic Books and Manga",
            "Hardcover Business Books",
            "Health",
            "Humor",
            "Indigenous Americans",
            "Relationships",
            "Mass Market Monthly",
            "Middle Grade Paperback Monthly",
            "Paperback Business Books",
            "Family",
            "Hardcover Political Books",
            "Race and Civil Rights",
            "Religion Spirituality and Faith",
            "Science",
            "Sports",
            "Travel",
            "Young Adult Paperback Monthly"
        ]
        const years =['2022','2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011',]
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

       
        return (
           <div>
               <Grid container item xs={12} sx={{p:1}} columnSpacing={1}>
                   <Grid container item xs={12} sm={7} alignItems="flex-start" justifyContent='flex-start' columnSpacing={1}>
                        <Grid item xs={12}>
                            <Typography align = 'center' >Date</Typography>
                        </Grid>
                        
                        <Grid container rowSpacing={1} columnSpacing={1} item  xs={5}>
                            <Grid item xs={12}>
                                <Typography align='center'>Year</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{display:'flex',width:'100%',justifyContent:'center'}}>
                                   <FormControl sx={{width:100,}} size="small">
                                     <InputLabel id="demo-select-small">from</InputLabel>
                                        <Select
                                         labelId="demo-select-small"
                                         id="demo-select-small"
                                         value={yearFrom}
                                         label="Age"
                                         onChange={handleChangeYearFrom}
                                         MenuProps={{PaperProps: {
                                          style: {
                                               maxHeight: 200,
                                               
                                          },
                                        },}}
                                        >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      {years.map((item,index)=>{
                                          return(
                                              <MenuItem value={item} key ={index}>{item} </MenuItem>
                                          )
                                      })}
                                     </Select>
                                  </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{display:'flex',width:'100%',justifyContent:'center'}}>
                                      <FormControl sx={{width:100,}} size="small">
                                        <InputLabel id="demo-select-small">to</InputLabel>
                                           <Select
                                             labelId="demo-select-small"
                                             id="demo-select-small"
                                             value={yearTo}
                                             label="Age"
                                             onChange={handleChangeYearTo}
                                             MenuProps={{PaperProps: {
                                                 style: {
                                                     maxHeight: 200,
                                                     
                                                  },
                                              },}}
                                              >
                                             <MenuItem value="">
                                               <em>None</em>
                                             </MenuItem>
                                             {years.map((item,index)=>{
                                                 return(
                                                     <MenuItem value={item} key ={index}>{item} </MenuItem>
                                                 )
                                             })}
                                           </Select>
                                      </FormControl>
                                   
                                </Box>
                            </Grid>
                            <Grid item xs={12}  sx={{display:()=>{
                                if(Number(yearTo)<Number(yearFrom) && yearFrom && yearTo) {
                                    return 'block'
                                }else{
                                    return 'none'
                                }
                            }}}>
                                <Typography sx={{color:'red',fontSize:12,width:'98%'}}>
                                    Year from must be smaller than year to
                                </Typography>
                            </Grid>               
                          {/*  */}
                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={1} item xs={7}  alignItems="flex-start" justifyContent='flex-start'>
                             <Grid item xs={12}>
                                <Typography align='center'>Month</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{display:'flex',width:'100%',justifyContent:'center'}}>
                                   <FormControl sx={{width:130,}} size="small">
                                      <InputLabel id="demo-select-small">from</InputLabel>
                                      <Select
                                        sx={{maxHeight:100}}
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={monthFrom}
                                        label="Age"
                                        onChange={handleChangeMonthFrom}
                                        MenuProps={{PaperProps: {
                                          style: {
                                               maxHeight: 200,
                                               
                                          },
                                        },}}
                                        >
                                           <MenuItem value="">
                                             <em>None</em>
                                           </MenuItem>
                                           {months.map((item,index)=>{
                                               return(
                                                   <MenuItem value={item} key={index}>{item}</MenuItem>
                                                   )
                                                 })}
                                      </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{display:'flex',width:'100%',justifyContent:'center'}}>
                                   <FormControl sx={{width:130,}}  size="small">
                                      <InputLabel id="demo-select-small">to</InputLabel>
                                      <Select
                                       
                                       labelId="demo-select-small"
                                       id="demo-select-small"
                                       value={monthTo}
                                       label="Age"
                                       onChange={handleChangeMonthTo}
                                       MenuProps={{PaperProps: {
                                         style: {
                                             maxHeight: 200,
                                         },
                                       },}}
                                       >
                                          <MenuItem value="">
                                            <em>None</em>
                                          </MenuItem>
                                          {months.map((item,index)=>{
                                              return(
                                                  <MenuItem value={item} key={index}>{item}</MenuItem>
                                                  )
                                               })}
                                     </Select>
                                   </FormControl>

                                </Box>
                            </Grid>
                                <Grid item xs={12} sx={{display:()=>{
                                    if(months.indexOf(monthTo)<months.indexOf(monthFrom)&& monthTo && monthFrom ) {
                                        return 'block'
                                    }else{
                                        return 'none'
                                    }
                                }}}>
                                    <Typography sx={{fontSize:12,color:'red',px:1}}>
                                        Month from must be smaller than month to
                                    </Typography>
                                </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{height:200,border:1,marginTop:1}}></Box>
                        </Grid>
                   </Grid>
                   <Grid container item xs={12} sm={5} >
                       <Grid  item xs ={12}>
                            <Typography align='center'>Book Lists</Typography>
                       </Grid>
                       <Grid container item xs={12} justifyContent='center' >
                             <FormControl sx={{ width: 250,}}>
                                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                <Select
                                      labelId="demo-multiple-checkbox-label"
                                      id="demo-multiple-checkbox"
                                      multiple
                                      value={listState}
                                      onChange={handleChangeListState}
                                      input={<OutlinedInput label="Tag" />}
                                      renderValue={(selected) => selected.join(', ')}
                                      MenuProps={{PaperProps: {
                                          style: {
                                              maxHeight: 300,
                                          },
                                      },}}
                                    >
                                       <MenuItem value='delet'>
                                          <Checkbox  checked={listState.length==0} 
                                            />
                                          <em style={{color:'red'}}>Clear All</em>
                                       </MenuItem>
                                       <MenuItem value="select">
                                          <Checkbox checked={listState.length >=bookLists.length}
                                                      />
                                          <em style={{color:'blue'}}>Select All</em>
                                       </MenuItem>
                                       {bookLists.map((name) => (
                                           
                                        <MenuItem key={name} value={name}>
                                           <Checkbox checked={listState.indexOf(name) > -1} />
                                           <ListItemText primary={name} />
                                        </MenuItem>
                                       ))}
                                </Select>
                           </FormControl>
                       </Grid>
                       <Grid container item xs={12}  alignItems="flex-end" justifyContent="flex-end" >
                           <Link style={{textDecoration:'none',paddingTop:6}}  
                                to = {`/search/=$$$${searchState.yearFrom}$$$${searchState.yearTo}$$$${searchState.monthFrom}$$$${searchState.monthTo}$$$${searchState.listBook.join('$$$')}`} >
                               <Button sx={{fontSize:14,height:40,width:100, backgroundColor:teal[500],color:'white',":hover":           {backgroundColor:teal[800]}}}
                                     id="basic-button"
                                     aria-controls={open ? 'basic-menu' : undefined}
                                     aria-haspopup="true"
                                     aria-expanded={open ? 'true' : undefined}
                                    //   onClick={handleClickSearch}
                                     >
                                   search
                                </Button>
                            </Link>  
                        </Grid>
                   </Grid>
               </Grid>
           </div>
        );
      }



    return (
     <Box >
      <Button sx={{fontSize:12,height:40,backgroundColor:teal[500],color:'white',marginRight:2}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        Advanced search
      </Button>
      <Menu
        
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        > 
        <Box sx={{maxWidth:800,}}>
             <SearchMenu></SearchMenu>
        </Box>
      </Menu>
    </Box>
  );
}



const names = [
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
];
