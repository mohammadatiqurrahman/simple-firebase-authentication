// import logo from './logo.svg';
import { getAuth,signInWithPopup,GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { useState } from "react";

import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
initializeAuthentication()
function App() {
  const [user,setUser] = useState({})
  // const [gituser,setGitUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth();


  const handleGoogleAuthentication=()=>{
    signInWithPopup(auth, googleProvider)
    .then(result=>{
      const {displayName,email,photoURL} = result.user;
      const loginInfo ={
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loginInfo)
    })
  }

  const handleGithubAuthentication=()=>{
    signInWithPopup(auth, githubProvider)
    .then(result=>{
      const {displayName,photoURL,email} = result.user;
      const loginInfo={
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loginInfo)
      // console.log(user);
    })

  }

  return (
    <div className="App">
      <button onClick={handleGoogleAuthentication}>Sign in With Google</button>
      <button onClick={handleGithubAuthentication}>Sign in With Github</button>
      {
        user.name && <div>
          <h6>{user.name}</h6>
          <p>{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      
    </div>
  );
}

export default App;
