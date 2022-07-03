import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState,useEffect,useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grow } from '@mui/material';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popper from '@mui/material/Popper';
import { List, ListItemButton, ListItemText } from '@mui/material';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});



export function BestSellerNTimes () {
  const [dateState,setDateState] = useState('')
  const[state,setState] = useState(null)
    useEffect(async ()=>{
        const response =await fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?${dateState}api-key=Qs9wTvBFVLOAyddOPNIHfEuctrBURUiy`)
        const body = await response.json()
        setState(body)
        console.log(body)
    },[dateState])

    

  function BestSellerCard(props) {
    return (
     <Card sx={{ width: 130, height:310 }}>
        <Link  href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.title}`} target="_blank">
        <CardMedia
         component="img"
         height="170"
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
    );}


  function DatePopper(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
       setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popperNor' : undefined;
    return (
     <Box  onMouseEnter={handleClick} onMouseLeave={handleClick} style={{overflow:'hidden'}}>
       <Box  style={{cursor:'pointer'}} aria-describedby={id} type="button">
          <ListItemButton sx={{width:'100%'}}>
                <ListItemText primary={props.year}/>
            </ListItemButton>
       </Box>
       <Popper sx={{overflow:''}} id={id} open={open} anchorEl={anchorEl}>
         <List onClick={handleClick} sx={{borderRadius:1,p:0, width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} component="nav">
          {['January','February','March','April','May','June','July','August','September','October','November','December'].map((
            item,index)=>{
              return (
                <ListItemButton key={index} sx={{height:35}}  onClick={() =>  
                  props.changeState(`published_date=${props.year}-${index<9?`0${index+1}`:`${index+1}`}-01&`)}>
                    <ListItemText    primary={item}/>
                </ListItemButton>
              )
            })}
         </List>
        </Popper>
     </Box>
     );
    }

    if(!state) return null
    return(
     <Box  sx={{padding:2}}> 
        <Box sx={{display:'flex',justifyContent:'flex-start',p:0}}>
            <Box sx={{flexGrow:2,textAlign:'center',fontSize:{xs:16,sm:20},alignSelf: 'center',paddingBottom:2}}>Discover last 10 years bestsellers </Box>
        </Box>
        <Box sx={{display:'flex', backgroundColor:grey['A200'],p:0,justifyContent: 'space-between',flexWrap: 'wrap',flexDirection: 'row', }}>
          
           {[2021,2020,2019,2018,2017,2016,2015,2014,2013,2012].map((item,index)=>{
             return <DatePopper  key={index} year={item} changeState={setDateState}></DatePopper>
           })}
        </Box>
        {state.results.lists.map((item1,index1)=> 
           <Box  key={index1}> 
              <Typography  gutterBottom variant="h5" component="div" sx={{ overflow: 'hidden',textDecoration: 'underline',marginTop:2 }}>
                 BestSellers: {item1.list_name}
             </Typography>
             <Box sx={{ display: 'flex',flexDirection: 'row',overflow: 'auto' }}>
               {item1.books.map((item,index)=> 
                  <Box key={index} sx ={{margin:1}}>
                     <BestSellerCard 
                       book_image={item.book_image}
                       title ={item.title}
                       author={item.author} />
                  </Box>)}
              </Box>
          </Box>)}
    </Box>
    )
}



