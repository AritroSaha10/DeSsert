import Deso from "deso-protocol";
import DesoConfig from "../lib/DesoConfig";
import PostFilterString from "../lib/PostFilterString";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import MetaInfo from "../components/MetaInfo";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CreateRecipe() {
    const [imageCount, setImageCount] = useState(0);
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeInstructions, setRecipeInstructions] = useState("");

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const { recipeName, recipeDescription, recipeImage } =
            Object.fromEntries(new FormData(e.target));

        // Make sure none of them are empty
        if (!recipeIngredients.trim() || !recipeInstructions.trim()) {
            alert("Please provide recipe ingridients and instructions!");
            return;
        }

        if (!recipeImage.size) {
            alert("Please provide an image!");
            return;
        }

        if (recipeImage.size / 10e6 >= 10) {
            alert(
                "Your image is too large (>10MB). Please provide a smaller image."
            );
            return;
        }

        try {
            const deso = new Deso(DesoConfig);

            try {
                await deso.user.getSingleProfile({
                    PublicKeyBase58Check: deso.identity.getUserKey(),
                });
            } catch (e) {
                console.error(
                    "error when getting profile for user who made post: ",
                    e
                );
                alert("Please create a profile before submitting a recipe.");
                return;
            }

            // Upload image to DeSo
            const imageRes = await deso.media.uploadImage({
                UserPublicKeyBase58Check: deso.identity.getUserKey(),
                JWT: await deso.identity.getJwt(undefined),
                file: recipeImage,
            });

            const res = await deso.posts.submitPost({
                UpdaterPublicKeyBase58Check: deso.identity.getUserKey(),
                BodyObj: {
                    Body: `${PostFilterString}--${recipeInstructions}`,
                    VideoURLs: [],
                    ImageURLs: [imageRes.ImageURL],
                },
                PostExtraData: {
                    recipeName,
                    recipeIngredients,
                    recipeDescription,
                },
            });

            alert("Your recipe has been added!");

            router.push(`/browse/${res.PostHashHex}`);
        } catch (e) {
            alert("Something went wrong. Please try again.");
        }

        // console.log(res)
    };

    return (
        <div className="flex flex-col">
            <MetaInfo name="Compose" />

            <form
                className="flex flex-col gap-2 self-center mt-4 w-full p-16 pt-4 xl:w-5/6"
                onSubmit={onSubmit}
            >
                <fieldset className="flex flex-col">
                    <label className="label mb-2">
                        <span className="label-text">Recipe Name</span>
                    </label>
                    <input
                        type="text"
                        name="recipeName"
                        placeholder="Recipe name..."
                        className="input input-bordered transition-all duration-150 py-2 px-4 rounded-lg"
                        required
                    />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label className="label mb-2">
                        <span className="label-text">Recipe Description</span>
                    </label>
                    <textarea
                        name="recipeDescription"
                        placeholder="Recipe description..."
                        className="input input-bordered transition-all duration-150 p-4 rounded-lg"
                        required
                    />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label className="label mb-2">
                        <span className="label-text">
                            Recipe Materials &amp; Ingredients
                        </span>
                    </label>
                    <MDEditor
                        value={recipeIngredients}
                        onChange={setRecipeIngredients}
                    />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label className="label mb-2">
                        <span className="label-text">Recipe Instructions</span>
                    </label>
                    <MDEditor
                        value={recipeInstructions}
                        onChange={setRecipeInstructions}
                    />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label className="label mb-2">
                        <span className="label-text">
                            Image of Finished Product
                        </span>
                    </label>
                    <input
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg"
                        name="recipeImage"
                        className="hidden"
                        onChange={(e) => setImageCount(e.target.files.length)}
                    />

                    <label
                        for="file"
                        className="bg-orange-500 p-4 border rounded w-full text-center border-orange-900 text-orange-900 text-l flex flex-wrap justify-center items-center"
                    >
                        <FaImage className="mr-2" />
                        {imageCount === 0 ? "Upload Photos" : "1 image"}
                    </label>
                </fieldset>

                <input
                    type="submit"
                    className="rounded-lg p-4 text-white bg-zinc-800 active:bg-zinc-600 transition-all duration-75 font-bold cursor-pointer"
                    value="Submit"
                />
            </form>
        </div>
    );
}
