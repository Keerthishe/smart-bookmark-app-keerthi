"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {

    const [user, setUser] = useState<any>(null)
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [bookmarks, setBookmarks] = useState<any[]>([])

    // 🔐 Get Logged-in User
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()

            if (data.user) {
                setUser(data.user)
                fetchBookmarks(data.user.id)
            }
        }

        getUser()
    }, [])

    // 📥 Fetch Bookmarks
    const fetchBookmarks = async (userId: string) => {
        const { data, error } = await supabase
            .from("bookmarks")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })

        if (!error) {
            setBookmarks(data || [])
        }
    }

    // ➕ Add Bookmark
    const addBookmark = async () => {
        if (!title || !url) {
            alert("Please enter title and URL")
            return
        }

        const { error } = await supabase
            .from("bookmarks")
            .insert([
                {
                    title: title,
                    url: url,
                    user_id: user.id
                }
            ])

        if (error) {
            alert(error.message)
        } else {
            setTitle("")
            setUrl("")
            fetchBookmarks(user.id)
        }
    }

    // ❌ Delete Bookmark
    const deleteBookmark = async (id: string) => {
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id)

        if (!error) {
            fetchBookmarks(user.id)
        }
    }

    // 🔄 Real-Time Updates
    useEffect(() => {
        if (!user) return

        const channel = supabase
            .channel("realtime-bookmarks")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks"
                },
                () => {
                    fetchBookmarks(user.id)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [user])

    if (!user) {
        return <div className="p-10 text-center">Loading...</div>
    }

    
        return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex justify-center items-start py-16">

    <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">

      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Welcome {user.email}
      </h1>

      {/* Add Bookmark Form */}
      <div className="space-y-4 mb-8">

        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={addBookmark}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-[1.02]"
        >
          ➕ Add Bookmark
        </button>

      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">

        {bookmarks.length === 0 && (
          <div className="text-center text-gray-400">
            No bookmarks yet. Start adding some 🚀
          </div>
        )}

        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="bg-gray-800 hover:bg-gray-700 transition p-4 rounded-xl flex justify-between items-center shadow-md"
          >
            <div>
              <h3 className="text-white font-semibold text-lg">
                {b.title}
              </h3>
              <a
                href={b.url}
                target="_blank"
                className="text-blue-400 text-sm hover:underline break-all"
              >
                {b.url}
              </a>
            </div>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-400 hover:text-red-600 font-semibold transition"
            >
              ❌
            </button>
          </div>
        ))}

      </div>

    </div>

  </div>
)

    
}
