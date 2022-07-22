import * as React from 'react';

import { useStateContext } from '../../context/ContextProvider';
import { getCookie } from 'cookies-next';
import ImageUserBroken from '../../public/images/user_broken.png';
import Dashboard from './Dashboard';
import Products from './Products';
import EditProduct from './EditProduct';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;
const pages = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    section: 'dashboard',
  }, 
  {
    title: 'Products',
    icon: <CategoryIcon />,
    section: 'products',
  },
  {
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    section: 'orders',
  },
  {
    title: 'Customers',
    icon: <AccountBoxIcon />,
    section: 'customers',
  }
];
const extraPages = [
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    section: 'settings',
  }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, 
  {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ data }) {
  const { user, logout, login } = useStateContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [productToEdit, setProductToEdit] = React.useState(null);


  const [section, setSection] = React.useState('dashboard');
  const [userAccess, setUserAccess] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const changeURL = (id) => {
    setSection(id);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  React.useEffect(() => {
    const cookie = getCookie("AdmUsAccs");
    if (cookie){
      setUserAccess(true);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <div className='flex items-center justify-center'>
              <AdminPanelSettingsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Mars Store
              </Typography>
            </div>
            <AdminPanelSettingsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Mars Store
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/images/user_broken.png" />
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
                {
                  user 
                  ?
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{user.displayName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={()=>{logout();}}>Log Out</Typography>
                    </MenuItem>
                  </div>
                  // <Typography textAlign="center">{user.name}</Typography>
                  :
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>{login();}}>Log In</Typography>
                  </MenuItem>
                }
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((item, index) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton onClick={()=>{changeURL(item.section)}}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {extraPages.map((item, index) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton onClick={()=>{changeURL(item.section)}}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
        {
          userAccess
          ?
          <div className='pt-[64px]'>
            {
              (section === 'dashboard')
              ?
              <Dashboard />
              : (section === 'products')
              ?
              <Products data={data} changeURL={changeURL} setProductToEdit={setProductToEdit} />
              : (section === 'orders')
              ?
              <div>Is the orders</div>
              : (section === 'customers')
              ?
              <div>Is the customers</div>
              :
              (section === 'settings')
              ?
              <div>Is the settings</div>
              : (section === 'edit')
              ?
              <EditProduct productToEdit={productToEdit} />
              :
              <div>Is other page</div>
            }
          </div>
          :
          <div>You do not have permission to see this page</div>
        }
      </Main>
    </Box>
  );
}
