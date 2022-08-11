import { Box, Paper } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { KudosList } from '../../components/kudos-list/KudosList';
import EndpointService from '../../services/Endpoint.service';

export function ListsPanel(props: {}): JSX.Element {
  const [receivedKudos, setReceivedKudos] = useState([]);
  const [sentKudos, setSentKudos] = useState([]);
  const { account } = useEthers();

  const getReceivedKudos = useCallback(async () => {
    const data = await EndpointService.getReceived(account || '');
    // @ts-ignore
    setReceivedKudos(data.data);
  }, [account]);

  const getSentKudos = useCallback(async () => {
    const data = await EndpointService.getSent(account || '');
    // @ts-ignore
    setSentKudos(data.data);
  }, [account]);

  useEffect(() => {
    if (account) {
      getReceivedKudos().then((r) => console.log(r));
      getSentKudos().then((r) => console.log(r));
    }
  }, [account, getReceivedKudos, getSentKudos]);

  return (
    <Paper style={{ height: 800, width: 1000 }}>
      <div className="block p-6 rounded-lg shadow-lg bg-white ">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <KudosList title="Sent" data={sentKudos} />
          <KudosList title="Received" data={receivedKudos} />
        </Box>
      </div>
    </Paper>
  );
}
