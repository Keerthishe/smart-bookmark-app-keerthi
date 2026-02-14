"use client"

import { useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {

  // ✅ Auto-redirect if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        window.location.href = "/dashboard"
      }
    }

    checkUser()
  }, [])

  // ✅ Google Login with dynamic redirect
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">

      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl text-center space-y-6">

        <h1 className="text-3xl font-bold text-white">
          Smart Bookmark App
        </h1>

        <p className="text-gray-400">
          Save and manage your bookmarks securely
        </p>

        <button
          onClick={login}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg w-full"
        >
          Login with Google
        </button>

      </div>

    </div>
  )
}
