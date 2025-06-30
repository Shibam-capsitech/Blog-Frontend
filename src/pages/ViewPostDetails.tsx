import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Stack,
  Text,
  Persona,
  PersonaSize,
  Separator,
  Spinner,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import { useParams } from 'react-router-dom';

interface postDetails{
  title:string
  description:string,
  createdAt: string,
  user:{
    name:string,
    username:string,
    city:string
  }
  comment:[
    _id:string,
    text:string,
    createdAt:Date,
    user:{
      name:string,
      
    }
  ]
}
const PostDetails = () => {
  const [post, setPost] = useState<postDetails>();
  const params = useParams();
  const API_URL = 'http://localhost:5022/api';

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/Post/get/${params.id}`)
      setPost(response.data.post)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log("hello")
    fetchPostDetails();
  }, []);


  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20, maxWidth: 1000, margin: 'auto' } }}>
      <Text variant="xxLarge">{post?.title}</Text>
      <Text variant="mediumPlus">{post?.description}</Text>

      <Separator />

      <Persona
        text={post?.user.name}
        secondaryText={`@${post?.user.username}`}
        tertiaryText={post?.user.city}
        size={PersonaSize.size40}
      />

      <Text variant="small">Posted on: {new Date(post?.createdAt).toLocaleString()}</Text>

      {post?.comment && post?.comment.length > 0 && (
        <>
          <Separator />
          <Text variant="large">Comments</Text>
          {post?.comment.map((c) => (
            <Stack key={c._id} tokens={{ childrenGap: 8 }} styles={{ root: { background: '#f3f2f1', padding: 10, borderRadius: 4, marginTop: 10 } }}>
              <Persona
                text={c.user.name}
                secondaryText={`@${c.user.username}`}
                size={PersonaSize.size32}
              />
              <Text variant="small">{c.text || <i>No comment text</i>}</Text>
              <Text variant="tiny">Commented on: {new Date(c.createdAt).toLocaleString()}</Text>
            </Stack>
          ))}
        </>
      )}
    </Stack>
  );
};

export default PostDetails;
