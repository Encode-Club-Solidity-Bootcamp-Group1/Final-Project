import { createContext, useContext, useMemo, useState } from "react"
import { JsonRpcSigner } from '@ethersproject/providers';

export const IdentityContext = createContext({} as IdentityController);

type IdentityController = {
  value: JsonRpcSigner;
  setter: any;
}

export function IdentityWrapper(props: { children: any }): JSX.Element {

  const context = useContext(IdentityContext);
  const [contextController, setContextController] = useState({} as IdentityController);
  setContextController({
    value: null as unknown as JsonRpcSigner,
    setter: setContextController,
  })
  return <IdentityContext.Provider value={context}>
    {props.children}
  </IdentityContext.Provider>
}


export const AccountChangeContext = createContext({
  setLogin: (account: any): void => console.log('setting up the login')
})

export const AccountContext = createContext(null as unknown as JsonRpcSigner);

export function NewWrapper(props: { children: any }): JSX.Element {
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