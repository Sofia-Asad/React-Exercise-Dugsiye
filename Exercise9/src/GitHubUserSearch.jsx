
import { useState, useEffect } from 'react';

function GitHubUserSearch() {
  const [username, setUsername] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchUser) {
      setUser(null);
      return;
    }

    const controller = new AbortController();

    async function getUser() {
      setLoading(true);
      setUser(null);
      setError('');

      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(searchUser)}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          setError('User Not Found! Please enter a valid GitHub username.');
          return;
        }

        if (response.status === 403 || response.status === 429) {
          setError('GitHub API rate limit reached. Please try again later.');
          return;
        }

        if (!response.ok) {
          setError('Something went wrong. Please try again.');
          return;
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setUser(data);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to connect to GitHub. Check your internet connection.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getUser();

    return () => {
      controller.abort();
    };
  }, [searchUser]);

  const handleSearch = (e) => {
    e.preventDefault();

    const name = username.trim();

    setUser(null);
    setError('');

    if (!name) {
      setSearchUser('');
      setError('Please enter a GitHub username.');
      return;
    }

    setSearchUser(name);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setUsername(value);

    if (!value.trim()) {
      setSearchUser('');
      setUser(null);
      setError('');
      setLoading(false);
    } else {
      setUser(null);
      setError('');
    }
  };

  return (
    <div>
      <h2>GitHub User Search</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={handleChange}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching...</p>}

      {error && !loading && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {user && !loading && !error && (
        <div>
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width="120"
          />

          <h3>{user.name || user.login}</h3>

          <p>Username: @{user.login}</p>

          <p>Bio: {user.bio || 'No bio available'}</p>

          <p>Location: {user.location || 'Not provided'}</p>

          <p>Public repositories: {user.public_repos}</p>

          <p>Followers: {user.followers}</p>

          <p>Following: {user.following}</p>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default GitHubUserSearch;
