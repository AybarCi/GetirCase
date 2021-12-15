import React from 'react'
import {
  CHeader,
  CSubheader,
} from '@coreui/react'
import BasketBadge from '../components/BasketBadge'
import Typography from '@mui/material/Typography';

const TheHeader = () => {
  return (
    <CHeader withSubheader className="c-header-sticky">
      <CSubheader className="px-3 py-3 justify-content-between">
        <Typography variant="h3" component="h2">
          Market
        </Typography>
        <BasketBadge/>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
