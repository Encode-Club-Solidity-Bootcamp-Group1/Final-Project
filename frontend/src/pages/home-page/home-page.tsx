import ConnectWallet from '../../components/connect-wallet';
import MainPage from '../main-page';

export default function HomePage() {
  return (
    <MainPage>
      <div className="grid place-items-center h-screen relative">
        <div>
          <div className="absolute top-[10%] right-[5%]">
            <ConnectWallet />
          </div>
          <div className="mt-[25px]">we need to say something about the kudos here.</div>
        </div>
      </div>
    </MainPage>
  );
}
