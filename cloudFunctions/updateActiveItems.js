// Create a new table called "ActiveItem"
// Add items when they are listed on the marketplace
// Remove them when they are bought or canceled

Moralis.Cloud.afterSave("ItemListed", async (request) => {
    // Every event gets triggered twice, once on unconfirmed, again on confirmed
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("Looking for confirmed Tx.....")
    if (confirmed) {
        logger.info("Found Item!")
        const ActiveItem = Moralis.Object.extend("ActiveItem")

        const query = new Moralis.Query(ActiveItem)
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("seller", request.object.get("seller"))
        const alreadyListedItem = await query.first()
        if (alreadyListedItem) {
            logger.info(`Deleting already listed ${alreadyListedItem.id}`)
            await alreadyListedItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it's already listed`
            )
        }

        const activeItem = new ActiveItem()
        activeItem.set("marketplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokenId"))
        activeItem.set("seller", request.object.get("seller"))
        logger.info(
            `Adding address: ${request.object.get("address")}. TokenId; ${request.object.get(
                "tokenId"
            )}`
        )
        logger.info("Saving...")
        await activeItem.save()
    }
})

Moralis.Cloud.afterSave("ItemCanceled", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object: ${request.object}`)
    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${query}`)
        const canceledItem = await query.first()
        logger.info(`Marketplace | CanceledItem: ${JSON.stringify(canceledItem)}`)
        if (canceledItem) {
            logger.info(`Deleting ${canceledItem.id}`)
            await canceledItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it was canceled. `
            )
        } else {
            logger.info(
                `No item canceled with address: ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")} found.`
            )
        }
    }
})

Moralis.Cloud.afterSave("ItemBought", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object: ${request.object}`)
    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${query}`)
        const boughtItem = await query.first()
        logger.info(`Marketplace | BoughtItem: ${JSON.stringify(boughtItem)}`)
        if (boughtItem) {
            logger.info(`Deleting ${boughtItem.id}`)
            await boughtItem.destroy()
            logger.info(
                `Deleted item with tokenId ${request.object.get(
                    "tokenId"
                )} at address ${request.object.get("address")} since it was bought. `
            )
        } else {
            logger.info(
                `No item with address: ${request.object.get(
                    "address"
                )} and tokenId: ${request.object.get("tokenId")} found.`
            )
        }
    }
})
