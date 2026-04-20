import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDebounce } from "./hooks/useDebounce";
import { Button } from "./components/Button";

type User = {
  id: string;
  role: string;
};

type ApiResponse = {
  message: string;
  user: User;
};

export default function App() {
  // 🔹 LocalStorage + Input
  const [input, setInput] = useLocalStorage<string>("search", "");

  // 🔹 Debounce
  const debounced = useDebounce<string>(input, 1000);

  // 🔹 States
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string>("");

  // 🔹 API Call Function
  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer test123", 
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const result: ApiResponse = await res.json();
      setData(result);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 THIS IS WHERE YOU APPLY useEffect (IMPORTANT)
  useEffect(() => {
    if (!debounced) return;
    handleSearch();
  }, [debounced]);

  // 🔹 Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "15px",
        fontFamily: "Arial",
      }}
    >
      <h2>🔍 Smart Search + API</h2>

      <input
        value={input}
        onChange={handleChange}
        placeholder="Search something..."
        style={{
          padding: "10px",
          width: "250px",
          borderRadius: "8px",
          border: "1px solid gray",
          outline: "none",
        }}
      />

      <p style={{ color: "gray", fontSize: "14px" }}>Debounced: {debounced}</p>

      {/* Optional manual button */}
      <Button onClick={handleSearch} isLoading={loading}>
        Fetch Profile
      </Button>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* API Result */}
      {data && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>
            <b>Message:</b> {data.message}
          </p>
          <p>
            <b>User ID:</b> {data.user.id}
          </p>
          <p>
            <b>Role:</b> {data.user.role}
          </p>
        </div>
      )}
    </div>
  );
}
