import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Rating } from '@mui/material';
import { baseUrl } from 'utils/baseUrl';
import React from 'react';
import Divider from "@mui/material/Divider";

export default function Comments({ productID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    
    const fetchComments = async () => {
      try {
        const response = await fetch(baseUrl + `/getprodreviews?productid=${productID}`);
        if (response.ok) {
          const data = await response.json();
          console.log("commentss ", data[0].Comment);
          setComments(data);
        } else {
          console.error(`Failed to fetch comments for product ID ${productID}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to fetch comments for productID ${productID}: ${error}`);
      }
    };
    fetchComments();
  }, [productID]);

  return (

    <Grid container spacing={2}>
      <Grid item xs={12}
        sx={{
          fontSize: "1.2rem",
          // fontWeight: "bold",
          marginBottom: "0.7rem",
          mt: "4rem",
        }}
      >
        <b>User Reviews and Ratings:</b>
        </Grid>
      {comments.length > 0 ? (
        comments.map(comment => (
          <React.Fragment key={comment.UserID}>
            <Grid item xs={6}>
            <Box>
            <Typography sx={{ color: 'text.secondary', fontSize: '15px', textDecoration: 'underline', textTransform: 'uppercase'}}>{comment.FName + " " + comment.LName}</Typography>
              <Typography variant="h6" color="#2B7F8C" style={{ fontSize: '20px' }}><b>{comment.Comment}</b></Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Rating name={`rating-${comment.Rating}`} value={comment.Rating} readOnly />
              </Box>
            </Grid>
            <Grid item xs={12}>
                <Divider />
              </Grid>
          </React.Fragment>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>No reviews yet.</Typography>
        </Grid>
      )}
    </Grid>
  );
}