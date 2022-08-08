import React from 'react';
import ConnectWallet from '../../components/connect-wallet';
import { KudosList } from '../../components/kudos-list/KudosList';
import { Form } from '../../components/mint-form/Form';
import MainPage from '../main-page';
import { fakeData } from '../../components/kudos-list/fakeData';
import { Paper } from '@mui/material';
export default function HomePage() {
  return (
    <MainPage>
      <div className="grid place-items-center h-screen relative">
        <div>
          <div className="absolute top-[10%] right-[5%]">
            <ConnectWallet />
          </div>
          <Form title='Mint NFT' />
          <ListsPanel />
        </div>
      </div>
    </MainPage>
  );
}

function ListsPanel(props: {}): JSX.Element {
  return <Paper style={{ height: 800, width: 1000 }}>
    <KudosList title='Received' data={fakeData} />
    <br />
    <br />
    <KudosList title='Sent' data={fakeData} />
    <br />
  </Paper >
}