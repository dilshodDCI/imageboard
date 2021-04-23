import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import {Grid, CircularProgress} from "@material-ui/core";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return !posts.length ? (<CircularProgress />) : (
    <Grid className={classes.mainContainer} container alignContent="stretch" spacing={3}>
      {posts.map((post)=>(
        <Grid key={post._id} item xs={12} md={6}>
          <Post post={post}/>
        </Grid>
        
      ))}
    </Grid>
     
    
  );
};

export default Posts;
