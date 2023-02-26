import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from "../../styles/services.module.css";

import { Container } from '@mui/system'; 

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `<Grid container spacing={${spacing}}>`;
  const bull = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}} variant="outlined"></Box>);
  const card = (<CardContent><Card style={{width:"90%", height:"60%"}}></Card></CardContent>);

  return (
    <div className={styles.container}>
      <h2 style={{textAlign: "center"}}>Services</h2><br></br>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={15}>
          <Grid container justifyContent="center" spacing={spacing}>
            {[0, 1, 2, 3].map((value) => (
              <Grid key={value} item>
                <Box style={{ minWidth: 115, height: 150 }}>
                    <Card variant="outlined"  style={{minWidth: 115,  height: 200}} >{card}</Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
  
}