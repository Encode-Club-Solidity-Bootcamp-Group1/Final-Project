import React, { useState } from "react";
import { Box } from '@mui/system';
import ConnectWallet from "../../components/connect-wallet";
import { Form } from "../../components/mint-form/Form";
import MainPage from "../main-page";
import { ListsPanel } from "./ListsPanel";
import "./styles/home-page.css";

export default function HomePage() {
  const [walletAdd, setWalletAdd] = useState("");

  return (
    <MainPage>
      <div className="grid place-items-center h-screen relative">
        <nav >
          <ConnectWallet setWalletAdd={setWalletAdd}/>
        </nav >
        <Box sx={{ flexDirection: 'row' }}>
          <Form title='Mint NFT' walletAdd={walletAdd}/>
          <ListsPanel />
        </Box>
      </div>
    </MainPage>
  );
}

