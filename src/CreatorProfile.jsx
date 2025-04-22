const CreatorProfile = ({ creator }) => {
    return (
      <>
        <h1>
          {creator.fname} {creator.lname}
        </h1>
        <img src={creator.image} alt="Creator" /> 
        <p>{creator.phone}</p>
        <p>{creator.email}</p>
        <p>{creator.cnic}</p>
        <p>{creator.camera}</p>
        <p>{creator.linktree}</p>
        <p>{creator.profiletype}</p>
        <p>{creator.budget}</p>
      </>
    );
  };
  
  export default CreatorProfile;
  