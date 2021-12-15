/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; 2021 Getir Case</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">C.A.</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
