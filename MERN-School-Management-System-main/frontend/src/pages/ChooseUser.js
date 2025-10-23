import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const guestCredentials = {
      Admin: { email: 'yogendra@12', password },
      Student: { rollNum: '1', studentName: 'Dipesh Awasthi', password },
      Teacher: { email: 'tony@12', password },
  };

const navigateHandler = async (role) => {
    if (visitor === 'guest') {
    setLoader(true);
    try {
      await dispatch(loginUser(guestCredentials[role], role)).unwrap();
      navigate(`/${role}/dashboard`); // Navigate after login success
    } catch {
      setLoader(false);
      setMessage('Network Error');
      setShowPopup(true);
    }
  } else {
    navigate(`/${role}login`);
  }
};

  useEffect(() => {
    if (status === 'error') {
      setLoader(false);
      setMessage('Network Error');
      setShowPopup(true);
    }
  }, [status]);

  return (
    <StyledContainer>
      {/* <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <StyledTypography>
                  Admin
                </StyledTypography>
                Login as an administrator to access the dashboard to manage app data.
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Student")}>
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <StyledTypography>
                  Student
                </StyledTypography>
                Login as a student to explore course materials and assignments.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Teacher")}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>
                  Teacher
                </StyledTypography>
                Login as a teacher to create courses, assignments, and track student progress.
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container> */}
      
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {[
            { role: 'Admin', icon: <AccountCircle fontSize="large" />, text: 'Login as an administrator to access the dashboard to manage app data.' },
            { role: 'Student', icon: <School fontSize="large" />, text: 'Login as a student to explore course materials and assignments.' },
            { role: 'Teacher', icon: <Group fontSize="large" />, text: 'Login as a teacher to create courses, assignments, and track student progress.' }
          ].map(({ role, icon, text }) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <StyledPaper elevation={3} onClick={() => navigateHandler(role)}>
                <Box mb={2}>{icon}</Box>
                <StyledTypography>{role}</StyledTypography>
                {text}
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color:rgba(255, 255, 255, 0.6);
  cursor:pointer;

  &:hover {
    background-color: #2c2c6c;
    color:white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;