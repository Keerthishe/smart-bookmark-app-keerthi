"use client"

import { supabase } from "../lib/supabase"


export default function Home() {

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google"
    })
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <button 
        onClick={login}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Login with Google
      </button>
    </div>
  )
}
