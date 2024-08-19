import React from 'react'
import './purchase.css'
import { useAppContext } from '../appContext';

export default function Purchase() {
  const { sidebarHidden } = useAppContext();
  return (
    <div className='purchase-main mainDiv'>
<div className={sidebarHidden ? 'container containerFullSize' : ' container'}>      <h1>Purchase</h1>
      </div>
    </div>
  )
}

