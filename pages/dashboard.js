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
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      // Get all recipes
      const myDeso = new Deso(DesoConfig);
      const response = await myDeso.posts.getPostsStateless({ PostContent: PostFilterString, NumToFetch: 100 });
      console.log("Posts", response.PostsFound);

      let allPosts = [];

      response.PostsFound.forEach(postObj => {
        let username = postObj.PosterPublicKeyBase58Check.slice(0, 10);
        let avatar = myDeso.user.getSingleProfilePicture(postObj.PosterPublicKeyBase58Check);

        if (postObj.ProfileEntryResponse && postObj.ProfileEntryResponse.Username) {
          username = postObj.ProfileEntryResponse.Username;
        }

        allPosts.push({
          name: postObj.PostExtraData.recipeName,
          content: postObj.Body.replace(`${PostFilterString}--`, ""),
          thumbnail: postObj.ImageURLs.length === 1 ? postObj.ImageURLs[0] : null,
          author: {
            username: username,
            avatar: avatar
          },
          id: postObj.PostHashHex
        })
      })

      console.log(allPosts)

      setRecipes(allPosts)
    })();

    (async () => {
      // Getting user's recipes
      const myDeso = new Deso(DesoConfig);

      if (!myDeso.identity.getUserKey()) {
        return
      }

      try {
        const response = await myDeso.posts.getPostsForPublicKey({
          PublicKeyBase58Check: myDeso.identity.getUserKey(),
          ReaderPublicKeyBase58Check: myDeso.identity.getUserKey(),
          NumToFetch: 100
        })

        console.log("My Posts (raw)", response.Posts);

        const { Profile } = await myDeso.user.getSingleProfile({
          PublicKeyBase58Check: myDeso.identity.getUserKey()
        });


        let myPosts = [];

        response.Posts.forEach(postObj => {
          let username = Profile.Username ? Profile.Username : postObj.PosterPublicKeyBase58Check.slice(0, 10);
          let avatar = myDeso.user.getSingleProfilePicture(postObj.PosterPublicKeyBase58Check);

          if (!postObj.Body.includes(PostFilterString)) {
            // Not a recipe post
            return;
          }

          myPosts.push({
            name: postObj.PostExtraData.recipeName,
            content: postObj.Body.replace(`${PostFilterString}--`, ""),
            thumbnail: postObj.ImageURLs ? postObj.ImageURLs[0] : null,
            author: {
              username: username,
              avatar: avatar
            },
            id: postObj.PostHashHex
          })
        })

        console.log(myPosts)

        setUserRecipes(myPosts)
      } catch (e) {
        // User probably hasn't posted anything yet or doesn't exist...
        console.error(e)
        return;
      }
    })();

    if (!window.localStorage.getItem('deso_user_key')) {
      router.push("/")
    }
  }, [])


  return (
    <div>
      <p>My recipes</p>
      {userRecipes.length ? (
        <div className='grid grid-cols-responsive gap-8 p-4 pb-0'>
          {userRecipes.map((post) => <RecipePostCard {...post} key={post.id} />)}
        </div>
      ) : (
        <h2 className='text-center text-xl my-6'>There seem to be no recipes by you...</h2>
      )}

      <Friends />

      {recipes.length ? (
        <div className='grid grid-cols-responsive gap-8 p-4'>
          {recipes.map((post) => <RecipePostCard {...post} key={post.id} />)}
        </div>
      ) : (
        <h2 className='text-center text-xl my-6'>There seem to be no recipes...</h2>
      )}
    </div>


  )
}


