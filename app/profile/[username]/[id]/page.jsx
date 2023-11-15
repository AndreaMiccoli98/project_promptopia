'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = ({ params }) => {

    const router = useRouter();

    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if (params.id) fetchPosts();
    }, []);

    return (
        <Profile
            name={params.username}
            desc={`Welcome to ${params.username}'s profile page`}
            data={posts}
            handleEdit={() => { }}
            handleDelete={() => { }}
        />
    )
}

export default ProfilePage;
