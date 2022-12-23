import react from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function AffixBtn() {
  return (
    <Box className='fixed bottom-6 right-6'>
      <IconButton size='lg' className='rounded-full' icon={<AddIcon />} />
    </Box>
  );
} 