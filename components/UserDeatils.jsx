const UserDetails = ({ user }) => {
    return (
      <div>
        <h1>User Details</h1>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>

      </div>
    );
  };
  
  export default UserDetails;
  