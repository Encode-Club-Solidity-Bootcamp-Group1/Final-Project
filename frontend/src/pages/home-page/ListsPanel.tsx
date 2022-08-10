import { Box, Paper } from "@mui/material";
import { AxiosError } from "axios";
import { useContext } from "react";
import { KudosList } from "../../components/kudos-list/KudosList";
import { AccountContext } from "../../components/wrappers/IdentityWrapper";
import EndpointService from "../../services/Endpoint.service";
import { KudoDto } from "../../types/KudoDto";

export function ListsPanel(props: {}): JSX.Element {
  let receivedKudos: KudoDto[] = [];
  let sentKudos: KudoDto[] = [];
  const acccount = useContext(AccountContext);
  try {
    acccount.getAddress().then((address) => {
      EndpointService.getReceived(address)
        .then((data: KudoDto[]) => {
          console.log('received kudos:', data);
          receivedKudos = data;
        })
        .catch((e: AxiosError) =>
          console.error("couldn't receive the data", e)
        );
      EndpointService.getSent(address)
        .then((data: KudoDto[]) => {
          sentKudos = data;
          console.log('sent kudos:', data);
        })
        .catch((e: AxiosError) =>
          console.error("couldn't receive the data", e)
        );
    });
  } catch (error) {
    console.log("could not resolve address, try refreshing the page");
  }
  return (
    <Paper style={{ height: 800, width: 1000 }}>
      <div className="block p-6 rounded-lg shadow-lg bg-white ">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <KudosList title="Sent" data={sentKudos} />
          <KudosList title="Received" data={receivedKudos} />
        </Box>
      </div>
    </Paper>
  );
}
