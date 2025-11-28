import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import api from "../../api/authApi";
import axios from "axios";
import { alertError } from "../../utils/sweetalert";

function Login() {
  const { login } = useAuth();
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", {
        login: userLogin,
        password,
      });

      const token = res.data.acessToken;
      login(token);
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alertError("Credenciais incorretas, tente novamente");
          return;
        }

        alertError("Houve um erro inesperado.");
        return;
      }

      alertError("Houve um erro inesperado.");
    }
  }

  return (
    <main className="grid px-2 gap-2">
      <div className="bg-darkYellow rounded-xl w-full" >
        <h2 className="font-bold text-3xl lg:text-5xl px-8 py-28">
          Logar como administrador
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 min-h-screen flex flex-col gap-4"
      >
        <div>
          <label htmlFor="login" className="font-medium text-white ml-2">
            Login
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="login"
              value={userLogin}
              onChange={event => setUserLogin(event.target.value)}
              autoComplete="username"
              className="w-full p-4  text-sm text-black border-2 rounded-lg
              bg-gray-50 focus:outline-none focus:border-darkYellow"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="font-medium text-white ml-2">
            Senha
          </label>
          <div className="mt-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              className="w-full p-4  text-sm text-black border-2
            rounded-lg bg-gray-50 focus:outline-none focus:border-darkYellow"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-darkYellow 
            py-4 font-bold mt-4 cursor-pointer"
          >
            Entrar
          </button>
        </div>
      </form>
    </main>
  )
}

export default Login;
