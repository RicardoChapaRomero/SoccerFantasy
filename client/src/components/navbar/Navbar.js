import * as React from 'react';
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
import Logo from '../Logo';
import colors from '../../colors';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const ResponsiveAppBar = (props) => {
  const { pages, onAuthChange } = props;
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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

  const handleLogoutEvent = (googleLogoutCallback) => {
    handleCloseUserMenu();
    googleLogoutCallback();
  };

  const LogoC = (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Logo size="50px" color={colors.beige}></Logo>
    </Link>
  );

  return (
    <AppBar
      sx={{ padding: '0 15px' }}
      color="success"
      position="static"
    >
      <Toolbar disableGutters>
        <Box
          noWrap
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' }
          }}
        >
          {LogoC}
        </Box>
        <Box
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
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
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link
                  to={'/' + page}
                  style={{
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: 'black'
                  }}
                >
                  {page}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          noWrap
          sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' }
          }}
        >
          {LogoC}
        </Box>
        <Box
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          {pages.map((page) => (
            <Link to={'/' + page} style={{ textDecoration: 'none' }}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: colors.beige,
                  display: 'block'
                }}
              >
                {page}
              </Button>
            </Link>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/2.jpg"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => {
              if (setting === 'Logout') {
                return (
                  <GoogleLogout
                    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
                    onLogoutSuccess={() => onAuthChange(false)}
                    render={(renderProps) => (
                      <MenuItem
                        key={setting}
                        onClick={() =>
                          handleLogoutEvent(renderProps.onClick)
                        }
                        disabled={renderProps.disabled}
                      >
                        <Typography textAlign="center">
                          {setting}
                        </Typography>
                      </MenuItem>
                    )}
                  ></GoogleLogout>
                );
              }
              return (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
ResponsiveAppBar.propTypes = {
  pages: PropTypes.array,
  onAuthChange: PropTypes.func
};
ResponsiveAppBar.defaultProps = {
  pages: []
};
export default ResponsiveAppBar;
