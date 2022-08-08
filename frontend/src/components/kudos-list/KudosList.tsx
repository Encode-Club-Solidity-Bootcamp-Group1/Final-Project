import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { COLUMNS } from "./columns";
import { Paper } from '@mui/material'
import { KudoDto } from "../../types/KudoDto";
export function KudosList(props: { title: string, data: KudoDto[] }): JSX.Element {
  return <div>
    <Paper style={{ height: 300 }}>
      <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
        {props.title}
      </h6>
      <DataGrid columns={COLUMNS} rows={props.data}
        getRowId={row => row.tokenId}
      />
    </Paper>
  </div >
}