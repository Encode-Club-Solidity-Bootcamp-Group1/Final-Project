import React from 'react';
import { KudosList } from '../../components/kudos-list/KudosList';
import { fakeData } from '../../components/kudos-list/fakeData';
import { Paper } from '@mui/material';

export function ListsPanel(props: {}): JSX.Element {
  // todo /kudos/received/{address}
  // todo /kudos/sent/{address}
  return <Paper style={{ height: 800, width: 1000 }}>
    <KudosList title='Received' data={fakeData} />
    <br />
    <br />
    <KudosList title='Sent' data={fakeData} />
    <br />
  </Paper>;
}
