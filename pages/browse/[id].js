import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import getRecipe from "../../lib/GetRecipe";
import ReactMarkdown from "react-markdown";
import MetaInfo from "../../components/MetaInfo";

export default function RecipeView() {
    const router = useRouter();

    const { id } = router.query;

    const [post, setPost] = useState({
        name: "Loading...",
        description: "Loading...",
        ingredients: "Loading...",
        content: "Loading...",
        thumbnail: null,
        author: {
            username: "An interesting username...",
            avatar: "/images/default-pfp.jpg",
        },
        id: null,
        likes: 0
    });

    const [error, setError] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            (async () => {
                if (id === undefined) {
                    setError(true);
                    return;
                }

                try {
                    setPost(await getRecipe(id));
                } catch (e) {
                    console.error(e);
                    setError(true);
                }
            })();
        }
    }, [router.isReady]);

    if (error) {
        return <h1 className="text-red-500">Error</h1>;
    }

    console.log(post);
    return post ? (
        <div className="h-full p-4 m-auto flex">
            <MetaInfo name={post.name ? post.name : "Recipe"} />
            <section className="flex flex-col bg-white mx-auto my-4 p-4 lg:p-8 w-full max-w-[700px] rounded-2xl shadow-lg">
                <Link href="/dashboard">
                    <p className="flex flex-row gap-1 items-center text-blue-500 hover:underline active:text-blue-700 cursor-pointer mb-2">
                        <IoArrowBack /> Go Back
                    </p>
                </Link>

                {post.thumbnail && (
                    <Image
                        src={post.thumbnail}
                        alt={post.name}
                        className="w-full rounded-lg self-center"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={400}
                        priority
                    />
                )}
                <div className={`mt-4 ${!post.id && "animate-pulse blur-md"}`}>
                    <div className="flex flex-row items-center gap-2 mb-2">
                        <Image
                            src={post.author.avatar}
                            width={30}
                            height={30}
                            className="rounded-full"
                            objectFit="cover"
                            objectPosition="center"
                        />
                        <p>{post.author.username}</p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold">
                        {post.name}
                    </h1>

                    <p className="mb-6">{post.likes} like(s)</p>

                    {post.ingredients ? (
                        <>
                            <h3 className="text-2xl">
                                Materials and Ingredients
                            </h3>
                            <hr className="my-2" />

                            <ReactMarkdown className="react-markdown">
                                {post.ingredients}
                            </ReactMarkdown>

                            <br />
                        </>
                    ) : (
                        <></>
                    )}

                    <h3 className="text-2xl">Instructions</h3>
                    <hr className="my-2" />
                    <ReactMarkdown className="react-markdown">
                        {post.content}
                    </ReactMarkdown>
                </div>
            </section>
        </div>
    ) : (
        <div>...</div>
    );
}
