import * as React from 'react';
import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { brown, grey, teal } from '@mui/material/colors';
import ListButton from './MenuType'
import {SearchButton} from './SearchButton.jsx'
import {SearchMenu} from './SearchPage'
import UserRegisterMenu from './UserRegisterMenu'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '70%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const pages = ['Home', 'About', 'Contacts'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const[state,setState] =React.useState(null)
  React.useEffect(async()=>{
    const response =await fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=Qs9wTvBFVLOAyddOPNIHfEuctrBURUiy`)
    const body = await response.json()
    


    // console.log(body)
    setState(body)
  },[])
  return (
    <AppBar sx={{backgroundColor: teal[900]}} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            // noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >

           {state? <ListButton lists={state.results.lists} state={state.results.lists}></ListButton>:
             <ListItemButton sx={{width:'100%'}}>
                <ListItemText primary='LIST'/>
            </ListItemButton>}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={`/${page}`} key={page} style={{textDecoration:"none"}} >
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1,overflow:'hidden', display: { xs: 'flex', md: 'none' } }}
          >
            BookStore
          </Typography> */}
          <Box sx={{  display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={`/${page}`} key={page} style={{textDecoration:"none"}} >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                   >
                  {page}    
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{display:'flex',flexGrow: 1,justifyContent: 'center'}}>
            <Search >
                <SearchIconWrapper>
                   <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    sx={{width:'100%'}}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
             </Search>
               <SearchMenu></SearchMenu>
            </Box>

          <Box sx={{display:'flex', }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
            <UserRegisterMenu></UserRegisterMenu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;


async function getData () {
  let dataObject ={}
  const response =await fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=Qs9wTvBFVLOAyddOPNIHfEuctrBURUiy`)
        const body = await response.json()
        // console.log(body)
        for(let key in body.results) {
          if(key=='bestsellers_date') { 
            dataObject[key]=body.results[key]
          }
          if(key='lists') dataObject[key] =[]
          body.results.lists.forEach((item,index)=>{
            dataObject.lists[index] ={}
            for(let key1 in item) {
              if(key1=='books') {
                dataObject.lists[index][key1]=[]
                item[key1].forEach((item1,index1)=>{
                  dataObject.lists[index][key1][index1]={}
                  for(let key2 in item1) {
                    if(key2=='title' || key2 == 'author'|| key2 =='publisher') dataObject.lists[index][key1][index1][key2]=item1[key2]
                  }
                })

              }else if(key1 =='display_name' || key1 =='list_name') dataObject.lists[index][key1]=item[key1]
            }
          })
          
        }
        // console.log(dataObject)
}
//  getData()


 let obj={
  "bestsellers_date": "2022-04-02",
  "lists": [
      {
          "list_name": "Combined Print and E-Book Fiction",
          "display_name": "Combined Print & E-Book Fiction",
          "books": [
              {
                  "author": "Delia Owens",
                  "publisher": "Putnam",
                  "title": "WHERE THE CRAWDADS SING"
              },
              {
                  "author": "Dolly Parton and James Patterson",
                  "publisher": "Little, Brown",
                  "title": "RUN, ROSE, RUN"
              },
              {
                  "author": "Julia Quinn",
                  "publisher": "Avon",
                  "title": "THE VISCOUNT WHO LOVED ME"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Atria",
                  "title": "IT ENDS WITH US"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Grand Central",
                  "title": "VERITY"
              },
              {
                  "author": "Lisa Scottoline",
                  "publisher": "Putnam",
                  "title": "WHAT HAPPENED TO THE BENNETTS"
              },
              {
                  "author": "Taylor Jenkins Reid",
                  "publisher": "Washington Square/Atria",
                  "title": "THE SEVEN HUSBANDS OF EVELYN HUGO"
              },
              {
                  "author": "Julia Quinn",
                  "publisher": "Avon",
                  "title": "THE DUKE AND I"
              },
              {
                  "author": "Kate Quinn",
                  "publisher": "Morrow",
                  "title": "THE DIAMOND EYE"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Atria",
                  "title": "UGLY LOVE"
              },
              {
                  "author": "Julia Quinn",
                  "publisher": "Avon",
                  "title": "AN OFFER FROM A GENTLEMAN"
              },
              {
                  "author": "Janet Evanovich",
                  "publisher": "Atria",
                  "title": "THE RECOVERY AGENT"
              },
              {
                  "author": "Lucy Foley",
                  "publisher": "Morrow",
                  "title": "THE PARIS APARTMENT"
              },
              {
                  "author": "Julia Quinn",
                  "publisher": "Avon",
                  "title": "ROMANCING MISTER BRIDGERTON"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Atria",
                  "title": "NOVEMBER 9"
              }
          ]
      },
      {
          "list_name": "Combined Print and E-Book Nonfiction",
          "display_name": "Combined Print & E-Book Nonfiction",
          "books": [
              {
                  "author": "Bessel van der Kolk",
                  "publisher": "Penguin",
                  "title": "THE BODY KEEPS THE SCORE"
              },
              {
                  "author": "Will Smith with Mark Manson",
                  "publisher": "Penguin Press",
                  "title": "WILL"
              },
              {
                  "author": "Dave Grohl",
                  "publisher": "Dey Street",
                  "title": "THE STORYTELLER"
              },
              {
                  "author": "Hannah Gads",
                  "publisher": "Ballantine",
                  "title": "TEN STEPS TO NANETTE"
              },
              {
                  "author": "Alex Kershaw",
                  "publisher": "Dutton Caliber",
                  "title": "AGAINST ALL ODDS"
              },
              {
                  "author": "edited  Nikole Hannah-Jones, Caitlin Roper, Ilena Silverman and Jake Silverstein",
                  "publisher": "One World",
                  "title": "THE 1619 PROJECT"
              },
              {
                  "author": "Tara Westover",
                  "publisher": "Random House",
                  "title": "EDUCATED"
              },
              {
                  "author": "Michelle Zauner",
                  "publisher": "Knopf",
                  "title": "CRYING IN H MART"
              },
              {
                  "author": "Erik Larson",
                  "publisher": "Crown",
                  "title": "THE SPLENDID AND THE VILE"
              },
              {
                  "author": "William P. Barr",
                  "publisher": "Morrow",
                  "title": "ONE DAMN THING AFTER ANOTHER"
              },
              {
                  "author": "bell hooks",
                  "publisher": "Morrow",
                  "title": "ALL ABOUT LOVE"
              },
              {
                  "author": "Robin Wall Kimmerer",
                  "publisher": "Milkweed Editions",
                  "title": "BRAIDING SWEETGRASS"
              },
              {
                  "author": "Marie Yovanovitch",
                  "publisher": "Mariner",
                  "title": "LESSONS FROM THE EDGE"
              },
              {
                  "author": "Arthur C. Brooks",
                  "publisher": "Portfolio",
                  "title": "FROM STRENGTH TO STRENGTH"
              },
              {
                  "author": "Natalie Haynes",
                  "publisher": "Harper Perennial",
                  "title": "PANDORA'S JAR"
              }
          ]
      },
      {
          "list_name": "Hardcover Fiction",
          "display_name": "Hardcover Fiction",
          "books": [
              {
                  "author": "Dolly Parton and James Patterson",
                  "publisher": "Little, Brown",
                  "title": "RUN, ROSE, RUN"
              },
              {
                  "author": "Lisa Scottoline",
                  "publisher": "Putnam",
                  "title": "WHAT HAPPENED TO THE BENNETTS"
              },
              {
                  "author": "Kate Quinn",
                  "publisher": "Morrow",
                  "title": "THE DIAMOND EYE"
              },
              {
                  "author": "Lucy Foley",
                  "publisher": "Morrow",
                  "title": "THE PARIS APARTMENT"
              },
              {
                  "author": "Janet Evanovich",
                  "publisher": "Atria",
                  "title": "THE RECOVERY AGENT"
              },
              {
                  "author": "Rebecca Serle",
                  "publisher": "Atria",
                  "title": "ONE ITALIAN SUMMER"
              },
              {
                  "author": "Anne Tyler",
                  "publisher": "Knopf",
                  "title": "FRENCH BRAID"
              },
              {
                  "author": "Matt Haig",
                  "publisher": "Viking",
                  "title": "THE MIDNIGHT LIBRARY"
              },
              {
                  "author": "C.J. Box",
                  "publisher": "Putnam",
                  "title": "SHADOWS REEL"
              },
              {
                  "author": "Harlan Coben",
                  "publisher": "Grand Central",
                  "title": "THE MATCH"
              },
              {
                  "author": "Amor Towles",
                  "publisher": "Viking",
                  "title": "THE LINCOLN HIGHWAY"
              },
              {
                  "author": "Nita Prose",
                  "publisher": "Ballantine",
                  "title": "THE MAID"
              },
              {
                  "author": "Laura Dave",
                  "publisher": "Simon & Schuster",
                  "title": "THE LAST THING HE TOLD ME"
              },
              {
                  "author": "Sarah J. Maas",
                  "publisher": "Bloomsbury",
                  "title": "HOUSE OF SKY AND BREATH"
              },
              {
                  "author": "Ellery Lloyd",
                  "publisher": "Harper",
                  "title": "THE CLUB"
              }
          ]
      },
      {
          "list_name": "Hardcover Nonfiction",
          "display_name": "Hardcover Nonfiction",
          "books": [
              {
                  "author": "Will Smith with Mark Manson",
                  "publisher": "Penguin Press",
                  "title": "WILL"
              },
              {
                  "author": "Dave Grohl",
                  "publisher": "Dey Street",
                  "title": "THE STORYTELLER"
              },
              {
                  "author": "Alex Kershaw",
                  "publisher": "Dutton Caliber",
                  "title": "AGAINST ALL ODDS"
              },
              {
                  "author": "edited  Nikole Hannah-Jones, Caitlin Roper, Ilena Silverman and Jake Silverstein",
                  "publisher": "One World",
                  "title": "THE 1619 PROJECT"
              },
              {
                  "author": "William P. Barr",
                  "publisher": "Morrow",
                  "title": "ONE DAMN THING AFTER ANOTHER"
              },
              {
                  "author": "Hannah Gads",
                  "publisher": "Ballantine",
                  "title": "TEN STEPS TO NANETTE"
              },
              {
                  "author": "Michelle Zauner",
                  "publisher": "Knopf",
                  "title": "CRYING IN H MART"
              },
              {
                  "author": "Marie Yovanovitch",
                  "publisher": "Mariner",
                  "title": "LESSONS FROM THE EDGE"
              },
              {
                  "author": "Arthur C. Brooks",
                  "publisher": "Portfolio",
                  "title": "FROM STRENGTH TO STRENGTH"
              },
              {
                  "author": "Glennon Doyle",
                  "publisher": "Dial",
                  "title": "UNTAMED"
              },
              {
                  "author": "Matthew McConaughey",
                  "publisher": "Crown",
                  "title": "GREENLIGHTS"
              },
              {
                  "author": "Judd Apatow",
                  "publisher": "Random House",
                  "title": "SICKER IN THE HEAD"
              },
              {
                  "author": "Peter Schweizer",
                  "publisher": "Harper",
                  "title": "RED-HANDED"
              },
              {
                  "author": "Bruce D. Perry and Oprah Winfrey",
                  "publisher": "Flatiron",
                  "title": "WHAT HAPPENED TO YOU?"
              },
              {
                  "author": "Glenn Beck with Justin Haskins",
                  "publisher": "Forefront",
                  "title": "THE GREAT RESET"
              }
          ]
      },
      {
          "list_name": "Trade Fiction Paperback",
          "display_name": "Paperback Trade Fiction",
          "books": [
              {
                  "author": "Delia Owens",
                  "publisher": "Putnam",
                  "title": "WHERE THE CRAWDADS SING"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Atria",
                  "title": "IT ENDS WITH US"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Grand Central",
                  "title": "VERITY"
              },
              {
                  "author": "Taylor Jenkins Reid",
                  "publisher": "Washington Square/Atria",
                  "title": "THE SEVEN HUSBANDS OF EVELYN HUGO"
              },
              {
                  "author": "Julia Quinn",
                  "publisher": "Avon",
                  "title": "THE VISCOUNT WHO LOVED ME"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Atria",
                  "title": "UGLY LOVE"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Atria",
                  "title": "NOVEMBER 9"
              },
              {
                  "author": "Julia Quinn",
                  "publisher": "Avon",
                  "title": "THE DUKE AND I"
              },
              {
                  "author": "Ali Hazelwood",
                  "publisher": "Berkley",
                  "title": "THE LOVE HYPOTHESIS"
              },
              {
                  "author": "Emily Henry",
                  "publisher": "Berkley",
                  "title": "PEOPLE WE MEET ON VACATION"
              },
              {
                  "author": "Madeline Miller",
                  "publisher": "Ecco",
                  "title": "THE SONG OF ACHILLES"
              },
              {
                  "author": "Alex Michaelides",
                  "publisher": "Celadon",
                  "title": "THE SILENT PATIENT"
              },
              {
                  "author": "Janet Skeslien Charles",
                  "publisher": "Atria",
                  "title": "THE PARIS LIBRARY"
              },
              {
                  "author": "Elena Armas",
                  "publisher": "Atria",
                  "title": "THE SPANISH LOVE DECEPTION"
              },
              {
                  "author": "Lucy Foley",
                  "publisher": "Morrow",
                  "title": "THE GUEST LIST"
              }
          ]
      },
      {
          "list_name": "Paperback Nonfiction",
          "display_name": "Paperback Nonfiction",
          "books": [
              {
                  "author": "Bessel van der Kolk",
                  "publisher": "Penguin",
                  "title": "THE BODY KEEPS THE SCORE"
              },
              {
                  "author": "Tara Westover",
                  "publisher": "Random House",
                  "title": "EDUCATED"
              },
              {
                  "author": "Erik Larson",
                  "publisher": "Crown",
                  "title": "THE SPLENDID AND THE VILE"
              },
              {
                  "author": "bell hooks",
                  "publisher": "Morrow",
                  "title": "ALL ABOUT LOVE"
              },
              {
                  "author": "Robin Wall Kimmerer",
                  "publisher": "Milkweed Editions",
                  "title": "BRAIDING SWEETGRASS"
              },
              {
                  "author": "Natalie Haynes",
                  "publisher": "Harper Perennial",
                  "title": "PANDORA'S JAR"
              },
              {
                  "author": "Suleika Jaouad",
                  "publisher": "Random House",
                  "title": "BETWEEN TWO KINGDOMS"
              },
              {
                  "author": "Malcolm Gladwell",
                  "publisher": "Back Bay",
                  "title": "TALKING TO STRANGERS"
              },
              {
                  "author": "Bob Drury and Tom Clavin",
                  "publisher": "St. Martin's Griffin",
                  "title": "BLOOD AND TREASURE"
              },
              {
                  "author": "Julian Sancton",
                  "publisher": "Crown",
                  "title": "MADHOUSE AT THE END OF THE EARTH"
              },
              {
                  "author": "Serhii Plokhy",
                  "publisher": "Basic",
                  "title": "THE GATES OF EUROPE"
              },
              {
                  "author": "Alfred Lansing",
                  "publisher": "Basic",
                  "title": "ENDURANCE"
              },
              {
                  "author": "Trevor Noah",
                  "publisher": "One World",
                  "title": "BORN A CRIME"
              },
              {
                  "author": "Daniel Kahneman",
                  "publisher": "Farrar, Straus & Giroux",
                  "title": "THINKING, FAST AND SLOW"
              },
              {
                  "author": "Angela Duckworth",
                  "publisher": "Scribner",
                  "title": "GRIT"
              }
          ]
      },
      {
          "list_name": "Advice How-To and Miscellaneous",
          "display_name": "Advice, How-To & Miscellaneous",
          "books": [
              {
                  "author": "Tieghan Gerard",
                  "publisher": "Clarkson Potter",
                  "title": "HALF BAKED HARVEST EVERY DAY"
              },
              {
                  "author": "Shannon Bream",
                  "publisher": "Broadside",
                  "title": "THE MOTHERS AND DAUGHTERS OF THE BIBLE SPEAK"
              },
              {
                  "author": "James Clear",
                  "publisher": "Avery",
                  "title": "ATOMIC HABITS"
              },
              {
                  "author": "Brené Brown",
                  "publisher": "Random House",
                  "title": "ATLAS OF THE HEART"
              },
              {
                  "author": "Charlie Mackesy",
                  "publisher": "HarperOne",
                  "title": "THE BOY, THE MOLE, THE FOX AND THE HORSE"
              },
              {
                  "author": "Stephen Perrine with Heidi Skolnik",
                  "publisher": "Simon & Schuster",
                  "title": "THE WHOLE BODY RESET"
              },
              {
                  "author": "Eric Kim",
                  "publisher": "Clarkson Potter",
                  "title": "KOREAN AMERICAN"
              },
              {
                  "author": "Tony Robbins and Peter H. Diamandis with Robert Hariri",
                  "publisher": "Simon & Schuster",
                  "title": "LIFE FORCE"
              },
              {
                  "author": "Mark Manson",
                  "publisher": "Harper",
                  "title": "THE SUBTLE ART OF NOT GIVING A F*CK"
              },
              {
                  "author": "Shannon Bream",
                  "publisher": "Broadside",
                  "title": "THE WOMEN OF THE BIBLE SPEAK"
              }
          ]
      },
      {
          "list_name": "Childrens Middle Grade Hardcover",
          "display_name": "Children’s Middle Grade Hardcover",
          "books": [
              {
                  "author": "R.J. Palacio",
                  "publisher": "Knopf",
                  "title": "WONDER"
              },
              {
                  "author": "Alan Gratz",
                  "publisher": "Scholastic",
                  "title": "REFUGEE"
              },
              {
                  "author": "Rick Riordan",
                  "publisher": "Disney-Hyperion",
                  "title": "DAUGHTER OF THE DEEP"
              },
              {
                  "author": "Donna Barba Higuera",
                  "publisher": "Levine Querido",
                  "title": "THE LAST CUENTISTA"
              },
              {
                  "author": "Sharon M. Draper",
                  "publisher": "Atheneum",
                  "title": "OUT OF MY HEART"
              },
              {
                  "author": "Alan Gratz",
                  "publisher": "Scholastic",
                  "title": "GROUND ZERO"
              },
              {
                  "author": "Jason Reynolds.",
                  "publisher": "Atheneum/Caitlyn Dlouhy",
                  "title": "STUNTBOY, IN THE MEANTIME"
              },
              {
                  "author": "Sara Pennypacker.",
                  "publisher": "Balzer + Bray",
                  "title": "PAX, JOURNEY HOME"
              },
              {
                  "author": "Kelly Barnhill",
                  "publisher": "Algonquin",
                  "title": "THE OGRESS AND THE ORPHANS"
              },
              {
                  "author": "Katherine Applegate",
                  "publisher": "Feiwel & Friends",
                  "title": "WILLODEEN"
              }
          ]
      },
      {
          "list_name": "Picture Books",
          "display_name": "Children’s Picture Books",
          "books": [
              {
                  "author": "Jimmy Fallon.",
                  "publisher": "Feiwel & Friends",
                  "title": "NANA LOVES YOU MORE"
              },
              {
                  "author": "Adam Wallace and Andy Elkerton",
                  "publisher": "Sourcebooks Jabberwocky",
                  "title": "HOW TO CATCH THE EASTER BUNNY"
              },
              {
                  "author": "Ibram X. Kendi.",
                  "publisher": "Kokila",
                  "title": "ANTIRACIST BABY"
              },
              {
                  "author": "James Dean and Kimberly Dean",
                  "publisher": "HarperFestival",
                  "title": "PETE THE CAT: BIG EASTER ADVENTURE"
              },
              {
                  "author": "Jory John.",
                  "publisher": "HarperCollins",
                  "title": "THE GOOD EGG PRESENTS: THE GREAT EGGSCAPE!"
              },
              {
                  "author": "Seth Meyers.",
                  "publisher": "Flamingo",
                  "title": "I'M NOT SCARED, YOU'RE SCARED"
              },
              {
                  "author": "Shannon Hale.",
                  "publisher": "Abrams",
                  "title": "PRETTY PERFECT KITTY-CORN"
              },
              {
                  "author": "Adam Rubin.",
                  "publisher": "Dial",
                  "title": "DRAGONS LOVE TACOS"
              },
              {
                  "author": "Emily Winfield Martin",
                  "publisher": "Random House",
                  "title": "THE WONDERFUL THINGS YOU WILL BE"
              },
              {
                  "author": "Alice Schertle and Jill McElmurry",
                  "publisher": "Clarion",
                  "title": "GOOD NIGHT, LITTLE BLUE TRUCK"
              }
          ]
      },
      {
          "list_name": "Series Books",
          "display_name": "Children’s Series",
          "books": [
              {
                  "author": "and   Jeff Kinney",
                  "publisher": "Amulet",
                  "title": "DIARY OF A WIMPY KID"
              },
              {
                  "author": "J.K. Rowling",
                  "publisher": "Scholastic",
                  "title": "HARRY POTTER"
              },
              {
                  "author": "Holly Jackson",
                  "publisher": "Delacorte",
                  "title": "A GOOD GIRL'S GUIDE TO MURDER"
              },
              {
                  "author": "Rick Riordan",
                  "publisher": "Disney-Hyperion",
                  "title": "PERCY JACKSON & THE OLYMPIANS"
              },
              {
                  "author": "Tui T. Sutherland",
                  "publisher": "Scholastic",
                  "title": "WINGS OF FIRE"
              },
              {
                  "author": "Jim Gigliotti and others; various illustrators",
                  "publisher": "Penguin Workshop",
                  "title": "WHO WAS/IS . . . ?"
              },
              {
                  "author": "Scott Cawthon",
                  "publisher": "Scholastic",
                  "title": "FIVE NIGHTS AT FREDDY'S: FAZBEAR FRIGHTS"
              },
              {
                  "author": "Lauren Tarshis",
                  "publisher": "Scholastic",
                  "title": "I SURVIVED"
              },
              {
                  "author": "Mary Pope Osborne.",
                  "publisher": "Stepping Stone/Random House",
                  "title": "MAGIC TREE HOUSE"
              },
              {
                  "author": "Tracy Wolff",
                  "publisher": "Entangled Teen",
                  "title": "CRAVE"
              }
          ]
      },
      {
          "list_name": "Young Adult Hardcover",
          "display_name": "Young Adult Hardcover",
          "books": [
              {
                  "author": "Judy I. Lin",
                  "publisher": "Feiwel & Friends",
                  "title": "A MAGIC STEEPED IN POISON"
              },
              {
                  "author": "Karen M. McManus",
                  "publisher": "Delacorte",
                  "title": "ONE OF US IS LYING"
              },
              {
                  "author": "F.T. Lukens",
                  "publisher": "Margaret K. McElderry",
                  "title": "SO THIS IS EVER AFTER"
              },
              {
                  "author": "V.E. Schwab",
                  "publisher": "Greenwillow",
                  "title": "GALLANT"
              },
              {
                  "author": "Dustin Thao",
                  "publisher": "Wednesday",
                  "title": "YOU'VE REACHED SAM"
              },
              {
                  "author": "Xiran Jay Zhao",
                  "publisher": "Penguin Teen",
                  "title": "IRON WIDOW"
              },
              {
                  "author": "Jennifer Lynn Barnes",
                  "publisher": "Little, Brown",
                  "title": "THE HAWTHORNE LEGACY"
              },
              {
                  "author": "Chloe Gong",
                  "publisher": "Margaret K. McElderry",
                  "title": "THESE VIOLENT DELIGHTS"
              },
              {
                  "author": "Alice Oseman",
                  "publisher": "Scholastic",
                  "title": "LOVELESS"
              },
              {
                  "author": "Ruta Sepetys",
                  "publisher": "Philomel",
                  "title": "I MUST BETRAY YOU"
              }
          ]
      },
      {
          "list_name": "Audio Fiction",
          "display_name": "Audio Fiction",
          "books": [
              {
                  "author": "Dolly Parton and James Patterson",
                  "publisher": "Hachette Audio",
                  "title": "RUN, ROSE, RUN"
              },
              {
                  "author": "Lucy Foley",
                  "publisher": "HarperAudio",
                  "title": "THE PARIS APARTMENT"
              },
              {
                  "author": "Delia Owens",
                  "publisher": "Penguin Audio",
                  "title": "WHERE THE CRAWDADS SING"
              },
              {
                  "author": "Taylor Jenkins Reid",
                  "publisher": "Simon & Schuster Audio",
                  "title": "THE SEVEN HUSBANDS OF EVELYN HUGO"
              },
              {
                  "author": "Greer Hendricks and Sarah Pekkanen",
                  "publisher": "Macmillan Audio",
                  "title": "THE GOLDEN COUPLE"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Audible Studios",
                  "title": "VERITY"
              },
              {
                  "author": "Andy Weir",
                  "publisher": "Audible Studios",
                  "title": "PROJECT HAIL MARY"
              },
              {
                  "author": "Colleen Hoover",
                  "publisher": "Simon & Schuster Audio",
                  "title": "IT ENDS WITH US"
              },
              {
                  "author": "Amor Towles",
                  "publisher": "Penguin Audio",
                  "title": "THE LINCOLN HIGHWAY"
              },
              {
                  "author": "Nita Prose",
                  "publisher": "Random House Audio",
                  "title": "THE MAID"
              },
              {
                  "author": "Sarah J. Maas",
                  "publisher": "Audible Studios",
                  "title": "HOUSE OF SKY AND BREATH"
              },
              {
                  "author": "Janet Evanovich",
                  "publisher": "Simon & Schuster Audio",
                  "title": "THE RECOVERY AGENT"
              },
              {
                  "author": "C.J. Box",
                  "publisher": "Recorded Books",
                  "title": "SHADOWS REEL"
              },
              {
                  "author": "John Scalzi",
                  "publisher": "Audible Studios",
                  "title": "THE KAIJU PRESERVATION SOCIETY"
              },
              {
                  "author": "Laura Dave",
                  "publisher": "Simon & Schuster Audio",
                  "title": "THE LAST THING HE TOLD ME"
              }
          ]
      },
      {
          "list_name": "Audio Nonfiction",
          "display_name": "Audio Nonfiction",
          "books": [
              {
                  "author": "Will Smith with Mark Manson",
                  "publisher": "Penguin Audio",
                  "title": "WILL"
              },
              {
                  "author": "Matthew McConaughey",
                  "publisher": "Random House Audio",
                  "title": "GREENLIGHTS"
              },
              {
                  "author": "Bessel van der Kolk",
                  "publisher": "Penguin Audio",
                  "title": "THE BODY KEEPS THE SCORE"
              },
              {
                  "author": "Dave Grohl",
                  "publisher": "HarperAudio",
                  "title": "THE STORYTELLER"
              },
              {
                  "author": "Jocko Willink and Leif Babin",
                  "publisher": "Macmillan Audio",
                  "title": "EXTREME OWNERSHIP"
              },
              {
                  "author": "William P. Barr",
                  "publisher": "HarperAudio",
                  "title": "ONE DAMN THING AFTER ANOTHER"
              },
              {
                  "author": "Bruce D. Perry and Oprah Winfrey",
                  "publisher": "Macmillan Audio",
                  "title": "WHAT HAPPENED TO YOU?"
              },
              {
                  "author": "edited  Nikole Hannah-Jones, Caitlin Roper, Ilena Silverman and Jake Silverstein",
                  "publisher": "Random House Audio",
                  "title": "THE 1619 PROJECT"
              },
              {
                  "author": "Bob Odenkirk",
                  "publisher": "Random House Audio",
                  "title": "COMEDY COMEDY COMEDY DRAMA"
              },
              {
                  "author": "Trevor Noah",
                  "publisher": "Audible Studios",
                  "title": "BORN A CRIME"
              },
              {
                  "author": "Glenn Beck with Justin Haskins",
                  "publisher": "Mercury Radio Arts",
                  "title": "THE GREAT RESET"
              },
              {
                  "author": "Yuval Noah Harari",
                  "publisher": "HarperAudio",
                  "title": "SAPIENS"
              },
              {
                  "author": "Elie Mystal",
                  "publisher": "Audible Studios",
                  "title": "ALLOW ME TO RETORT"
              },
              {
                  "author": "Glennon Doyle",
                  "publisher": "Random House Audio",
                  "title": "UNTAMED"
              },
              {
                  "author": "Adam Grant",
                  "publisher": "Penguin Audio",
                  "title": "THINK AGAIN"
              }
          ]
      },
      {
          "list_name": "Business Books",
          "display_name": "Business",
          "books": [
              {
                  "author": "James Clear",
                  "publisher": "Avery",
                  "title": "ATOMIC HABITS"
              },
              {
                  "author": "Arthur C. Brooks",
                  "publisher": "Portfolio",
                  "title": "FROM STRENGTH TO STRENGTH"
              },
              {
                  "author": "Ray Dalio",
                  "publisher": "Avid Reader",
                  "title": "PRINCIPLES FOR DEALING WITH THE CHANGING WORLD ORDER"
              },
              {
                  "author": "Brené Brown",
                  "publisher": "Random House",
                  "title": "DARE TO LEAD"
              },
              {
                  "author": "Daniel Kahneman",
                  "publisher": "Farrar, Straus & Giroux",
                  "title": "THINKING, FAST AND SLOW"
              },
              {
                  "author": "Sara G. Forden",
                  "publisher": "Custom House",
                  "title": "THE HOUSE OF GUCCI"
              },
              {
                  "author": "Jocko Willink and Leif Babin",
                  "publisher": "St. Martin's",
                  "title": "EXTREME OWNERSHIP"
              },
              {
                  "author": "Angela Duckworth",
                  "publisher": "Scribner",
                  "title": "GRIT"
              },
              {
                  "author": "Johann Hari",
                  "publisher": "Crown",
                  "title": "STOLEN FOCUS"
              },
              {
                  "author": "Carolyn Dewar, Scott Keller and Vikram Malhotra",
                  "publisher": "Scribner",
                  "title": "CEO EXCELLENCE"
              }
          ]
      },
      {
          "list_name": "Graphic Books and Manga",
          "display_name": "Graphic Books and Manga",
          "books": [
              {
                  "author": "Dav Pilkey",
                  "publisher": "Scholastic",
                  "title": "PERSPECTIVES"
              },
              {
                  "author": "Art Spiegelman",
                  "publisher": "Pantheon",
                  "title": "MAUS I: A SURVIVOR'S TALE: MY FATHER BLEEDS HISTORY"
              },
              {
                  "author": "Kohei Horikoshi",
                  "publisher": "VIZ Media",
                  "title": "MY HERO ACADEMIA, VOL. 30"
              },
              {
                  "author": "Ann M. Martin.",
                  "publisher": "Scholastic",
                  "title": "GOOD-BYE STACEY, GOOD-BYE"
              },
              {
                  "author": "Tui T. Sutherland.",
                  "publisher": "Scholastic",
                  "title": "THE BRIGHTEST NIGHT"
              },
              {
                  "author": "Scott Cawthon and Kira Breed-Wrisley.",
                  "publisher": "Scholastic",
                  "title": "THE FOURTH CLOSET"
              },
              {
                  "author": "Koyoharu Gotouge",
                  "publisher": "VIZ Media",
                  "title": "DEMON SLAYER: KIMETSU NO YAIBA, VOL. 1"
              },
              {
                  "author": "Scott Cawthon and Kira Breed-Wrisley. Adapted and",
                  "publisher": "Scholastic",
                  "title": "THE SILVER EYES"
              },
              {
                  "author": "Dav Pilkey",
                  "publisher": "Scholastic",
                  "title": "MOTHERING HEIGHTS"
              },
              {
                  "author": "Tatsuki Fujimoto",
                  "publisher": "VIZ Media",
                  "title": "CHAINSAW MAN, VOL. 1"
              },
              {
                  "author": "Ryoji Hirano",
                  "publisher": "VIZ Media",
                  "title": "DEMON SLAYER: KIMETSU NO YAIBA--STORIES OF WATER AND FLAME"
              },
              {
                  "author": "Scott Cawthon and Kira Breed-Wrisley.",
                  "publisher": "Scholastic",
                  "title": "THE TWISTED ONES"
              },
              {
                  "author": "Art Spiegelman",
                  "publisher": "Pantheon",
                  "title": "MAUS II: A SURVIVOR'S TALE: AND HERE MY TROUBLES BEGAN"
              },
              {
                  "author": "Dav Pilkey",
                  "publisher": "Scholastic",
                  "title": "GRIME AND PUNISHMENT"
              },
              {
                  "author": "Dav Pilkey",
                  "publisher": "Scholastic",
                  "title": "CAT KID COMIC CLUB"
              }
          ]
      },
      {
          "list_name": "Mass Market Monthly",
          "display_name": "Mass Market",
          "books": [
              {
                  "author": "John Grisham",
                  "publisher": "Anchor",
                  "title": "SOOLEY"
              },
              {
                  "author": "David Baldacci",
                  "publisher": "Grand Central",
                  "title": "DAYLIGHT"
              },
              {
                  "author": "Clive Cussler and Graham Brown",
                  "publisher": "Putnam",
                  "title": "FAST ICE"
              },
              {
                  "author": "Danielle Steel",
                  "publisher": "Dell",
                  "title": "FINDING ASHLEY"
              },
              {
                  "author": "Lisa Jackson et al",
                  "publisher": "Zebra",
                  "title": "AFRAID"
              },
              {
                  "author": "James Patterson and Maxine Paetro",
                  "publisher": "Grand Central",
                  "title": "THE 20TH VICTIM"
              },
              {
                  "author": "James Patterson",
                  "publisher": "Grand Central",
                  "title": "THE PALM BEACH MURDERS"
              },
              {
                  "author": "Debbie Macomber",
                  "publisher": "MIRA",
                  "title": "A WISH UPON A DRESS"
              },
              {
                  "author": "Lisa Jewell",
                  "publisher": "Pocket",
                  "title": "THE GIRLS IN THE GARDEN"
              },
              {
                  "author": "Nora Roberts",
                  "publisher": "Silhouette",
                  "title": "SECRETS BY NIGHTFALL"
              },
              {
                  "author": "Ron Carr",
                  "publisher": "MIRA",
                  "title": "SUNRISE ON HALF MOON BAY"
              },
              {
                  "author": "William W. Johnstone and J.A. Johnstone",
                  "publisher": "Pinnacle",
                  "title": "THE VIOLENT STORM"
              },
              {
                  "author": "Nora Roberts",
                  "publisher": "Silhouette",
                  "title": "BOOK OF DREAMS"
              },
              {
                  "author": "Stuart Woods",
                  "publisher": "Putnam",
                  "title": "DOUBLE JEOPARDY"
              },
              {
                  "author": "Karin Slaughter",
                  "publisher": "Morrow",
                  "title": "PIECES OF HER"
              }
          ]
      },
      {
          "list_name": "Middle Grade Paperback Monthly",
          "display_name": "Middle Grade Paperback",
          "books": [
              {
                  "author": "Katherine Applegate.",
                  "publisher": "HarperCollins",
                  "title": "THE ONE AND ONLY IVAN"
              },
              {
                  "author": "Barbara O'Connor",
                  "publisher": "Square Fish",
                  "title": "WISH"
              },
              {
                  "author": "Gordon Korman",
                  "publisher": "Scholastic",
                  "title": "RESTART"
              },
              {
                  "author": "Linda Sue Park",
                  "publisher": "Clarion",
                  "title": "A LONG WALK TO WATER"
              },
              {
                  "author": "Sharon M. Draper",
                  "publisher": "Atheneum",
                  "title": "OUT OF MY MIND"
              },
              {
                  "author": "Katherine Applegate",
                  "publisher": "Square Fish",
                  "title": "CRENSHAW"
              },
              {
                  "author": "Peter Brown",
                  "publisher": "Little, Brown",
                  "title": "THE WILD ROBOT"
              },
              {
                  "author": "Rosanne Parry.",
                  "publisher": "Greenwillow",
                  "title": "A WOLF CALLED WANDER"
              },
              {
                  "author": "Lynda Mullaly Hunt",
                  "publisher": "Puffin",
                  "title": "FISH IN A TREE"
              },
              {
                  "author": "Amanda Foody",
                  "publisher": "Margaret K. McElderry",
                  "title": "THE ACCIDENTAL APPRENTICE"
              }
          ]
      },
      {
          "list_name": "Young Adult Paperback Monthly",
          "display_name": "Young Adult Paperback",
          "books": [
              {
                  "author": "Adam Silvera",
                  "publisher": "Quill Tree",
                  "title": "THEY BOTH DIE AT THE END"
              },
              {
                  "author": "Kathleen Glasgow",
                  "publisher": "Ember",
                  "title": "GIRL IN PIECES"
              },
              {
                  "author": "Natasha Preston",
                  "publisher": "Delacorte",
                  "title": "THE FEAR"
              },
              {
                  "author": "E. Lockhart",
                  "publisher": "Ember",
                  "title": "WE WERE LIARS"
              },
              {
                  "author": "Krystal Sutherland",
                  "publisher": "Putnam",
                  "title": "HOUSE OF HOLLOW"
              },
              {
                  "author": "Jennifer Lynn Barnes",
                  "publisher": "Little, Brown",
                  "title": "THE INHERITANCE GAMES"
              },
              {
                  "author": "Markus Zusak",
                  "publisher": "Knopf",
                  "title": "THE BOOK THIEF"
              },
              {
                  "author": "Tracy Deonn",
                  "publisher": "Margaret K. McElderry",
                  "title": "LEGENDBORN"
              },
              {
                  "author": "Leigh Bardugo",
                  "publisher": "Square Fish",
                  "title": "SIX OF CROWS"
              },
              {
                  "author": "Jason Reynolds",
                  "publisher": "Atheneum/Caitlyn Dlouhy",
                  "title": "LONG WAY DOWN"
              }
          ]
      }
  ]
}