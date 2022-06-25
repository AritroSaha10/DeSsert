import Deso from "deso-protocol";
import DesoConfig from "../lib/DesoConfig";
import PostFilterString from "../lib/PostFilterString";
import { FaImage } from "react-icons/fa"
import { useState } from "react";

export default function CreateRecipe() {
    const [imageCount, setImageCount] = useState(0)


    return (
        <div className="flex flex-col">
            <form
                className="flex flex-col gap-2 self-center mt-4 lg:w-1/4"
                onSubmit={async e => {
                    e.preventDefault();

                    const { recipeName, recipeContent, recipeImage } = Object.fromEntries(new FormData(e.target));

                    console.log(recipeImage)

                    if (!recipeImage.size) {
                        alert("Please provide an image!");
                        return;
                    }

                    if (recipeImage.size / 10e6 >= 10) {
                        alert("Your image is too large (>10MB). Please provide a smaller image.")
                        return;
                    }

                    try {
                        const deso = new Deso(DesoConfig);

                        try {
                            await deso.user.getSingleProfile({
                                PublicKeyBase58Check: deso.identity.getUserKey()
                            });
                        } catch (e) {
                            console.error("error when getting profile for user who made post: ", e)
                            alert("Please create a profile before submitting a recipe.")
                            return
                        }

                        // Upload image to DeSo
                        const imageRes = await deso.media.uploadImage({
                            UserPublicKeyBase58Check: deso.identity.getUserKey(),
                            JWT: await deso.identity.getJwt(undefined),
                            file: recipeImage
                        });

                        const res = await deso.posts.submitPost({
                            UpdaterPublicKeyBase58Check: deso.identity.getUserKey(),
                            BodyObj: {
                                Body: `${PostFilterString}--${recipeContent}`,
                                VideoURLs: [],
                                ImageURLs: [imageRes.ImageURL]
                            },
                            PostExtraData: {
                                recipeName,
                            },
                        });

                        alert("Your recipe has been added!")
                    } catch (e) {
                        alert("Something went wrong. Please try again.")
                    }

                    // console.log(res)
                }}
            >
                <fieldset className="flex flex-col">
                    <label className="label">
                        <span className="label-text">Recipe Name</span>
                    </label>
                    <input type="text" name="recipeName" placeholder="Recipe name..." className="input input-bordered transition-all duration-150 py-2 px-4 rounded-lg" required />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label className="label">
                        <span className="label-text">Recipe Content</span>
                    </label>
                    <textarea name="recipeContent" className="textarea textarea-bordered p-3 rounded-lg" placeholder="Recipe content..." required></textarea>
                </fieldset>

                <fieldset className="flex flex-col">
                    <label className="label">
                        <span className="label-text">Image of Finished Product</span>
                    </label>
                    <input type="file" id="file" accept="image/png, image/jpeg" name="recipeImage" className="hidden" onChange={e => setImageCount(e.target.files.length)} />

                    <label for="file" className="bg-orange-500 h-8 border rounded w-full text-center border-orange-900 text-orange-900 text-l flex flex-wrap justify-center items-center">
                        {imageCount === 0 ? (
                            <>
                                <FaImage />

                                Upload Photos
                            </>
                        ) : (
                            <>
                                <FaImage />
                                {" "}
                                1 image
                            </>
                        )}

                    </label>
                </fieldset>

                <input type="submit" className='rounded-lg p-4 text-white bg-zinc-800 active:bg-zinc-600 transition-all duration-75 font-bold cursor-pointer' value="Submit" />
            </form>
        </div>
    )
}