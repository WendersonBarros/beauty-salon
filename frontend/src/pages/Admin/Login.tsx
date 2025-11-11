import { useEffect, useState } from "react";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // if token is valid
    // redirect to admin panel
    // if not try to use the refresh token
    //
  }, []);

  return (
    <main className="grid px-2 gap-2">
      <div className="bg-darkYellow rounded-xl w-full" >
        <h2 className="font-bold text-3xl lg:text-5xl px-8 py-28">
          Logar como administrador
        </h2>
      </div>

      <form className="mt-7 min-h-screen flex flex-col gap-4">
        <div>
          <label htmlFor="login" className="font-medium text-white ml-2">Login</label>
          <div className="mt-2">
            <input
              type="text"
              id="login"
              value={login}
              onChange={event => setLogin(event.target.value)}
              autoComplete="username"
              className="w-full p-4  text-sm text-black border-2
            rounded-lg bg-gray-50 focus:outline-none focus:border-darkYellow"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="font-medium text-white ml-2">Senha</label>
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
