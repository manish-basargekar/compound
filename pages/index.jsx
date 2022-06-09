import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/signup"><a>signup</a></Link>
      <Link href="/login"><a>login</a></Link>
    </div>
  )
}

export default Home