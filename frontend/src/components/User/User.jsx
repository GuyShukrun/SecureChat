import "./user.css";

export default function User({ user }) {
  if (user) {
    return (
      <>
        <div className="conversation bg-white">
          <img
            className="profile-img rounded-circle"
            src={user?.profilePicture}
            alt=""
          />
          <div className="conversation-user-text bg-white ">
            <h6 className="bg-white user-fullname">{user?.fullname}</h6>
          </div>
        </div>
        <hr />
      </>
    );
  } else return null;
}
