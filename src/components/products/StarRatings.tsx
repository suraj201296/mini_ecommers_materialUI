import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';

type Props = {
    ratings : number
}

export default function StarRatings({ratings}: Props) {

    const stars = [];

    for (let i = 0; i < ratings ; i++) {
        stars.push(<StarIcon sx={{ color : 'gold'}} key={i}/>);
    }
  return (
    <div>
        { stars }
    </div>
  )
}