// import React from 'react';

// const Signup = (props) => {
//     const { renderInput, handleSubmit } = props;
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
     
//         {renderInput("email", "Email")}
//         {renderInput("password", "Password", "password")}
//         <button className="btn btn-primary"> Signup </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React from 'react';


const Signup = ({ renderInput, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderInput("name", "Name")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
     

        <button className="btn btn-primary"> SignUp </button>
      </form>
  
    </div>
  );
};

export default Signup;