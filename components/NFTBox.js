import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const [imageURI, setImageURI] = useState("")
    const { isWeb3Enabled } = useMoralis()

    const {runContractFunction: getTokenURI} = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: { tokenId: tokenId, },
    })

    async function updateUI() {
        //get the tokenURI
        //using the image tag from the tokenURI, get the image
        const tokenURI = await getTokenURI()
        console.log(tokenURI)
    }

    useEffect(() => {
        console.log(isWeb3Enabled)
        if(isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
}