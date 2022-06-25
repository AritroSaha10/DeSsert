import Deso from "deso-protocol";
import DesoConfig from "../lib/DesoConfig";
import PostFilterString from "../lib/PostFilterString";

export default function CreateRecipe() {
    return (
        <div className="flex flex-col">
            <form
                className="flex flex-col gap-2 self-center mt-4 lg:w-1/4"
                onSubmit={async e => {
                    e.preventDefault();

                    const { recipeName, recipeContent } = Object.fromEntries(new FormData(e.target));


                    try {
                        const deso = new Deso(DesoConfig);
                        const res = await deso.posts.submitPost({
                            UpdaterPublicKeyBase58Check: window.localStorage.getItem("deso_user_key"),
                            BodyObj: {
                                Body: `${PostFilterString}--${recipeContent}`,
                                VideoURLs: [],
                                ImageURLs: []
                            },
                            PostExtraData: {
                                recipeName
                            }
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

                <input type="submit" className='rounded-lg p-4 text-white bg-zinc-800 active:bg-zinc-600 transition-all duration-75 font-bold cursor-pointer' value="Submit" />
            </form>
        </div>
    )
}