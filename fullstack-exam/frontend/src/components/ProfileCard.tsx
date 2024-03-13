import User from "../types/User";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "../graphql/queries/UserByUsername";

interface ProfileCardProps {
    username: string | void;
}

function ProfileCard({ username }: ProfileCardProps) {

    const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
        variables: { username: username },
      });
    
    if (loading) return <p>Loading...</p>;
    if (error) throw error;

    const user: User = data.userByUsername;

    return ( 
        <div className="bg-blue shadow-md rounded-lg overflow-hidden">
                <img className="h-32 w-32 rounded-full mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"/>
                <h1 className="text-center text-3xl">{user.username}</h1>
                <p className="text-center text-sm">{user.email}</p>
                <p className="text-center text-sm">{user.roles}</p>
        </div>
     );
}

export default ProfileCard;