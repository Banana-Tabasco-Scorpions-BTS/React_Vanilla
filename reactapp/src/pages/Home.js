import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react";
import axios from "axios"

import './Home.css';



export function Home() {
  const [gameID, setGameID] = useState()
  const [user, setUser] = useState("");


  useEffect(() => {
    if (gameID !== undefined) {
      window.location.replace('/Game Page')
    }
  }, [gameID])

  async function handleClick() {
    setGameID(await axios.post('https://blind-test-songs-server-predeploy.onrender.com/newgame', { "username": user })
      .then((newGameRes) => {
        const newGameID = newGameRes.data.gameID
        setGameID(newGameID);
        return newGameID
      })
      .catch((err) => console.log(err))
    )
  }

  return (
    <section className="container">

      <h1>BLIND TEST SONGS</h1>
      <p className="intro-text">You have 30 seconds to guess the name of song, sounds simple right?</p>
      <p className="intro-text">To start, just write your name and hit the big ol' button.</p>
      <input className="input"
        autoFocus
        type="text"
        required
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <button className="start-button" onClick={handleClick}>Let's go!</button>
    </section>
  )
}