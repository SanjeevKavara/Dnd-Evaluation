import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

export default function ActionAreaCard({ data }) {
  return (
    <Card sx={{ maxWidth: 300, minWidth: 300,margin:5,boxShadow:5 }}>
      <CardActionArea>
        <img src={data.url} alt="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* Add any title if necessary */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Add any description if necessary */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
