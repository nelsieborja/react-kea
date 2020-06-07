import React from "react";
import { useValues } from "kea";
import store from "./store";

export default function Repos() {
  const { username, error, sortedRepositories } = useValues(store);

  return sortedRepositories.length > 0 ? (
    <div>
      <h3>
        Found {sortedRepositories.length} repositories for user {username}!
      </h3>
      {sortedRepositories.map(repo => (
        <div key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.full_name}
          </a>
          {" - "}
          {repo.stargazers_count} stars, {repo.forks} forks.
        </div>
      ))}
    </div>
  ) : (
    <div>{error ? `Error: ${error}` : "No repositories found"}</div>
  );
}
