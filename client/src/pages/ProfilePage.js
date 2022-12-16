import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
// @mui
import { Container } from '@mui/material';
// sections
import { Profile } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth); // name

  return (
    <>
      <Helmet>
        <title>Profile | Cleany</title>
      </Helmet>

      <Container>
        <Profile isEdit currentUser={user} />
      </Container>
    </>
  );
}
