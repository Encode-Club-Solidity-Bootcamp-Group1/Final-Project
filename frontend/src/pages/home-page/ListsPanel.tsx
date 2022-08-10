import { Box, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { KudosList } from "../../components/kudos-list/KudosList";
import { AccountContext } from "../../components/wrappers/IdentityWrapper";
import EndpointService from "../../services/Endpoint.service";
import { KudoDto } from "../../types/KudoDto";

export function ListsPanel(props: {}): JSX.Element {
  const [receivedKudos, setReceivedKudos] = useState([]);
  const [sentKudos, setSentKudos] = useState([]);
  const account = useContext(AccountContext);

  async function getReceivedKudos() {
    const address = await account.getAddress();
    const data = await EndpointService.getReceived(address);
    // @ts-ignore
    setReceivedKudos(data.data);
  }

  async function getSentKudos() {
    const address = await account.getAddress();
    const data = await EndpointService.getSent(address);
    // @ts-ignore
    setSentKudos(data.data);
  }

  useEffect(() => {
    getReceivedKudos().then((r) => console.log(r));
    getSentKudos().then((r) => console.log(r));
  }, [account]);

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
