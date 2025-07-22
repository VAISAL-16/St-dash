import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import {
  FaGraduationCap,
  FaMoneyBill,
  FaUserGraduate,
  FaBookOpen,
  FaCalendarAlt,
  FaSignOutAlt,
  FaClipboardList,
  FaChartBar,
  FaUsers,
  FaBell,
  FaTasks,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaDownload,
  FaEye,
} from 'react-icons/fa';
import Topbar from '../components/Topbar';
import { TrendingUpIcon } from 'lucide-react';

export default function StudentList() {
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

  const sidebarItems = [
    { icon: <FaMoneyBill />, label: 'Payment Info', color: '#4CAF50' },
    { icon: <FaUserGraduate />, label: 'Registration', color: '#2196F3' },
    { icon: <FaBookOpen />, label: 'Courses', color: '#FF9800' },
    { icon: <FaCalendarAlt />, label: 'Schedule', color: '#9C27B0' },
  ];

  const dashboardCards = [
    {
      title: 'Attendance Manager',
      description: 'Mark & view daily attendance records',
      action: 'Go to Attendance',
      route: '/attendance',
      icon: <FaClipboardList />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stats: '24 Students',
    },
    {
      title: 'Monthly Summary',
      description: 'Comprehensive attendance overview',
      action: 'View Summary',
      route: '/attendance-summary',
      icon: <FaChartBar />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      stats: '95% Average',
    },
    {
      title: 'Student Management',
      description: 'Add, edit, and manage student records',
      action: 'Manage Students',
      route: '/students-components',
      icon: <FaUsers />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      stats: '156 Total',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'attendance',
      title: 'Attendance marked for Computer Science',
      time: '2 hours ago',
      icon: <FaCheckCircle />,
      color: '#4CAF50',
    },
    {
      id: 2,
      type: 'student',
      title: 'New student registered: John Doe',
      time: '5 hours ago',
      icon: <FaUserGraduate />,
      color: '#2196F3',
    },
    {
      id: 3,
      type: 'report',
      title: 'Monthly report generated',
      time: '1 day ago',
      icon: <FaDownload />,
      color: '#FF9800',
    },
    {
      id: 4,
      type: 'alert',
      title: 'Low attendance alert for Mathematics',
      time: '2 days ago',
      icon: <FaExclamationTriangle />,
      color: '#f44336',
    },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Generate weekly attendance report', deadline: 'Today', priority: 'high' },
    { id: 2, task: 'Update student contact information', deadline: 'Tomorrow', priority: 'medium' },
    { id: 3, task: 'Review pending fee payments', deadline: 'Friday', priority: 'high' },
    { id: 4, task: 'Schedule parent-teacher meetings', deadline: 'Next week', priority: 'low' },
  ];

  const courseProgress = [
    { name: 'Computer Science', progress: 85, students: 45, color: '#2196F3' },
    { name: 'Mathematics', progress: 72, students: 38, color: '#4CAF50' },
    { name: 'Physics', progress: 90, students: 32, color: '#FF9800' },
    { name: 'Chemistry', progress: 68, students: 29, color: '#9C27B0' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'grey.100',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'grey.50',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <Topbar />

        <Container sx={{ py: 3, flexGrow: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={4}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 3,
                p: 3,
                mb: 3,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Grid container alignItems="center" spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2,}}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        width: 40,
                        height: 40,
                        fontSize: '1rem',
                        fontWeight: '600',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {initials}
                    </Avatar>
                    <Box>
                      <Chip
                        label={new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontSize: '0.7rem',
                          height: 20,
                          fontFamily: 'Poppins, sans-serif',
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    gutterBottom
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Welcome back, {adminName.split(' ')[0]}!
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.85rem'
                    }}
                  >
                    Stay updated with your student management dashboard
                  </Typography>
                </Grid>
                {!isMobile && (
                  <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 180, opacity: 0.3 }} />
                  </Grid>
                )}
              </Grid>
            </Paper>
          </motion.div>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {dashboardCards.map((card, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    elevation={8}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      background: card.gradient,
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s ease-in-out',
                      },
                    }}
                    onClick={() => navigate(card.route)}
                  >
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {React.cloneElement(card.icon, { size: 20 })}
                        </Box>
                        <Chip
                          label={card.stats}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '0.7rem',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        fontWeight="600"
                        gutterBottom
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {card.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.9,
                          mb: 2.5,
                          flexGrow: 1,
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '0.8rem'
                        }}
                      >
                        {card.description}
                      </Typography>

                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: '500',
                          py: 1,
                          borderRadius: 2,
                          fontSize: '0.8rem',
                          fontFamily: 'Poppins, sans-serif',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.3)',
                          },
                        }}
                        fullWidth
                      >
                        {card.action}
                      </Button>
                    </CardContent>

                    <Box
                      sx={{
                        position: 'absolute',
                        top: -40,
                        right: -40,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -25,
                        left: -25,
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.05)',
                      }}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #f8f9ff 0%, #e8ecf7 100%)',
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    gutterBottom
                    color="text.primary"
                    sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}
                  >
                    Quick Overview
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <Typography
                          variant="h4"
                          fontWeight="700"
                          color="primary"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem' }}
                        >
                          156
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem' }}
                        >
                          Total Students
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <Typography
                          variant="h4"
                          fontWeight="700"
                          color="success.main"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem' }}
                        >
                          95%
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem' }}
                        >
                          Avg Attendance
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <Typography
                          variant="h4"
                          fontWeight="700"
                          color="warning.main"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem' }}
                        >
                          12
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem' }}
                        >
                          Active Courses
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <Typography
                          variant="h4"
                          fontWeight="700"
                          color="error.main"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem' }}
                        >
                          3
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem' }}
                        >
                          Pending Tasks
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    gutterBottom
                    color="text.primary"
                    sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}
                  >
                    Course Progress
                  </Typography>
                  {courseProgress.map((course, index) => (
                    <Box key={index} sx={{ mb: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography
                          variant="body1"
                          fontWeight="500"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}
                        >
                          {course.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem' }}
                        >
                          {course.students} students • {course.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: course.color,
                            borderRadius: 4,
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    gutterBottom
                    color="text.primary"
                    sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}
                  >
                    Recent Activities
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {recentActivities.map((activity, index) => (
                      <ListItem
                        key={activity.id}
                        sx={{
                          px: 0,
                          py: 1.5,
                          borderBottom: index < recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box
                            sx={{
                              bgcolor: activity.color + '20',
                              color: activity.color,
                              borderRadius: '50%',
                              p: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                            }}
                          >
                            {React.cloneElement(activity.icon, { size: 14 })}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              fontWeight="500"
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                mb: 0.5
                              }}
                            >
                              {activity.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem' }}
                            >
                              {activity.time}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    gutterBottom
                    color="text.primary"
                    sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}
                  >
                    Upcoming Tasks
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {upcomingTasks.map((task, index) => (
                      <ListItem
                        key={task.id}
                        sx={{
                          px: 0,
                          py: 1.5,
                          borderBottom: index < upcomingTasks.length - 1 ? '1px solid #f0f0f0' : 'none'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: getPriorityColor(task.priority),
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              fontWeight="500"
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '0.8rem',
                                mb: 0.5
                              }}
                            >
                              {task.task}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem' }}
                            >
                              Due: {task.deadline}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}