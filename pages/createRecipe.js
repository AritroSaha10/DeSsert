export default function CreateRecipe() {
    return (
        <div className="flex flex-col ">
            <form
                className="flex flex-col gap-2 self-center mt-4 lg:w-1/4"
                onSubmit={e => {
                    e.preventDefault();

                    console.log(e)
                }}
            >
                <div className="flex flex-col">
                    <label className="label">
                        <span className="label-text">Recipe Name</span>
                    </label>
                    <input type="text" placeholder="Recipe name..." className="input input-bordered transition-all duration-150 py-2 px-4 rounded-lg" />
                </div>

                <div className="flex flex-col">
                    <label className="label">
                        <span className="label-text">Recipe Content</span>
                    </label>
                    <textarea className="textarea textarea-bordered p-3 rounded-lg" placeholder="Recipe content..."></textarea>
                </div>

                <input type="submit" className='rounded-lg p-4 text-white bg-zinc-800 active:bg-zinc-600 transition-all duration-75 font-bold cursor-pointer' value="Submit" />
            </form>
        </div>
    )
}