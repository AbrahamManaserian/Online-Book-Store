import React from "react";
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
import { Link } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';






export  function SearchMenu() {
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                         <FormControl sx={{width:100,}} size="small">
                            <InputLabel id="demo-simple-select-label">to</InputLabel>
                            <Select 
                            {...register("yearTo",{validate:value=>{
                                if(getValues('yearFrom')&&getValues('yearTo')) {
                                    return  Number(value)>=Number(getValues('yearFrom'))

                                }
                             }})}
                            labelId="demo-simple-select-label"
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
                        </form>
                     </Box>
                 </Grid>
                 <Grid item xs={12}>
                    {(getValues('yearTo')<getValues('yearFrom'))&&getValues('yearTo')?<Typography sx={{color:'red',fontSize:12,width:'100%'}}>
                        Year from must be smaller than year to </Typography>:null}
                    {!getValues('yearFrom')&&<Typography sx={{color:'red',fontSize:12,width:'98%'}}>year from is required</Typography>}
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
                     {!getValues('monthFrom') && <Typography sx={{color:'red',fontSize:12,width:'98%'}}>month from is required</Typography>}
                     {(months.indexOf(getValues('monthTo'))<months.indexOf(getValues('monthFrom')))&&getValues('monthTo')?<Typography sx={{color:'red',fontSize:12,width:'100%'}}>
                        Please, correct tour input! </Typography>:null}
                  </Grid>   
             </Grid>
             <Grid item xs={12}>
                 <Box sx={{height:200,border:1,marginTop:1}}>
                     {watch('yearFrom')}
                 </Box>
             </Grid>
        </Grid>
        {/* direction='row' alignItems='flex-start' justifyContent='flex-start' */}
        <Grid container item xs={12} sm={5} direction='row'   > 
            <Grid  container  item xs ={12} alignItems='flex-start' direction='row' justifyContent='center' >
                 <Typography  >Book Lists</Typography>
            </Grid>
            <Grid container item xs={12} justifyContent='center' alignItems='flex-start' direction='row'  >
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
                <Link to={isValid &&`/search/=$$$${getValues('yearFrom')}$$$${getValues('yearTo')}$$$${getValues('monthFrom')}$$$${getValues('monthTo')}$$$${getValues('checkbox.lists').join('$$$')}`} 
                style={{textDecoration:'none'}} >
                    <Button sx={{fontSize:14,height:40,width:100, backgroundColor:teal[500],color:'white',":hover":{backgroundColor:teal[800]}}}>
                        search
                    </Button>
                        </Link>
             </Grid>
        </Grid>
    </Grid>
</div>
  );
}


