
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
  FaChartBar,
  FaGraduationCap,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const adminName = localStorage.getItem('adminName') || 'Admin';

  const getInitials = (name) =>
    name
      .split(' ')
      .map((w) => w[0]?.toUpperCase())
      .join('');

  const initials = getInitials(adminName);

  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <FaHome />, 
      color: '#4CAF50' 
    },
    { 
      path: '/students', 
      label: 'Students', 
      icon: <FaUserGraduate />, 
      color: '#2196F3' 
    },
    { 
      path: '/attendance', 
      label: 'Attendance', 
      icon: <FaClipboardList />, 
      color: '#FF9800' 
    },
    { 
      path: '/attendance-analytics', 
      label: 'Analytics', 
      icon: <FaChartBar />, 
      color: '#9C27B0' 
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin-login');
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: isMobile ? 70 : 280,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1200,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '4px',
        },
      }}
    >
      <Box sx={{ p: isMobile ? 1 : 3, textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <FaGraduationCap size={isMobile ? 28 : 36} />
            {!isMobile && (
              <Typography variant="h5" fontWeight="bold">
                Dashboard
              </Typography>
            )}
          </Box>
        </motion.div>
        
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  width: 40,
                  height: 40,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ textAlign: 'left', overflow: 'hidden' }}>
                <Typography variant="body2" fontWeight="bold" noWrap>
                  {adminName.split(' ')[0]}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }} noWrap>
                  Administrator
                </Typography>
              </Box>
            </Box>
          </motion.div>
        )}
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: isMobile ? 1 : 3 }} />

      <Box sx={{ flexGrow: 1, px: isMobile ? 1 : 2, py: 2 }}>
        <List sx={{ padding: 0 }}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      py: 1.5,
                      backgroundColor: isActive
                        ? 'rgba(255,255,255,0.2)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateX(4px)',
                      },
                      '&::before': isActive
                        ? {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '4px',
                            height: '60%',
                            backgroundColor: 'white',
                            borderRadius: '0 2px 2px 0',
                          }
                        : {},
                      transition: 'all 0.3s ease',
                      justifyContent: isMobile ? 'center' : 'flex-start',
                    }}
                  >
                    <Tooltip title={isMobile ? item.label : ''} placement="right">
                      <ListItemIcon
                        sx={{
                          color: 'white',
                          minWidth: isMobile ? 'auto' : 40,
                          justifyContent: 'center',
                        }}
                      >
                        {React.cloneElement(item.icon, {
                          size: 20,
                          style: { filter: isActive ? 'brightness(1.2)' : 'none' },
                        })}
                      </ListItemIcon>
                    </Tooltip>
                    {!isMobile && (
                      <ListItemText
                        primary={item.label}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '0.95rem',
                            fontWeight: isActive ? 600 : 400,
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: isMobile ? 1 : 3 }} />

      <Box sx={{ p: isMobile ? 1 : 2 }}>
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s ease',
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            <Tooltip title={isMobile ? 'Logout' : ''} placement="right">
              <ListItemIcon
                sx={{
                  color: 'white',
                  minWidth: isMobile ? 'auto' : 40,
                  justifyContent: 'center',
                }}
              >
                <FaSignOutAlt size={20} />
              </ListItemIcon>
            </Tooltip>
            {!isMobile && (
              <ListItemText
                primary="Logout"
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.95rem',
                    fontWeight: 500,
                  },
                }}
              />
            )}
          </ListItemButton>
        </motion.div>
      </Box>

      {!isMobile && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            v2.1.0 • Student Management
          </Typography>
        </Box>
      )}
    </Paper>
  );
}