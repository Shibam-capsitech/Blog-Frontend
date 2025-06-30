import * as React from 'react';
import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardDetails,
    DocumentCardActivity,
} from '@fluentui/react/lib/DocumentCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Router, useNavigate, useNavigation } from 'react-router-dom';
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

    const showLimitedChar =( desc: string)=>{
        return `${desc.slice(0,280)}...`
    }

    const handleClickViewDetails =(id:string)=>{
        navigate(`/view-post/${id}`)
    }
    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ textAlign: 'center' }}>View All Blogs</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', flexDirection: "column", width: "100%", alignItems: "center" }}>
                {posts?.map((postItem: any, index: number) => (
                    <DocumentCard
                        key={postItem._id || index}
                        aria-label="Post Card"
                        style={{ minWidth: "900px", height: "max" }}
                    >
                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={postItem.title}
                                shouldTruncate={true}
                            />
                            <p style={{ padding: "0 12px" }}>
                               {showLimitedChar(postItem.description)}
                            </p>
                            {/* <div style={{ padding: "0 12px", fontSize: "13px", color: "#666" }}>
                                <strong>Author:</strong> {postItem.user?.name}<br />
                                <strong>Email:</strong> {postItem.user?.email}<br />
                                <strong>City:</strong> {postItem.user?.city}
                            </div> */}
                        </DocumentCardDetails>
                        <DocumentCardActivity
                            activity={`Posted on ${new Date(postItem.createdAt).toLocaleDateString()}`}
                            people={[{ name: postItem.user?.name, profileImageSrc: '', initials: postItem.user?.name?.charAt(0) }]}
                        />
                        <div style={{ display: "flex", justifyContent: "end", }}>
                            
                            <PrimaryButton
                            onClick=
                                {() => handleClickViewDetails(postItem._id)}
                            
                            >View Details &nbsp; 
                            <FaEye/>
                            </PrimaryButton>
                        </div>

                    </DocumentCard>
                ))}
            </div>
        </div>
    );
};

export default ViewPost;
