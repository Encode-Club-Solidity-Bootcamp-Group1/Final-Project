import React from 'react';
import { KudosList } from '../../components/kudos-list/KudosList';
import { fakeData } from '../../components/kudos-list/fakeData';
import { Paper } from '@mui/material';

export function ListsPanel(props: {}): JSX.Element {
  return <Paper style={{ height: 800, width: 1000 }}>
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <KudosList title='Received' data={fakeData} />
      <br />
      <br />
      <KudosList title='Sent' data={fakeData} />
      <br />
    </div>
  </Paper>;
}
