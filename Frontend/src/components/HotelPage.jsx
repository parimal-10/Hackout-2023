import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BASE_URL } from "./config";
import axios from "axios";

export default function HotelPage() {

  const [seats, setseats] = React.useState(0);
  const [vacate, setvacate] = React.useState(0);
  return (
    <div style={{marginTop: '16px', marginBottom: '16px', display: "flex", direction: "column", alignItems: "center", justifyContent: 'center'}}>
    <Card sx={{ width: '80%'}}>
      <CardActionArea style={{':hover':'none', pointerEvents: 'none', cursor: 'none'}}>
        <CardMedia
          component="img"
          height="350vh"
          image="https://www.timeoutdubai.com/cloud/timeoutdubai/2023/06/06/Sushisamba.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hotel 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined">Edit</Button>
      </CardActions>
      <div style={{marginTop: '16px', marginBottom: '16px', display: "flex", direction: "column", alignItems: "center", justifyContent: 'center', gap: '20px'}}>
      <TextField id="filled-basic" label="no of tables" variant="filled" 
        InputProps={{
          inputProps: {
            type: 'number',
            step: 1, // step by 1
            min: 1,   // minimum value
          }
        }}
        onChange={(e) => setseats(e.target.value)}/>
        <Button variant="outlined"
        onClick={async () => {
          const response = await axios.put(
            `${BASE_URL}/api/update/book`,
            {
              seats: seats,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (response.data.message) {
            alert(response.data.message);
          } else {
            alert(response.data.err);
          }
        }}
        >BOOK</Button>
        <TextField
            id="filled-basic"
            label="no of seats to vacate?"
            type="number"
            variant="filled"
            onChange={(e) => setvacate(e.target.value)}
          />
        <Button
            variant="outlined"
            onClick={async () => {
              const response = await axios.put(
                `${BASE_URL}/api/update/vacate`,
                {
                  vacate: vacate,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              if (response.data.message) {
                alert(response.data.message);
              } else {
                alert(response.data.err);
              }
            }}
          >
            Vacate
          </Button>
      </div>
    </Card>
    </div>
  );
}
