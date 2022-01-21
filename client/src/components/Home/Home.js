import React,{useEffect,useState} from 'react';
import {Container, Grow, Grid} from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts'
import useStyles from './styles';

const Home = () => {
  
  const classes=useStyles();
  const dispatch=useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch])


  return (
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={4}>
          <Grid item xs={12} sm={12} md={7}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
