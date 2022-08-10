import React from "react";
import ConnectWallet from "../../components/connect-wallet";
import { Form } from "../../components/mint-form/Form";
import MainPage from "../main-page";
import { ListsPanel } from "./ListsPanel";
import "./styles/home-page.css";

export default function HomePage() {
  return (
    <MainPage>
      <div className="grid place-items-center h-screen relative">
        <div>
          <div className="absolute top-[10%] right-[5%]">
            <ConnectWallet />
          </div>
          <div className="absolute top-[15%] left-[5%] flex">
            <div className="marginForm">
              <Form title="Mint NFT" />
            </div>
            <ListsPanel />
          </div>
        </div>
      </div>
    </MainPage>
  );
}
