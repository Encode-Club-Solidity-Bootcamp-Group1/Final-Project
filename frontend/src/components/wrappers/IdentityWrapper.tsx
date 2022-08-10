import { JsonRpcSigner } from '@ethersproject/providers';
import { createContext, useMemo, useState } from "react";

export const AccountChangeContext = createContext({
  setLogin: (account: any): void => console.log('setting up the login')
})

export const AccountContext = createContext(null as unknown as JsonRpcSigner);

export function IdentityWrapper(props: { children: any }): JSX.Element {
  const [account, setAccount] = useState(null as unknown as JsonRpcSigner);
  const toggler = useMemo(() => ({
    setLogin: (account: any): void => setAccount(account)
  }), []);


  return <AccountChangeContext.Provider value={toggler}>
    <AccountContext.Provider value={account}>
      {props.children}
    </AccountContext.Provider>
  </AccountChangeContext.Provider>
}