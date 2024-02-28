import { Box, Card } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom'

type Props = {}

export default function BuyProduct({}: Props) {
    const location = useLocation();
    const productDetails = location.state.product;

    return (
        <Box>
            <Card>
                
            </Card>
        </Box>
    )
}