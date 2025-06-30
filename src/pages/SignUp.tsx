import { PrimaryButton, TextField } from "@fluentui/react";
import { Stack, type IStackProps, type IStackStyles } from "@fluentui/react/lib/Stack";
import axios from "axios";
import { useState } from "react";
import { Link, Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
            width: 400,
            padding: "40px 20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
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
    const navigate = useNavigate()

    const onSubmit = async () => {
        if (!name || !username || !city || !age || !password) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const payload = { name, username,email ,city, age: parseInt(age), password };
            const res = await axios.post("http://localhost:5022/api/User/register", payload);

            if (res.status === 200) {
                alert("Signup successful!");
                navigate("/");
            }
        } catch (err: any) {
            console.error(err);
            alert("Signup failed. Check console for details.");
        }
    };

    return (
        <div>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <h1 style={{ marginBottom: 10 }}>Create an Account</h1>
                <Stack {...columnProps}>
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
                        type="Email"

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
                    <PrimaryButton
                        text="Sign Up"
                        onClick={onSubmit}
                        allowDisabledFocus
                        style={{ marginTop: "10px" }}
                    />
                </Stack>
                <p>Already have an account? <Link to="/">Login</Link></p>
            </Stack>
        </div>
    );
}

export default SignUp;
