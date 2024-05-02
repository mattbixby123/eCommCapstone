import React from "react";
import Toolbar from './Toolbar';
import { Box, useTheme } from '@mui/material';

function GlobalLayout({ children }) {
  const theme = useTheme();

return (
    <div>
      
      <Box
        component="main"
        sx={{
          pt: `${theme.mixins.toolbar.minHeight}px`,
          [theme.breakpoints.up('sm')]: {
            pt: `${theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight}px`,
          }
        }}
      >
        {children}
      </Box>
    </div>
  );
}

export default GlobalLayout;