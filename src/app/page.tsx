'use client'

import React, { useState, useEffect } from 'react'
import Terminal from '@/components/Terminal'
import '@/styles/components.css'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="App">
      <div className="terminal-scanlines" />
      <main>
        <Terminal />
      </main>
    </div>
  )
}