import React, { useState } from "react"
import { Github } from "lucide-react"

const Resume = () => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [pdfBase64, setPdfBase64] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setPdfBase64("")

    if (!username.trim()) {
      setError("Please enter your GitHub username.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `https://103b-115-244-89-215.ngrok-free.app/generate-resume/${username}`,
        { method: "POST" }
      )

      if (!response.ok) {
        throw new Error("Failed to generate resume.")
      }

      const blob = await response.blob()
      const base64 = await blobToBase64(blob)
      setPdfBase64(base64)
    } catch (err) {
      console.error(err)
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob) // returns base64 with data:application/pdf;base64,...
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <Github className="h-10 w-10 text-teal-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Enter Your GitHub Username
          </h2>
          <p className="text-gray-500 text-center">
            We'll use your GitHub profile to help build your resume.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="github-username"
            className="block text-gray-700 font-medium mb-2"
          >
            GitHub Username
          </label>
          <input
            id="github-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. octocat"
            className="w-full px-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-900 bg-teal-50 mb-3"
            autoFocus
          />
          {error && <div className="mb-3 text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
            disabled={loading}
          >
            <Github className="h-5 w-5 mr-2" />
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>

        {pdfBase64 && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Resume Preview</h3>
            <iframe
              src={pdfBase64}
              title="Generated Resume"
              className="w-full h-[700px] rounded-md border"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  )
}

export default Resume
