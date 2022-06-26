import Link from "next/link";
import DesoConfig from "../lib/DesoConfig";
import Deso from "deso-protocol";
import Tag from "./Tag";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect, useState } from "react";

const RecipePostCard = ({
    name,
    description,
    content,
    thumbnail,
    author,
    id,
    isPersonal,
    isNFT,
    likes,
    likedByUser,
}) => {
    const [isNft, setAsNft] = useState(isNFT);
    const [isLiked, setLiked] = useState(likedByUser);
    const [likeCount, setLikeCount] = useState(likes);

    const mintNFT = async () => {
        console.log("Minting...");
        const deso = new Deso(DesoConfig);
        let response;

        try {
            response = await deso.nft.createNft({
                UpdaterPublicKeyBase58Check: deso.identity.getUserKey(),
                NFTPostHashHex: id,
                NumCopies: 1,
                NFTRoyaltyToCreatorBasisPoints: 100,
                NFTRoyaltyToCoinBasisPoints: 100,
                HasUnlockable: false,
                IsForSale: false,
                MinFeeRateNanosPerKB: 1000,
            });

            console.log(response);

            alert("NFT successfully created 🎊");
        } catch (error) {
            alert("Sorry an error occured in the process!");
        }
    };

    const likePostHandler = async () => {
        const deso = new Deso(DesoConfig);
        let response;

        try {
            response = await deso.social.createLikeStateless({
                ReaderPublicKeyBase58Check: deso.identity.getUserKey(),
                LikedPostHashHex: id,
                MinFeeRateNanosPerKB: 1000,
                IsUnlike: isLiked,
            });

            setLiked(!isLiked);

            if (isLiked) {
                setLikeCount(likeCount - 1);
                console.log("unliked", response);
                alert("Unliked that post successfully!");
            } else {
                setLikeCount(likeCount + 1);
                console.log("liked", response);
                alert("Liked that post successfully!");
            }
            console.log(isLiked);
        } catch (error) {
            console.log("like/unlike error", error);
            alert("Unsuccessful like/unlike!");
            return;
        }
    };

    console.log("post likes", likes, name);

    return (
        <div className="bg-orange-400 rounded-lg overflow-hidden w-full p-4 shadow-md">
            {thumbnail && (
                <img
                    src={thumbnail}
                    alt={name}
                    className="rounded-lg w-full max-h-[300px] object-cover"
                />
            )}
            <Link href={`/browse/${id}`}>
                <div className="mt-2 cursor-pointer">
                    <h1 className="text-2xl font-semibold mb-1">{name}</h1>
                    <p className="mb-4">
                        {description
                            ? description.slice(0, 50)
                            : content.slice(0, 20)}
                        ...
                    </p>
                </div>
            </Link>
            <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                    <img
                        src={author.avatar}
                        alt={author.username}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <h3>{author.username}</h3>
                    {isPersonal ? (
                        !isNft ? (
                            <button
                                onClick={mintNFT}
                                className="bg-zinc-800 rounded-lg p-2 hover-scale text-white font-bold"
                            >
                                Mint NFT
                            </button>
                        ) : (
                            <Tag color="white" backgroundColor="#0fb866">
                                NFT
                            </Tag>
                        )
                    ) : (
                        <button
                            onClick={likePostHandler}
                            className="flex gap-2 items-center"
                        >
                            {isLiked ? (
                                <AiFillHeart size={28} color="red" />
                            ) : (
                                <AiOutlineHeart size={28} color="gray" />
                            )}{" "}
                            {likeCount}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipePostCard;
