import { kea } from "kea";

const API_URL = "https://api.github.com";

export default kea({
  actions: () => ({
    setUsername: username => ({ username }),
    setRepositories: repositories => ({ repositories }),
    setFetchError: error => ({ error })
  }),

  reducers: () => ({
    username: [
      "keajs",
      {
        setUsername: (_, { username }) => username
      }
    ],
    repositories: [
      [],
      {
        setUsername: () => [], // Set repositories=[] once "setUsername" gets called
        setRepositories: (_, { repositories }) => repositories
      }
    ],
    isLoading: [
      false,
      {
        setUsername: () => true, // Set isLoading=true once "setUsername" gets called
        setRepositories: () => false,
        setFetchError: () => false
      }
    ],
    error: [
      null,
      {
        setUsername: () => null,
        setFetchError: (_, { error }) => error
      }
    ]
  }),

  selectors: ({ selectors }) => ({
    sortedRepositories: [
      () => [selectors.repositories],
      repositories => {
        return [...repositories].sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
      }
    ]
  }),

  listeners: ({ actions }) => ({
    setUsername: async ({ username }, breakpoint) => {
      await breakpoint(300); // debounce for 300ms

      const url = `${API_URL}/users/${username}/repos?per_page=250`;

      // handle network errors
      let response;
      try {
        response = await fetch(url);
      } catch (error) {
        actions.setFetchError(error.message);
        return; // nothing to do after, so return
      }

      // break if action was dispatched again while we were fetching
      breakpoint();

      const json = await response.json();

      if (response.status === 200) {
        actions.setRepositories(json);
      } else {
        actions.setFetchError(json.message);
      }
    }
  }),

  events: ({ actions, values }) => ({
    // Fetch the repositories on first load
    afterMount: () => {
      actions.setUsername(values.username);
    }
  })
});
