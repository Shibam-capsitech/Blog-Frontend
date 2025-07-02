import { PrimaryButton, TextField } from "@fluentui/react";
import { Stack, type IStackProps, type IStackStyles } from '@fluentui/react/lib/Stack';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const stackTokens = { childrenGap: 20 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // light grey background
    padding: "20px",
  }
};

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: {
    root: {
      width: "100%",
      maxWidth: 400,
      padding: "40px 30px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
    }
  },
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      const payload = { username, password };
      const res = await axios.post("http://localhost:5022/api/User/login", payload);

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/view-post");
      } else {
        setError("Invalid login credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyles}>
      <Stack {...columnProps}>
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>Welcome Back 👋</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
          Please enter your credentials to log in.
        </p>

        <TextField
          label="Username"
          required
          value={username}
          onChange={(_, newValue) => setUsername(newValue || "")}
        />

        <TextField
          label="Password"
          type="password"
          canRevealPassword
          required
          value={password}
          onChange={(_, newValue) => setPassword(newValue || "")}
        />

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{error}</p>
        )}

        <PrimaryButton
          text={loading ? "Logging in..." : "Login"}
          onClick={onSubmit}
          disabled={loading}
          allowDisabledFocus
          style={{ marginTop: "10px" }}
        />

        <p style={{ marginTop: 20, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#0078d4" }}>
            Sign Up
          </Link>
        </p>
      </Stack>
    </Stack>
  );
}

export default Login;
