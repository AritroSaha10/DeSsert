import { useState, useEffect } from 'react'
import Deso from 'deso-protocol'
import DesoConfig from '../lib/DesoConfig';
import PostFilterString from '../lib/PostFilterString';

export default function Dashboard() {
  const [recipes, setRecipes] = useState([]);

  const createRecipe = (formData) => {
    const data = Object.fromEntries(new FormData(formData));
    console.log(data)
  }

  useEffect(() => {
    (async () => {
      /* Getting Recipees from here */
      const myDeso = new Deso(DesoConfig);
      const response = await myDeso.posts.getPostsStateless({ PostContent: PostFilterString });
      console.log(response);
    })();
  }, [])

  return (
    <div>My recipes</div>
  )
}
