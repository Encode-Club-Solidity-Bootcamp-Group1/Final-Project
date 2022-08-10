import { GridColDef } from "@mui/x-data-grid/models/colDef";

export const COLUMNS: GridColDef[] = [
  {
    field: "from",
    headerName: "From",
  },

  {
    field: "to",
    headerName: "To",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "description",
    headerName: "Description",
  },
  {
    field: "imageUrl",
    headerName: "Link",
  },
  {
    field: "tokenId",
    headerName: "Tx ID",
  },
];
