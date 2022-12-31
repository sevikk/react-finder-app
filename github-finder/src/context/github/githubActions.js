import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const githubAxios = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await githubAxios.get(`/search/users?${params}`);
  return response.data;
};

// GET USER AMD REPOS
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    githubAxios.get(`/users/${login}`),
    githubAxios.get(`/users/${login}/repos`),
  ]);

  return {
    user: user.data,
    repos: repos.data,
  };
};
