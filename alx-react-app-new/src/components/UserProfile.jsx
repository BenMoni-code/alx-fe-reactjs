const UserProfile = (props) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        margin: '10px 0',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ color: '#1e90ff', marginBottom: '10px' }}>{props.name}</h2>
      <p style={{ margin: '5px 0' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ margin: '5px 0' }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
