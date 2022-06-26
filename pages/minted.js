import { useState, useEffect } from "react";
import Deso from "deso-protocol";
import DesoConfig from "../lib/DesoConfig";

export default function Minted() {
    const [mintedNfts, setMintedNfts] = useState([]);

    useEffect(() => {
        (async () => {
            const deso = new Deso(DesoConfig);
            const response = await deso.nft.getNftsForUser({
                UserPublicKeyBase58Check: localStorage.getItem("deso_user_key"),
            });

            console.log("nfts for user", response);
        })();
    }, []);

    return <div>minted</div>;
}
