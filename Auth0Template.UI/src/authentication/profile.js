import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const audience = "https://auth0template/";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: audience,
                    scope: "read:messages",
                });

                const userDetailsByIdUrl = `https://localhost:7137/Test/private-scoped`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const responseMessage = await metadataResponse.text();

                setUserMetadata(responseMessage);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <h3>User Metadata</h3>
                {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                ) : (
                    "No user metadata defined"
                )}
            </div>
        )
    );
};

export default Profile;