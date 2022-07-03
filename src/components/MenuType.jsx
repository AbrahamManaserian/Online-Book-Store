import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';  
import ListSubheader from '@mui/material/ListSubheader';


export default  function DatePopper(props) {
  const [stateBook,setStateBook] =React.useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setStateBook()
  };
  const handleNestydClick=(num)=>{
    setStateBook(num)
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popperNor' : undefined;
  return (
    <Box  onClick={handleClick} style={{overflow:'hidden'}}>
      <Box  style={{cursor:'pointer'}} aria-describedby={id} type="button">
          <ListItemButton sx={{width:'100%',}}>
                <ListItemText primary='LIST'/>
                <Divider/>
            </ListItemButton>
      </Box>
      <Menu  id={id} open={open} onClose={handleClick} anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
      >
        <Box  sx={{display:'flex',flexDirection: 'row',}}>

         <List  sx={{p:0,  maxWidth: 360, bgcolor: 'background.paper'}} component="nav"
            subheader={
              <ListSubheader component="div" >
                Bestsellers lists 2022
              </ListSubheader>}
         >
           {!props.state ?null: props.state.map((
              item,index)=>{
                const colorList=stateBook==index?'red':'auto'
                return (
                  <Box onMouseEnter={()=> handleNestydClick(index)}  key={index} sx={{paddingBottom:0,marginBottom:0}} >
                  <ListItemButton   sx={{height:35,paddingLeft:3}}>
                    <ListItemText primaryTypographyProps={{fontSize:13}}  primary={item.list_name}/>
                    <ArrowForwardIosIcon sx={{paddingLeft:3,fontSize: 15,color:colorList}}/>
                  </ListItemButton>
                  <Divider/>
                </Box>
              )
            })}
          </List>
          <List   sx={{p:0,  maxWidth: 360, bgcolor: 'background.paper'}} component="nav"
              subheader={
                <ListSubheader component="div" >
                  Books
                </ListSubheader>}
          >
        
           {typeof(stateBook)!== 'number'?null: props.lists[stateBook].books.map((
             item,index)=>{
              return (
                <Box key={index} sx={{paddingLeft:1}}>
                  <ListItemButton   sx={{height:35,}}>
                    <ListItemText primaryTypographyProps={{fontSize:13}}  primary={item.title}/>
                  </ListItemButton>
                 <Divider/>
                </Box>
              )
            })}
          </List>
        </Box>
      </Menu>
    </Box>
  );
}









