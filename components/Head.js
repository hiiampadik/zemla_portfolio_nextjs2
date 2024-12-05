
import Head from 'next/head'

export default function Header({title}) {

    return(
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
            <title>{title}</title>
            <meta name="description" content="Professional photographer & filmmaker Petr Žemla, creates art, fashion, commercial & experimental photography using digital & analog mediums. Collaborates with fashion & interior designers & film productions." />
            <meta name="keywords" content="Petr Žemla, photography, fashion, photographer, art photography, experimental photography, analog photography, film photography, commercial photography, sustainable website" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
	        <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.png" />
            <link rel="stylesheet" href="https://use.typekit.net/xxg4kak.css" />
        </Head>
    )
}
