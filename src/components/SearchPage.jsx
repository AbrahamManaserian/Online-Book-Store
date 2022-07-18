import * as React from 'react';
import { useParams } from "react-router-dom";
import ResponsiveAppBar from './AppBar'
import { useForm,useWatch } from "react-hook-form";
import Button from '@mui/material/Button';
import {grey, teal} from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link as RouterLink, } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import reactDom from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';

export  function SearchMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function MenuView(props) {
    const { register,getValues,setValue, formState: { errors,isValid,dirtyFields }, handleSubmit,watch,value } = useForm({mode:'onChange',defaultValues:{
        yearFrom:'',
        yearTo:'',
        checkbox:{lists:[]}
    }});
    const onSubmit = data => console.log(data);
    const watchYearFrom = watch('yearFrom')
    const watchYearTo = watch('yearTo')
  
    const years =['2022','2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011',]
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
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
                              <InputLabel id="demo-simple-select-label">from</InputLabel>
                              <Select 
                              {...register("yearFrom",{required: true,validate:value=>{
                                 return  Number(value)<=Number(getValues('yearTo')||'2022')
                              }})}
                              labelId="demo-simple-select-label"
                              // id="demo-simple-select"
                              label="from"
                              value={watchYearFrom || ''}
                              MenuProps={{PaperProps: {
                                style: {
                                     maxHeight: 250,
                                     
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
                              <InputLabel >to</InputLabel>
                              <Select 
                              {...register("yearTo",{validate:value=>{
                                  if(getValues('yearFrom')&&getValues('yearTo')) {
                                      return  Number(value)>=Number(getValues('yearFrom'))
  
                                  }
                               }})}
                            //   labelId="demo-simple-select-label"
                              // id="demo-simple-select"
                              label="to"
                              value={watchYearTo || ''}
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
                   <Grid item xs={12}>
                      {(getValues('yearTo')<getValues('yearFrom'))&&getValues('yearTo')?
                         <Typography align='center' sx={{color:'red',fontSize:12,width:'100%'}}>
                            Year from must be smaller than year to 
                         </Typography>:null}
                      {!getValues('yearFrom')&&<Typography align='center' sx={{color:'red',fontSize:12,width:'98%'}}>year from is required</Typography>}
                   </Grid>         
               </Grid>
               <Grid container rowSpacing={1} columnSpacing={1} item xs={7}  alignItems="flex-start" justifyContent='flex-start'>
                    <Grid item xs={12}>
                       <Typography align='center'>Month</Typography>
                   </Grid>
                   <Grid item xs={12} sm={6}>
                       <Box sx={{display:'flex',width:'100%',justifyContent:'center'}}>
                           <FormControl sx={{width:130,}} size="small">
                              <InputLabel >from</InputLabel>
                              <Select 
                              {...register("monthFrom",{required:true,validate:value=>{
                                  if(getValues('monthTo')) {
                                    return   months.indexOf(value)<=months.indexOf(getValues('monthTo'))
                                  }
                              }})}
                              label="from"
                              value={watch('monthFrom')|| ''}
                              >
                               <MenuItem value="">
                                  <em>None</em>
                               </MenuItem>
                                    {months.map((item,index)=>{
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
                           <FormControl sx={{width:130,}} size="small">
                              <InputLabel >to</InputLabel>
                              <Select 
                              {...register("monthTo",{validate:value=>{
                                  if(getValues('monthFrom')&& value) {
                                      return months.indexOf(getValues('monthFrom')) <= months.indexOf(value)
                                  }
                              }})}
                              label="to"
                              value={watch('monthTo')|| ''}
                              >
                               <MenuItem value="">
                                  <em>None</em>
                               </MenuItem>
                                    {months.map((item,index)=>{
                                        return(
                                            <MenuItem value={item} key ={index}>{item} </MenuItem>
                                        )
                                    })}
                              </Select>
                            </FormControl>
  
                       </Box>
                   </Grid>
                    <Grid item xs={12}>
                       {!getValues('monthFrom') && <Typography align='center' sx={{color:'red',fontSize:12,width:'98%'}}>month from is required</Typography>}
                       {(months.indexOf(getValues('monthTo')) < months.indexOf(getValues('monthFrom'))) && getValues('monthTo') ?
                          <Typography align='center' sx={{color:'red',fontSize:12,width:'100%'}}>
                              Please, correct tour input! 
                          </Typography>:null}
                    </Grid>   
               </Grid>
               <Grid item xs={12}>
                   <Box sx={{height:200,border:1,marginTop:1}}>
                       {watch('yearFrom')}
                   </Box>
               </Grid>
          </Grid>
          <Grid container item xs={12} sm={5} > 
              <Grid item xs ={12} >
                   <Typography  >Book Lists</Typography>
              </Grid>
              <Grid container item xs={12} justifyContent='center' >
                   <FormControl sx={{ width: 250,}}>
                      <InputLabel>Tag</InputLabel>
                      <Select {...register('checkbox.lists',{validate:(value)=>{
                          if(value[value.length-1]=='delet') {
                              setValue('checkbox',{lists:[]})
                          }else if(value[value.length-1]=='select') {
                              setValue('checkbox',{lists:bookLists})
                          }
                          }})}
                          multiple
                          value={watch('checkbox.lists')}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={{PaperProps: {
                              style: {
                                  maxHeight: 300,
                              },
                          },}}
                      >
                         <MenuItem value='delet'  >
                            <Checkbox  checked={getValues('checkbox.lists').length==0} />
                            <em style={{color:'red'}}>Clear All</em>
                         </MenuItem>
                         <MenuItem value="select">
                            <Checkbox checked={getValues('checkbox.lists').length==bookLists.length} />
                            <em style={{color:'blue'}}>Select All</em>
                         </MenuItem>
                            {bookLists.map((name,index) => (
                               <MenuItem  key={name} value={name}>
                                   <Checkbox checked={getValues('checkbox.lists').indexOf(name) > -1}/>
                                   <ListItemText primary={name} />
                               </MenuItem>
                         ))}
                      </Select>
                   </FormControl>
                   
              </Grid>
              <Grid container item xs={12}  alignItems="flex-end" justifyContent="flex-end" >
                  <Link component={RouterLink} to={isValid &&`/search/=$$$${getValues('yearFrom')}$$$${getValues('yearTo')}$$$${getValues('monthFrom')}$$$${getValues('monthTo')}$$$${getValues('checkbox.lists').join('$$$')}`} 
                     style={{textDecoration:'none'}} >
                      <Button onClick={isValid ? props.onClick : null}
                        sx={{fontSize:14,height:40,width:100, backgroundColor:teal[500],color:'white',":hover":{backgroundColor:teal[800]}}}>
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
      <Button sx={{fontSize:12,height:40,backgroundColor:teal[500],color:'white',marginRight:1,display: { xs: 'none', sm: 'flex' }}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        Advanced search
      </Button>
      <Button sx={{fontSize:12,height:40,backgroundColor:teal[500],color:'white',marginRight:1,display: { xs: 'flex', sm: 'none' }}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        <MenuIcon/>
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
             <MenuView onClick={handleClose}></MenuView>
        </Box>
      </Menu>
    </Box>
  );
}


export function SearchView (props) {
    const [stateSearch,setStateSearch] = React.useState(null)
    const years =['2022','2021', '2020','2019','2018','2017','2016','2015','2014','2013','2012','2011',]
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    let params=  useParams()
    let urlState =params.search

    //START: THIS SECTION IS FOR SETTING SEARCH ITEMS IN OBJECT FROM URL
    
    const objectSearch ={yearFrom:'',yearTo:'',monthFrom:'',monthTo:'', listBook:[],}
    let arr = params.search.split('$$$')
    arr.forEach((item,index)=>{
        if(index==1) objectSearch.yearFrom=item
        
        if(index==2) objectSearch.yearTo=item
        
        if(index==3) objectSearch.monthFrom=item
        
        if(index==4) objectSearch.monthTo=item
        
        if(index>4)  objectSearch.listBook.push(item)
    })

    //FINISH: THIS SECTION IS FOR SETTING SEARCH ITEMS IN OBJECT FROM URL
    
    
    // // Start: Setting responseObject from objectSearch  to know what to fetch from newYTimes
    
    const responseObject={years:[],months:[]}
    function getResponseObj () {
        if(years.includes(objectSearch.yearFrom) && years.includes(objectSearch.yearTo) && 
        months.includes(objectSearch.monthFrom) && months.includes(objectSearch.monthTo)) {
            for (let i = years.indexOf(objectSearch.yearTo); i <= years.indexOf(objectSearch.yearFrom); i++) {
                responseObject.years.push(years[i])
            }
            for(let i = months.indexOf(objectSearch.monthFrom); i<=months.indexOf(objectSearch.monthTo); i++) {
                responseObject.months.push(months[i])
            }
            return
        }else if(years.includes(objectSearch.yearFrom) && years.includes(objectSearch.yearTo) && months.includes(objectSearch.monthFrom)) {
            for (let i = years.indexOf(objectSearch.yearTo); i <= years.indexOf(objectSearch.yearFrom); i++) {
                responseObject.years.push(years[i])
            }
            for(let i = months.indexOf(objectSearch.monthFrom); i<months.length; i++) {
                responseObject.months.push(months[i])
            }
            return
        }else if(years.includes(objectSearch.yearFrom) && years.includes(objectSearch.yearTo)) {
            for (let i = years.indexOf(objectSearch.yearTo); i <= years.indexOf(objectSearch.yearFrom); i++) {
                responseObject.years.push(years[i])
            } 
            return
        }else if(years.includes(objectSearch.yearFrom) && months.includes(objectSearch.monthFrom)) {
            for (let i =years.indexOf(objectSearch.yearFrom); i >=0; i-- ){
                responseObject.years.push(years[i])
            }
            for(let i = months.indexOf(objectSearch.monthFrom); i<months.length; i++) {
                responseObject.months.push(months[i])
            }
            return
        }else if(years.includes(objectSearch.yearFrom)) {
            for (let i =years.indexOf(objectSearch.yearFrom); i >=0; i-- ){
                responseObject.years.push(years[i])
            }
        }
    }
    getResponseObj()

 // Finish: Setting responseObject from objectSearch  to know what to fetch from newYTimes

    function SearchCard (props) {
       return (
        <Card sx={{ width: 160, height:360 }}>
           <Link  href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.title}`} target="_blank">
           <CardMedia
            component="img"
            height="220"
            image={props.book_image}
            alt={props.title}
           />
          </Link>
           <CardContent sx={{padding:0.5,height:85,  overflow: 'hidden' }}>
               <Link href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.title}`} underline="hover" target="_blank" sx={{color:'red'}}> 
                  <Typography  gutterBottom variant="body2" component="div" sx={{ overflow: 'hidden', height:45 }}>
                    {props.title}
                  </Typography>
               </Link>
               <Link color='black' href={`https://www.google.com/search?q=${props.author}`} target="_blank" underline="hover" >
                 <Typography variant="body6" color="text.secondary" sx={{ overflow: 'hidden',height:45  }}>
                   {props.author}
                 </Typography>
               </Link>
           </CardContent>
           <Button size="small" variant="contained" sx={{backgroundColor:'red',margin:1,marginLeft:1.5,padding:0.4,fontSize:12}}>
            Add to Basket
           </Button>
         </Card>
       );
    }
   

    useEffect(()=>{

        if(responseObject.years.length>0) {
           fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${responseObject.years[0]}-01-01&api-key=Qs9wTvBFVLOAyddOPNIHfEuctrBURUiy`).then((result)=>{
               result.json().then(res=>setStateSearch(res))
           })
        }
      },[urlState])

    //   console.log(objectSearch)
    //   console.log(responseObject)
    // console.log(stateSearch?.results.lists[0].books[0].book_image)
   
    if(!stateSearch) {
        return null
    }else {
        // console.log(stateSearch.results.lists[0].books[0].author)
        return (
            <Grid container item xs={12} sx = {{backgroundColor:grey[200]}}  >
                <Grid item xs={3}>
                    <Typography>Abraham</Typography>
                  

                </Grid>
                <Grid container  item xs={9} >
                    <Grid  item xs={12} sx={{paddingBottom:4}}  >
                        <Typography sx={{fontSize:20}}>Search result </Typography>
                    </Grid>
                    <Grid item container spacing={2} xs={12} sx={{backgroundColor:'white'}} direction='row' justifyContent='space-between'>
                        {stateSearch.results.lists[0].books.map((item,index)=>{
                            return (
                                <Grid item key={index}>
                                    <SearchCard  book_image={item.book_image}
                                                 title ={item.title}
                                                 author={item.author} 
                                                 
                                     ></SearchCard>

                                </Grid>
                            )
                        })}


                        {/* <SearchCard  book_image={stateSearch.results.lists[0].books[0].book_image}
                                     title ={stateSearch.results.lists[0].books[0].title}
                                     author={stateSearch.results.lists[0].books[0].author} 
                        ></SearchCard>              */}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
   
}


export default function SearchPage () {
    
    return (
        
        <div>
            <ResponsiveAppBar/>
            
                <SearchView ></SearchView>
            
        </div>
    )
}