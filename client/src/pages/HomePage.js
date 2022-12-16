import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Grid } from '@mui/material';
import SearchCardButton from '../components/search-card-button/SearchCardButton';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '20vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
}));

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home page | Cleany </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            The right people. In one place.
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            All the people you need are in one place. Choose what you are looking for and you will find many options.
          </Typography>
        </StyledContent>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <SearchCardButton title="Worker" icon={'ant-design:search-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SearchCardButton title="Work" icon={'ant-design:search-outlined'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
