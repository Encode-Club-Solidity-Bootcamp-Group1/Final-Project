import React from 'react';
import { Box } from '@mui/system';
import ConnectWallet from '../../components/connect-wallet';
import { Form } from '../../components/mint-form/Form';
import MainPage from '../main-page';
import { ListsPanel } from './ListsPanel';
export default function HomePage() {
  return (
    <MainPage>
      <div className="grid place-items-center h-screen relative">
        <nav >
          <ConnectWallet />
        </nav >
        <Box sx={{ flexDirection: 'row' }}>
          <Form title='Mint NFT' />
          <ListsPanel />
        </Box>
      </div>
    </MainPage>
  );
}

