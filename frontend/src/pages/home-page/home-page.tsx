import { Box } from '@mui/system';
import ConnectWallet from '../../components/connect-wallet';
import { Form } from '../../components/mint-form/Form';
import MainPage from '../main-page';
import { ListsPanel } from './ListsPanel';
import './styles/home-page.css';

export default function HomePage() {
  return (
    <MainPage>
      <div className="grid place-items-center h-screen relative">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            mt: 2,
            mr: 4,
            width: '100%',
          }}>
          <ConnectWallet />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ mx: 2 }}>
            <Form title="Mint NFT" />
          </Box>
          <ListsPanel />
        </Box>
      </div>
    </MainPage>
  );
}
