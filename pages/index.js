
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  // How do we show the recently listed NFTs
  // We will index the events off-chain and then ready from our database
  // Setup a server to listen for those events to be fired, and we will add them to a database to query
  // TheGraph does this in a decentralized way
  // Moralis does it in a centralized way and comes with a ton of other features
  return (
    <div className={styles.container}>
      hello
    </div>
  )
}
 