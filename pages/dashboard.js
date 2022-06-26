import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserRecipes } from "../lib/DesoHooks";
import Deso from "deso-protocol";
import DesoConfig from "../lib/DesoConfig";
import PostFilterString from "../lib/PostFilterString";
import Friends from "../components/friends";
import RecipePostCard from "../components/RecipePostCard";
import MetaInfo from "../components/MetaInfo";

export default function Dashboard() {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [userRecipes] = useUserRecipes();

    useEffect(() => {
        (async () => {
            // Get all recipes
            const myDeso = new Deso(DesoConfig);
            const response = await myDeso.posts.getPostsStateless({
                PostContent: PostFilterString,
                NumToFetch: 900,
            });
            // console.log("Posts", response.PostsFound);

            let allPosts = [];

            await Promise.all(response.PostsFound.filter(
                (postObj) =>
                    postObj.PosterPublicKeyBase58Check !==
                    myDeso.identity.getUserKey()
            ).map(async (postObj) => {
                let username = postObj.PosterPublicKeyBase58Check.slice(0, 10);
                let avatar = myDeso.user.getSingleProfilePicture(
                    postObj.PosterPublicKeyBase58Check
                );

                if (
                    postObj.ProfileEntryResponse &&
                    postObj.ProfileEntryResponse.Username
                ) {
                    username = postObj.ProfileEntryResponse.Username;
                }

                // console.log(postObj.PostEntryReaderState)

                // Get people who liked the post
                const postLikers = (await myDeso.posts.getLikesForPost({
                  PostHashHex: postObj.PostHashHex,
                  Limit: 100,
                  ReaderPublicKeyBase58Check: myDeso.identity.getUserKey()
                })).Likers.map(liker => liker.PublicKeyBase58Check);
                
                allPosts.push({
                    name: postObj.PostExtraData.recipeName,
                    description: postObj.PostExtraData.recipeDescription,
                    content: postObj.Body.replace(`${PostFilterString}--`, ""),
                    thumbnail: postObj.ImageURLs && postObj.ImageURLs[0],
                    author: {
                        username: username,
                        avatar: avatar,
                    },
                    id: postObj.PostHashHex,
                    likes: postObj.LikeCount,
                    likedByUser: postLikers.includes(myDeso.identity.getUserKey())
                });
            }));

            console.log("All posts", allPosts);

            setRecipes(allPosts);
        })();

        if (!window.localStorage.getItem("deso_user_key")) {
            router.push("/");
        }

        console.log("hello!");
    }, []);

    return (
        <div>
            <MetaInfo name="Dashboard" />
            <p className="text-5xl text-center font-bold my-12">My recipes</p>
            {userRecipes.length ? (
                <div className="grid grid-cols-responsive gap-8 p-4 pb-0">
                    {userRecipes.map((post) => (
                        <RecipePostCard {...post} key={post.id} isPersonal />
                    ))}
                </div>
            ) : (
                <h2 className="text-center text-xl my-6">
                    There seem to be no recipes by you...
                </h2>
            )}

            <Friends />

            <p className="text-5xl text-center font-bold my-12">
                Recent recipes
            </p>

            {recipes.length ? (
                <div className="grid grid-cols-responsive gap-8 p-4">
                    {recipes.map((post) => (
                        <RecipePostCard {...post} key={post.id} />
                    ))}
                </div>
            ) : (
                <h2 className="text-center text-xl my-6">
                    There seem to be no recipes...
                </h2>
            )}
        </div>
    );
}
