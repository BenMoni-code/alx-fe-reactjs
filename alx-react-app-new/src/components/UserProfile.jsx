const UserProfile = (props) => {
  return (
    <div style={{ border: '2px solid #007bff', borderRadius: '10px', padding: '20px', margin: '20px', backgroundColor: '#f8f9fa', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#007bff', marginTop: '0', fontSize: '1.8rem', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>{props.name}</h2>
      <p style={{ fontSize: '1.1rem', margin: '10px 0' }}>Age: <span style={{ fontWeight: 'bold', color: '#28a745' }}>{props.age}</span></p>
      <p style={{ fontSize: '1.1rem', margin: '10px 0', lineHeight: '1.6' }}>Bio: <span style={{ fontStyle: 'italic', color: '#6c757d' }}>{props.bio}</span></p>
    </div>
  );
};

export default UserProfile;

