import Deso from "deso-protocol";
import DesoConfig from "./DesoConfig";
import PostFilterString from "./PostFilterString";

export default async function getRecipe(id) {
    const deso = new Deso(DesoConfig);
    const postObj = (await deso.posts.getSinglePost({ PostHashHex: id }))
        .PostFound;

    // Default username should be the first 10 chars of their public key
    let username = postObj.PosterPublicKeyBase58Check.slice(0, 10);
    let avatar = "/images/default-pfp.jpg";

    try {
        avatar = deso.user.getSingleProfilePicture(
            postObj.PosterPublicKeyBase58Check
        );
    } catch (e) {
        console.error("Error when getting profile pic for author", e);
        console.log("Avatar falling back to default...");
    }

    if (postObj.ProfileEntryResponse && postObj.ProfileEntryResponse.Username) {
        username = postObj.ProfileEntryResponse.Username;
    }

    console.log(postObj.ImageURLs);

    return {
        name: postObj.PostExtraData.recipeName,
        description: postObj.PostExtraData.description,
        content: postObj.Body.replace(`${PostFilterString}--`, ""),
        ingredients: postObj.PostExtraData.recipeIngredients,
        thumbnail: postObj.ImageURLs !== null && postObj.ImageURLs.at(0),
        author: {
            username: username,
            avatar: avatar,
        },
        id: postObj.PostHashHex,
        likes: postObj.LikeCount
    };
}
