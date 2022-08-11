import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import BlockchainService from '../../services/Blockchain.service';
import EndpointService from '../../services/Endpoint.service';
import { DescriptionInput } from './DescriptionInput';
import { getDefaultKudoWithWalletAddress, fileTypes } from './formConstants';
import { InputField } from './InputField';
import { SubmitButton } from './SubmitButton';

export function Form(props: { title: string }): JSX.Element {
  const [dto, setDto] = useState(getDefaultKudoWithWalletAddress(''));
  const [file, setFile] = useState(null as unknown as Blob);
  const { account } = useEthers();
  const handleFileChange = (file: Blob) => setFile(file);

  useEffect(() => {
    if (account) {
      setDto((prevValue) => ({ ...prevValue, walletAddress: account }));
    }
  }, [account]);

  const handleChange = (e: any) => {
    const target: any = e.target!;
    const value = target.value;
    const name = target.name;
    setDto({
      ...dto,
      [name]: value,
    });
  };

  const submitCallback = () => {
    EndpointService.postImage(file, account || '').then((url: string) => {
      console.log('successful file upload: ', url);
      dto.imageUrl = url;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer: ethers.Signer = provider.getSigner();
      BlockchainService.deployNft(dto, signer).then((response: any) => {
        console.log('successful deployment: ', response);
        dto.tokenId = response.hash;
        EndpointService.saveKudo(dto).then((response: string) => {
          console.log('successful saving of the kudo as an NFT,', response);
        });
      });
    });
  };

  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">{props.title}</h6>
        <form>
          <InputField
            placeholder="from"
            title="From (your address will appear when you connect your wallet)"
            value={account}
            onChange={handleChange}
            disabled
          />
          <InputField placeholder="to" value={dto.to} onChange={handleChange} />
          <InputField placeholder="name" value={dto.name} onChange={handleChange} />
          <DescriptionInput callback={handleChange} />
          <FileUploader
            className="
      form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            handleChange={handleFileChange}
            hoverTitle="drop your image here"
            name="file"
            types={fileTypes}
          />
          <small id="help" className="block mt-1 text-xs text-gray-600">
            for now it'll live on the Ropsten network
          </small>
          {!account && <p>First connect with your wallet!</p>}
          <SubmitButton disabled={!account || !file} callback={submitCallback} />
        </form>
      </div>
    </>
  );
}
