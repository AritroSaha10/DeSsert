import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Deso from 'deso-protocol'
import DesoConfig from '../lib/DesoConfig';
import PostFilterString from '../lib/PostFilterString';
import Friends from '../components/friends'
import RecipePostCard from '../components/RecipePostCard';

export default function Dashboard() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      /* Getting Recipes from here */
      const myDeso = new Deso(DesoConfig);
      const response = await myDeso.posts.getPostsStateless({ PostContent: PostFilterString, NumToFetch: 300 });
      console.log("Posts", response.PostsFound);

      let posts = [];

      response.PostsFound.forEach(postObj => {
        let username = postObj.PosterPublicKeyBase58Check.slice(0, 10);
        let avatar = myDeso.user.getSingleProfilePicture(postObj.PosterPublicKeyBase58Check);

        if (postObj.ProfileEntryResponse && postObj.ProfileEntryResponse.Username) {
            username = postObj.ProfileEntryResponse.Username;
        }


        posts.push({
          name: postObj.PostExtraData.recipeName,
          content: postObj.Body.replace(`${PostFilterString}--`, ""),
          thumbnail: "",
          author: {
            username: username,
            avatar: avatar
          },
          id: postObj.PostHashHex
        })
      })

      console.log(posts)

      setRecipes(posts)
    })();

    if (!window.localStorage.getItem('deso_user_key')) {
      router.push("/")
    }
  }, [])


  return (
    <div>
      <p>My recipes</p>
      <Friends />

      <div className='grid grid-cols-responsive gap-8 p-4'>
        {recipes.map((post) => <RecipePostCard {...post} key={post.id} />)}
      </div>
    </div>


  )
}


