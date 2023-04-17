import { LokClient, LokConfig } from "./types";
import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

export type LokContextType = {
  client?: LokClient;
  configure: (config: LokConfig) => void;
  config?: LokConfig;
};

export const LokContext = React.createContext<LokContextType>({
  configure: () => {
    throw Error("No Provider in context not configured");
  },
});

export const useLok = () => useContext(LokContext);

export const useLokQuery = (query: any) => {
  const { client } = useLok();
  return useQuery(query, { client: client });
};

export function withLok<T extends (options: any) => any>(func: T): T {
  const Wrapped = (nana: any) => {
    const { client } = useLok();
    return func({ ...nana, client: client });
  };
  return Wrapped as T;
}
