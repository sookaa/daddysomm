import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'f4386fe0951df42b398e0d665cbd4b113b718536', queries,  });
export default client;
  