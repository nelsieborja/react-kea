import React from "react";
import { useActions, useValues } from "kea";
import store from "./store";

export default function Search() {
  const { username } = useValues(store);
  const { setUsername } = useActions(store);

  return (
    <div style={{ marginBottom: 20 }}>
      <h1>Search for a github user</h1>
      <input
        value={username}
        type="text"
        onChange={e => setUsername(e.target.value)}
      />
    </div>
  );
}
