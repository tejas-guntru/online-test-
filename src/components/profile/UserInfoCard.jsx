const UserInfoCard = ({ user }) => {
  return (
    <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
    </div>
  );
};

export default UserInfoCard;
