import { Box, Paper } from '@mui/material';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { KudosList } from '../../components/kudos-list/KudosList';
import { AccountContext } from '../../components/wrappers/IdentityWrapper';
import Endpoints from '../../EndpointWrapper';
import { KudoDto } from '../../types/KudoDto';

export function ListsPanel(props: {}): JSX.Element {
  let receivedKudos: KudoDto[] = [];
  let sentKudos: KudoDto[] = [];
  const acccount = useContext(AccountContext);
  try {
    acccount.getAddress().then(address => {
      Endpoints.getReceived(address).then((data: KudoDto[]) => {
        receivedKudos = data;
      }).catch((e: AxiosError) => console.error("couldn't receive the data", e));
      Endpoints.getSent(address).then((data: KudoDto[]) => {
        sentKudos = data;
      }).catch((e: AxiosError) => console.error("couldn't receive the data", e));
    })
  } catch (error) {
    console.log('could not resolve address, try refreshing the page');
  }
  return <Paper style={{ height: 800, width: 1000 }}>
    <div className="block p-6 rounded-lg shadow-lg bg-white ">
      <Box style={{ justifyContent: 'space-between' }}>
        <KudosList title='Sent' data={sentKudos} />
        <KudosList title='Received' data={receivedKudos} />
      </Box>
    </div>
  </Paper>;
}
