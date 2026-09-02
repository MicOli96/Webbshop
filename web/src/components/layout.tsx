import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import Header from './header';
import Footer from './footer';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}
