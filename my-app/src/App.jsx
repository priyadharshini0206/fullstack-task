import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: "Bearer test123",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile Page</h1>

      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
