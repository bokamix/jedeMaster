import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import JedeLogo from '../logoJede.png'
import styled from "styled-components";

const LogoItem = styled.img`
width:50px;
margin-right:30px;
`



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://jede.pl/">
        JedeSteam
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
    {id: 1, name:"Wyjście z przegrywu", more:"Podstawowe codzienne nawyki, dla Twojego zdrowia fizycznego i psychicznego"},
    {id: 2, name:"Traning siłowy", more:"Ustal cele treningowe"},
    {id: 3, name:"Chce być milszy dla ludzi", more:"Codzienne działania, które pozwolą Ci być milszym dla ludzi"},
];


export default function NewUserPage({setHandle}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LogoItem src={JedeLogo} />
          <Typography variant="h6" color="inherit" noWrap>
            JedeSteam 
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              Postaw sobie wyzwanie, wytrenuj dobre nawyki.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Sprawdzona metoda na rozwijanie nawyków i dotrzymywanie postanowień. Skorzystaj z systemu zaprojektowanego
              dla Twojego osobistego sukcesu. Polecany przez najlepszych specjalistów.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button onClick={setHandle} variant="contained" color="primary">
                    Wypróbuj teraz
                  </Button>
                </Grid>
                <Grid item>
                  <Button disabled variant="outlined" color="primary">
                    Czytaj więcej
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          
            
            {cards.map(card => (          
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {card.name}
                    </Typography>
                    <Typography>
                     {card.more}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button  disabled size="small" color="primary">
                      Wybierz
                    </Button>
                    <Button  disabled size="small" color="primary">
                      Czytaj więcej
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
         Powered by Jede.pl
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Wejdź na wyższy poziom
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}