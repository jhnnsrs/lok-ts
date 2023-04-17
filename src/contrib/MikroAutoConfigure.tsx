import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { useLok } from "../lok/LokContext";
import result from "../api/lok/fragments";

export const MikroAutoConfigure: React.FC<{}> = (props) => {
  const { configure } = useLok();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    if (token && fakts.lok) {
      configure({
        secure: fakts.lok.secure,
        wsEndpointUrl: fakts.lok.ws_endpoint_url,
        endpointUrl: fakts.lok.endpoint_url,
        possibleTypes: result.possibleTypes,
        retrieveToken: () => token,
      });
    }
  }, [token, fakts]);

  return <> </>;
};
