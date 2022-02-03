import { useState } from 'react';
import Button from '@mui/material/Button';
import colors from '../../constants/colors';
import Standings from './Standings';
import Stack from '@mui/material/Stack';
import Rounds from './Rounds';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function Stats() {
  const pages = ['standings', 'rounds'];
  const [actualPage, setActualPage] = useState(0);
  const handleChange = (event, newValue) => {
    setActualPage(newValue);
  };
  return (
    <>
      <Box
        sx={{
          width: '100%',
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: colors.secondaryGreen
        }}
      >
        <Tabs
          value={actualPage}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          {pages.map((page, index) => (
            <Tab
              label={page}
              sx={{
                color: colors.beige,
                minWidth: '200px'
              }}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <Stack
        justifyContent="center"
        alignItems="center"
        mt={3}
        sx={{ width: '100vw' }}
      >
        {actualPage === 0 && <Standings />}
        {actualPage === 1 && <Rounds />}
      </Stack>
    </>
  );
}

export default Stats;
