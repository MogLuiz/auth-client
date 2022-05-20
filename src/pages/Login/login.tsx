import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  };

  return (
    <form className="content" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default App;
