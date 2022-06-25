import Link from "next/link"

const RecipePostCard = ({ name, content, thumbnail, author, id }) => {
    return (
        <div>
            <Link href={`/browse/${id}`}>
                <div className='bg-orange-400 rounded-lg overflow-hidden w-full p-4 shadow-md cursor-pointer'>
                    {thumbnail && <img src={thumbnail} alt={name} />}
                    <div clasName='p-4 bg-zinc-800'>
                        <h1 className="text-2xl font-semibold mb-1">{name}</h1>
                        <p className="mb-4">{content.slice(0, 20)}...</p>
                        <div className='flex items-center justify-start space-x-2'>
                            <img src={author.avatar} alt={author.username} className='h-8 w-8 rounded-full object-cover' />
                            <h3>{author.username}</h3>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RecipePostCard

// username, profilePic