import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React, { useState } from "react";
import { createLokClient } from "./client";
import { LokContext } from "./LokContext";
import { LokConfig } from "./types";

export type LokProps = {
  children: React.ReactNode;
  clientCreator?: (config: LokConfig) => ApolloClient<NormalizedCacheObject>;
};

export const LokProvider: React.FC<LokProps> = ({
  children,
  clientCreator = createLokClient,
}) => {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >();
  const [config, setConfig] = useState<LokConfig>();

  const configure = (config: LokConfig) => {
    setConfig(config);
    setClient(clientCreator(config));
  };

  return (
    <LokContext.Provider
      value={{
        client: client,
        configure: configure,
        config: config,
      }}
    >
      {children}
    </LokContext.Provider>
  );
};