export function SaleSlideshow() {
    const delay = 3000;
    const[state,setState] = useState(null)
    useEffect( ()=>{
      
      async function anun() {
        const response =await fetch('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=Qs9wTvBFVLOAyddOPNIHfEuctrBURUiy')
        const body = await response.json()
        setState(body)

      }
      anun()

    },[])
    
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
  
    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === state?.results?.lists.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
        
      return () => {
        resetTimeout();
      };
    }, [index]);

   function SaleCard(props) {
    return (
     <Paper
      sx={{
        p: 1,
        // margin: 'auto',
        maxWidth: 700,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
       <Grid container spacing={1} >
        <Grid item  xs={5}  >
          <ButtonBase sx={{ height:150,margin:0,padding:0,   }}>
            <Img  alt="complex" src={props.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={7} sx={{ display: { xs: 'block', sm: 'none', md: 'none',lg:'block',xl:'none' } }}  	>
          <Box 	  style={{whiteSpace: 'normal',}}>
            <Typography sx={{overflow:'scroll',textIndent:'20px',textAlign:'justify',maxHeight:145}} gutterBottom variant="body2" component="div">
                 {props.description?`${props.description}`: 'Sorry,  No Discription'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography  sx={{ display: { xs: 'none', sm: 'block' },width:230,overflow:'hidden' }} gutterBottom variant="subtitle3" component="div">
                 {props.listName}
              </Typography>
              <Link color='red' href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.isbm}`} target="_blank" underline="hover">
                <Typography style={{whiteSpace: 'normal', overflow:'hidden',height:18}} variant="body2" gutterBottom>
                  {`${props.title}`}
                </Typography>
              </Link>
              <Link color='red' href={`https://www.google.com/search?q=${props.author}`} target="_blank" underline="hover">
                <Typography style={{whiteSpace: 'normal', overflow:'hidden',height:18}} variant="body2" gutterBottom>
                  {`${props.author}`}
                </Typography>
              </Link>
              <Link href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.isbm}`} target="_blank" underline="hover" color='black'>
                <Typography  variant="body2" color="text.secondary">
                  {`ISBM: ${props.isbm}`}
                </Typography>
              </Link >
                <Typography style={{whiteSpace: 'normal', overflow:'hidden',height:18}} variant="body2" color="text.secondary">
                  {`Updated: ${props.date}`}
                </Typography>
            </Grid>
            <Grid item>
              <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                <Typography sx={{ cursor: 'pointer'}} variant="subtitle1">
                     Remove
                </Typography>
                <Typography variant="subtitle1" component="div">
                   $19.00
                </Typography>
              </Box>
            </Grid>
          </Grid>
         </Grid>
       </Grid>
     </Paper>
    );
    }
    if(!state) return null
    
    return (
      <div className="slideshow">
        <div
          className={`${index===0 ? "slideshowSlider1" : "slideshowSlider"}`}
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {state.results.lists.map((item, index) => (
            <div
              className="slide"
              key={index}
              // style={{backgroundColor: backgroundColor }}
            > <Grid sx ={{p:2}} container spacing={1} >
                <Grid item xs={12} lg={6}>
                  <SaleCard image={item.books[item.books.length-1].book_image}
                            title ={item.books[item.books.length-1].title}
                            author={item.books[item.books.length-1].author} 
                            description={item.books[item.books.length-1].description}
                            isbm={item.books[item.books.length-1].primary_isbn10}
                            date={item.books[item.books.length-1].updated_date}
                            listName={item.list_name}
                            
                  ></SaleCard>
                </Grid>
                <Grid item xs={12} lg={6}  sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                   <SaleCard image={item.books[item.books.length-2].book_image}
                             title ={item.books[item.books.length-2].title}
                             author={item.books[item.books.length-2].author}
                             description={item.books[item.books.length-2].description}
                             isbm={item.books[item.books.length-2].primary_isbn10}
                             date={item.books[item.books.length-2].updated_date}
                             listName={item.list_name}
                   ></SaleCard>
                </Grid>
             </Grid> 
            </div>
          ))}
        </div>
  
        <div className="slideshowDots">

          {state.results.lists.map((_, idx) => (
            <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
            ></div>
            
          )) }
        </div>
      </div>
    );
  }
  

export function GoogleCard (props) {
  const [state,setState] =useState(null)
  useEffect(async ()=>{
    const response = await fetch('https://books.googleapis.com/books/v1/volumes?q=bestseller%20books&download=EPUB&maxResults=12')
    const body = await response.json()
    setState(body)
    return null
  },[])
  
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', { 
       duration: theme.transitions.duration.shortest,
       }),
  }));

  function ReviewCard(props) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (
     <Card sx={{ maxWidth: 345,flexGrow:1 }}>
      
      <Box sx={{display:'flex',alignContent: 'center', flexGrow:1}}>
        <Img sx={{maxWidth:180}} src={props.image}/>
      </Box>
      <CardContent>
         <Link color='red' href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.isbm}`} target="_blank" underline="hover">
                <Typography style={{whiteSpace: 'normal', overflow:'hidden',height:18}} variant="body2" gutterBottom>
                  {`${props.title}`}
                </Typography>
         </Link>
         <Link color='black' href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.isbm}`} target="_blank" underline="hover">
                <Typography style={{whiteSpace: 'normal', overflow:'hidden',height:18}} variant="body2" gutterBottom>
                  {`${props.authors}`}
                </Typography>
         </Link>
         <Typography sx={{textAlign:'justify',height:18,overflow:'hidden'}} variant="body2" color="text.secondary">
             Publish Date: {props.date}
         </Typography>
         <Typography sx={{textAlign:'justify',height:18,overflow:'hidden'}} variant="body2" color="text.secondary">
             Pages: {props.pages}
         </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         
          <Typography sx={{textAlign:'justify',textIndent:'13px'}}>
             {props.discription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
  if(!state) return null
  return(
    // <Grid container spacing={2}>
      <Box sx={{paddingTop:2}}>

      {state.items.map((item,index)=> 
        <Box key = {index} sx={{paddingBottom:2}} > 
            <ReviewCard  image= {item?.volumeInfo.imageLinks.thumbnail}
                               title= {item?.volumeInfo.title}
                               authors= {item?.volumeInfo.authors}
                               date = {item?.volumeInfo.publishedDate}
                               pages = {item?.volumeInfo.pageCount}
                               discription ={item?.volumeInfo.description}>
                              
            </ReviewCard>
        </Box>
      )}
      </Box>
  )
}  



export function AdvertisingCard (props) {
  return (
    <Card sx={{padding:1,margin:2}}>
        <Link   href={`https://www.google.am/search?tbm=bks&hl=en&q=${props.title}`} target="_blank">
        <CardMedia 
        sx={{borderRadius:1}}
         component="img"
         height="170"
         
        //  image={require('/Users/abraham/projects/online-boock-store/public/BookLips.jpeg')}  
         alt={props.title}
        />
       </Link>
        <CardContent sx={{padding:0.5,height:124,  overflow: 'scroll' }}>
            <Typography sx={{textAlign:'justify',textIndent:'13px',marginTop:1}}>Տասնամյա Օգի Փուլմանը, որը ծնվել էր դեմքի ահավոր շեղումներով և որն արևի տակ իր տեղն ունենալու համար պետք է ահավոր դժվարություններ հաղթահարեր, տնային կրթություն ստանալուց հետո, արդեն հինգերորդ դասարանում ընդունվում է Մանհեթենի մասնավոր միջին դպրոցներից մեկը: Դպրոցական կյանքն իր հետ բերում է նոր տհաճություններ՝ համադասարանցիների ծաղրական վերաբերմունք, վախ ու մեկուսացում: Բայց իր բնավորության և կամքի շնորհիվ Օգիին հաջողվում է ապացուցել, որ ինքն էլ, բոլորի նման, սովորական երեխա և սովորական աշակերտ է:</Typography>
        </CardContent>
            <Typography sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>Հրաշքը Ռ.Ջ.ՊԱԼԱՑԻՈ</Typography>
    </Card>
  )
}