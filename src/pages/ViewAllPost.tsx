import * as React from 'react';
import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardDetails,
    DocumentCardActivity,
    DocumentCardImage
} from '@fluentui/react/lib/DocumentCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@fluentui/react';
import { FaEye } from 'react-icons/fa';

const ViewPost: React.FunctionComponent = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const getAllPosts = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5022/api/Post/get-all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setPosts(response.data.posts);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    const handleClickViewDetails = (id: string) => {
        navigate(`/view-post/${id}`);
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ textAlign: 'center' }}>View All Blogs</h1>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'start',
                    width: '100%',
                }}
            >
                {posts?.map((postItem: any, index: number) => (
                    <DocumentCard
                        key={postItem._id || index}
                        aria-label="Post Card"
                        style={{
                            width: '600px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {postItem.imgUrl && (
                            <img src={postItem.imgUrl} style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                            }} alt="" />
                        )}
                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={postItem.title}
                                shouldTruncate={true}
                                styles={{ root: { whiteSpace: "wrap", display: "flex", flex: "wrap" } }}
                            />
                        </DocumentCardDetails>
                        <DocumentCardActivity
                            activity={`Posted on ${new Date(postItem.createdAt).toLocaleDateString()}`}
                            people={[
                                {
                                    name: postItem.user?.name || 'U',
                                    profileImageSrc: '',
                                    initials: postItem.user?.name?.charAt(0) || 'U'
                                }
                            ]}
                        />
                        <div style={{ padding: '5px', textAlign: 'right' }}>
                            <PrimaryButton onClick={() => handleClickViewDetails(postItem._id)}>
                                View&nbsp;<FaEye />
                            </PrimaryButton>
                        </div>
                    </DocumentCard>
                ))}
            </div>
        </div>
    );
};

export default ViewPost;
