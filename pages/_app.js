import '../styles/globals.css'
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
		<>
			<Head>
				<title>Compound</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content=""
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);}

export default MyApp
