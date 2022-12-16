import { Link as RouterLink } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, CardActionArea, Typography } from '@mui/material';
// components
import Iconify from '../iconify/Iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

SearchCardButton.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function SearchCardButton({ title, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 0,
        boxShadow: 5,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <CardActionArea sx={{ py: 3 }} component={RouterLink} to="/dashboard">
        <StyledIcon
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                theme.palette[color].dark,
                0.24
              )} 100%)`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </StyledIcon>

        <Typography variant="h5" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
