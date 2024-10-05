import { useState } from 'react'
import './App.css'
import LoginView from './views/LoginView'
import Accueil from './views/Accueil'
import { AppContext } from './AppContext';

function App() {
  const [token, setToken] = useState("")
  const [refresh, setRefresh] = useState(false)
  // on a besoin de son email pour ensuite recuperer son username car le token
  // ne nous permet d'avoir que la liste des utilisateurs, il faut donc l'email 
  // pour pouvoir retrouver cet utilisateur dans la liste
  const [email, setEmail] = useState("")

  // appel au backend pour la recuperation du token
  async function verifyLogin(email, password) {
    let data
    const response = await (await fetch("https://web-project.osc-fr1.scalingo.io/login",
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      .catch(error => {
        console.error('An error occured during login : ', error);
      }))

    // on verifie s'il n'y a pas eu d'erreur
    if (!response) {
      console.log("identifiants incorrects")
    }
    else {
      data = await response.json()
      // on met a jour le token
      setToken(data.token)
    }
    
    setEmail(email)
  }

  return (
    <AppContext.Provider value={{ token, setToken, refresh, setRefresh }}>
      <main>
        {(!token ? <LoginView isInfoValid={verifyLogin} />
          : <Accueil email={email}/>)}
      </main>
    </AppContext.Provider>
  )
}

export default App
