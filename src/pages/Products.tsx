import { Box } from '@mui/material'
import React from 'react'
import WebsocketEvent from '../components/WebsocketEvent'

type Props = {}

export default function Products({}: Props) {
  return (
    <Box>
      <WebsocketEvent/>
    </Box>
  )
}