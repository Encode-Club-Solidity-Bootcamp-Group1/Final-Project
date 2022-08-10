import { DataGrid } from "@mui/x-data-grid";
import { KudoDto } from "../../types/KudoDto";
import { COLUMNS } from "./columns";

export function KudosList(props: {
  title: string;
  data: KudoDto[];
}): JSX.Element {
  return (
    <>
      <h6 className="h-10 font-medium leading-tight text-base mt-1 mb-2 text-blue-600">
        {props.title}
      </h6>

      <DataGrid
        sx={{ height: 325, minHeight: 325 }}
        columns={COLUMNS}
        rows={props.data}
        getRowId={(row) => row.tokenId}
      />
    </>
  );
}
