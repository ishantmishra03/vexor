import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16 bg-gray-50 rounded-xl mt-12">
      <h1 className="text-[#040814] text-3xl sm:text-4xl font-bold mb-3">
        Never Miss a Blog!
      </h1>
      <p className="text-gray-600 mb-6 max-w-xl">
        Subscribe to stay updated with the latest in tech, coding trends, and exclusive developer insights.
      </p>

      <form className="w-full max-w-lg flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="newsletter"
          id="newsletter"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#9a36ff] text-white font-semibold rounded-md hover:bg-purple-500 transition cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
