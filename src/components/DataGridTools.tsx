import { Box } from '@mui/material'
import { GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import React from 'react'

type Props = {}

export default function DataGridTools({}: Props) {
  return (
    <Box display={'flex'} gap={4} margin={1}>
        <GridToolbarQuickFilter/>
        <Box marginLeft={ 'auto' } >
            <GridToolbarExport/>
            <GridToolbarFilterButton sx={{ marginLeft : '10px'}}/>
        </Box>
    </Box>
  )
}