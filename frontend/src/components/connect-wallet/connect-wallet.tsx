import { Ropsten, useEthers } from '@usedapp/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcSigner } from '@ethersproject/providers';
import React from 'react';
import { AccountChangeContext } from '../wrappers/IdentityWrapper';

export default function ConnectWallet(props: {}): JSX.Element {
  const [switchPending, setSwitchPending] = useState(false);
  const [handledSignRequest, setHandledSignRequest] = useState<'not-checked' | 'pending' | 'checked'>('not-checked');
  const { account, deactivate, activateBrowserWallet, chainId, active, switchNetwork } = useEthers();

  const context = useContext(AccountChangeContext);
  const checkSignRequest = useCallback(async () => {
    if (handledSignRequest === 'checked' || handledSignRequest === 'pending') return;
    setHandledSignRequest('pending');
    const result = await signMessage();
    if (result.error) {
      deactivate();
      setHandledSignRequest('not-checked');
    } else {
      setHandledSignRequest('checked');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deactivate, handledSignRequest]);

  useEffect(() => {
    if (active && account) {
      if (chainId && chainId !== Ropsten.chainId && !switchPending) {
        setSwitchPending(true);
        switchNetwork(Ropsten.chainId)
          .then(() => {
            checkSignRequest();
          })
          .catch((error) => {
            console.log(error);
            deactivate();
          })
          .finally(() => setSwitchPending(false));
      } else checkSignRequest();
    }
  }, [chainId, active, switchNetwork, deactivate, switchPending, account, checkSignRequest]);

  const handleOnClick = useCallback(() => {
    if (!account) {
      activateBrowserWallet();
    }
  }, [account, activateBrowserWallet]);

  const signMessage = async () => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');

      await window.ethereum.send('eth_requestAccounts');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer: JsonRpcSigner = provider.getSigner();
      context.setLogin(signer);
      // todo update message displayed in metamask
      const message = 'You connected to the Kudos app! :)';
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      return {
        message,
        signature,
        address,
      };
    } catch (err) {
      return { error: err };
    }
  };

  return account ? (
    <div className="text-white">
      {account.substring(0, 6)}...{account.substring(account.length - 4, account.length)}
    </div>
  ) : (
    <button
      type="button"
      className="w-[140px] h-[40px] bg-gradient-to-r from-[#b9e5cd] to-[#b7d4f7] text-white shadow-button rounded-lg  whitespace-nowrap flex items-center justify-center hover:scale-105 transition duration-200 ease-out"
      onClick={handleOnClick}>
      Connect Wallet
    </button>
  );
}
