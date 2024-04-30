import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  export default function Categories() {
    return (
      <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="500"
                                image="https://m.media-amazon.com/images/I/51tLPDOa1RL._SY445_SX342_.jpg"
                                alt="To Kill a Mockingbird"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Books
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Browse hundreds of comics and graphics novels spanning dozens of titles and numerous publishers
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="500"
                                image="https://www.classicmomentsusa.com/wp-content/uploads/2020/02/dc-SupermanCar-11x14-framed.jpg"
                                alt="Action Comics #1"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Comics
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Browse hundreds of comics and graphics novels spanning dozens of titles and numerous publishers
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                    <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="500"
                                image="https://i.natgeofe.com/n/60c573d7-8b45-4f4d-be8d-26e5baef327c/national-geographic-magazine-january-2024-monarchs.jpg"
                                alt="National Geographic"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Magazines
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Browse hundreds of comics and graphics novels spanning dozens of titles and numerous publishers
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
  }