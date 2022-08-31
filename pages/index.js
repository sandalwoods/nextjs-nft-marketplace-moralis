import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery } from "react-moralis"

export default function Home() {
    // How do we show the recently listed NFTs
    // We will index the events off-chain and then ready from our database
    // Setup a server to listen for those events to be fired, and we will add them to a database to query
    // TheGraph does this in a decentralized way
    // Moralis does it in a centralized way and comes with a ton of other features
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        // TableName
        // Function for the query
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )
    console.log(listedNfts)

    return <div className={styles.container}>hello</div>
}
