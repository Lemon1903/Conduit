import { useParams } from "react-router";

function Profile() {
  const { username } = useParams();
  
  return (
    <div>Profile: {username}</div>
  )
}

export default Profile