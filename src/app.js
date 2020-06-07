import React from "react";
import { useValues } from "kea";

import store from "./store";
import Search from "./Search";
import Repos from "./Repos";

export default function Github() {
  const { isLoading } = useValues(store);

  return (
    <div className="example-github-scene">
      <Search />
      {isLoading ? <div>Loading...</div> : <Repos />}
    </div>
  );
}
