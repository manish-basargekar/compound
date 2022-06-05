import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/signup"><button>signup</button></Link>
      <Link href="/login"><button>login</button></Link>
    </div>
  )
}

export default Home