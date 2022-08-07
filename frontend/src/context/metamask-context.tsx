/* eslint-disable no-undef */
import React from 'react';
import { useContext, createContext, useReducer, useEffect } from 'react';

type ContextProps = {
  hasMetamaskInstalled: boolean;
  chainId: string;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const MetamaskContext = createContext<Partial<ContextProps>>({});

const START_PROCESS = 'start_process';

interface IMetamaskProviderState {}

const initialState: IMetamaskProviderState = {};

const metamaskProviderReducer = (state: IMetamaskProviderState, action: any) => {
  switch (action.type) {
    case START_PROCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export function MetamaskProvider(props: ProviderProps) {
  const { children } = props;
  const [state, dispatch] = useReducer(metamaskProviderReducer, initialState);

  // TODO: https://stackoverflow.com/questions/68252365/how-to-trigger-change-blockchain-network-request-on-metamask
  // above part is to trigger change blockchain network request on metamask

  useEffect(() => {
    if (window.ethereum) {
      // get chain id, and update state
    } else {
      // no metamask installed update state accordingly
    }
  }, []);

  return <MetamaskContext.Provider value={{}}>{children}</MetamaskContext.Provider>;
}

export const useMetamask = () => {
  const {} = useContext(MetamaskContext);
  return {};
};
