import { PrimaryButton, TextField } from "@fluentui/react";
import { Stack, type IStackProps, type IStackStyles } from '@fluentui/react/lib/Stack';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const stackTokens = { childrenGap: 30 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "150px",
    flexDirection: "column",
    alignItems: "center",
  }
};

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: {
    root: {
      width: 350,
      padding: "40px 20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "#ffffff"
    }
  },
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async () => {
    if (!username || !password) {
      return;
    }

    try {
      const payload = { username, password };
      const res = await axios.post("http://localhost:5022/api/User/login", payload);
      
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/view-post")
      } 
    } catch (err: any) {
      console.log(err)
    }
  };

  return (
    <div>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <h1 style={{ marginBottom: 10 }}>Login</h1>
        <Stack {...columnProps}>
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
          <PrimaryButton
            text={"Login"}
            onClick={onSubmit}
            allowDisabledFocus
            style={{ marginTop: "10px" }}
          />
        </Stack>
        <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
      </Stack>
    </div>
  );
}

export default Login;
