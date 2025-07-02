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
  MessageBarType,
  TextField,
  PrimaryButton
} from '@fluentui/react';
import { useParams } from 'react-router-dom';
import GetCurrentUserDetails from '../utils/GetCurrentUserDetails';

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    username?: string; // if needed
  };
}

interface postDetails {
  title: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
  user: {
    name: string;
    username: string;
    city: string;
  };
  comment: Comment[];
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

  const [comment, setComment] = useState("");
  const [makeCommentVisible, setMakeCommentVisible] = useState(false)
  const handleAddComment = async () => {
    if (!comment) return;

    const payload = {
      postId: params.id,
      content: comment,
    };

    try {
      const response = await axios.post(`${API_URL}/Comment/create`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log("here")
        setMakeCommentVisible((prev)=>!prev)
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchPostDetails();
  }, [makeCommentVisible]);


  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20, maxWidth: 1000, margin: 'auto' } }}>
      <Text variant="xxLarge">{post?.title}</Text>
      <img src={post?.imageUrl} alt="" style={{ height: "400px" }} />
      <Text variant="large">{post?.description}</Text>

      <Separator />

      <Persona
        text={post?.user.name}
        secondaryText={`@${post?.user.username}`}
        tertiaryText={post?.user.city}
        size={PersonaSize.size40}
      />

      <Text variant="small">Posted on: {new Date(post?.createdAt).toLocaleString()}</Text>

      {/* {post?.comment && post?.comment.length > 0 && ( */}
      <>
        <Separator />
        <Text variant="small">Comments</Text>

        <TextField multiline resizable={false} onChange={(e, newValue: any) => setComment(newValue)} />
        <Stack styles={{ root: { display: "flex", justifyContent: "end", alignItems: "end" } }}>
          <PrimaryButton
            onClick={handleAddComment}
          >Add Comment</PrimaryButton>
        </Stack>

        {post?.comment.map((c) => (
          <Stack key={c._id} tokens={{ childrenGap: 8 }} styles={{ root: { background: '#f3f2f1', padding: 10, borderRadius: 4, marginTop: 10 } }}>
            <Persona
              text={c?.user?.name}
              secondaryText={`@${c?.user?.username}`}
              size={PersonaSize.size32}
            />
            <Text variant="small">{c?.content || <i>No comment text</i>}</Text>
            <Text variant="tiny">Commented on: {new Date(c.createdAt).toLocaleString()}</Text>
          </Stack>
        ))}
      </>
      {/* )} */}
    </Stack>
  );
};

export default PostDetails;
