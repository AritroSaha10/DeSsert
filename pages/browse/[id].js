import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import DesoConfig from '../../lib/DesoConfig';
import Deso from "deso-protocol"
import PostFilterString from '../../lib/PostFilterString';

export default function RecipeView() {
  const router = useRouter();

  const { id } = router.query

  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        console.log("Router query:", router.query)
        console.log("ID:", id)
        if (id === undefined) {
          setError(true);
          return;
        }

        console.log("error before", error);

        const deso = new Deso(DesoConfig);

        try {
          const postObj = (await deso.posts.getSinglePost({ PostHashHex: id })).PostFound;
          console.log(postObj)

          let username = postObj.PosterPublicKeyBase58Check.slice(0, 10);
          let avatar = "/images/default-pfp.jpg";

          try {
            deso.user.getSingleProfilePicture(postObj.PosterPublicKeyBase58Check);
          } catch (e) {
            console.error("Error when getting profile pic for author", e);
          }

          if (postObj.ProfileEntryResponse && postObj.ProfileEntryResponse.Username) {
            username = postObj.ProfileEntryResponse.Username;
          }

          const post = {
            name: postObj.PostExtraData.recipeName,
            content: postObj.Body.replace(`${PostFilterString}--`, ""),
            thumbnail: "",
            author: {
              username: username,
              avatar: avatar
            },
            id: postObj.PostHashHex
          }

          // console.table(post);
          setPost(post);
        } catch (e) {
          console.error(e);
          setError(true);
          return;
        }
        console.log("error after", error)
      })()
    }
  }, [router.isReady])

  if (error) {
    // router.push("/404")
    return <h1 className='text-red-500'>Nooooo</h1>
  }

  console.log(post)
  return post && (
    <div className='h-full p-4'>
      <h1 className='text-2xl mb-2'>{post.name}</h1>
      <p className='whitespace-pre'>{post.content}</p>
    </div>
  )
}