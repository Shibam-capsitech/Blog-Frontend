import { PrimaryButton, TextField } from "@fluentui/react";
import { Stack, type IStackProps, type IStackStyles } from "@fluentui/react/lib/Stack";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: "20px"
  }
};

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: {
    root: {
      width: "100%",
      maxWidth: 500,
      padding: "40px 30px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      backgroundColor: "#ffffff"
    }
  },
};

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setError("");
    if (!name || !username || !email || !city || !age || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const payload = { name, username, email, city, age: parseInt(age), password };
      const res = await axios.post("http://localhost:5022/api/User/register", payload);

      if (res.status === 200) {
        alert("Signup successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack horizontalAlign="center" styles={stackStyles}>
      <Stack {...columnProps}>
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>Create Your Account</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
          Fill in the details to register a new account.
        </p>

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <TextField
            label="Name"
            required
            value={name}
            onChange={(_, val) => setName(val || "")}
            styles={{ root: { flex: 1 } }}
          />
          <TextField
            label="Username"
            required
            value={username}
            onChange={(_, val) => setUsername(val || "")}
            styles={{ root: { flex: 1 } }}
          />
        </Stack>

        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(_, val) => setEmail(val || "")}
        />

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <TextField
            label="City"
            required
            value={city}
            onChange={(_, val) => setCity(val || "")}
            styles={{ root: { flex: 1 } }}
          />
          <TextField
            label="Age"
            required
            type="number"
            value={age}
            onChange={(_, val) => setAge(val || "")}
            styles={{ root: { flex: 1 } }}
          />
        </Stack>

        <TextField
          label="Password"
          type="password"
          canRevealPassword
          required
          value={password}
          onChange={(_, val) => setPassword(val || "")}
        />

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{error}</p>
        )}

        <PrimaryButton
          text={loading ? "Signing Up..." : "Sign Up"}
          onClick={onSubmit}
          disabled={loading}
          allowDisabledFocus
          style={{ marginTop: "10px" }}
        />

        <p style={{ marginTop: 20, textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "#0078d4" }}>
            Login
          </Link>
        </p>
      </Stack>
    </Stack>
  );
}

export default SignUp;
