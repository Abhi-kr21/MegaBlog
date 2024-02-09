import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const authstatus=useSelector((state)=>{
       
        return state.auth.status})


    useEffect( () => {
       
         appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if(!authstatus){
      return ( <div className="w-full py-8  text-center h-3/5">
      <Container>
          <div className="flex flex-wrap ">
              <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                     Login to read post
                  </h1>
              </div>
          </div>
      </Container>
  </div>)
    }
    if (authstatus&&posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                no post to read
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home