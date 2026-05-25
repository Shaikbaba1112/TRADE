// import { useState } from "react";
// import axios from "axios";

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       alert(res.data.message);
//       console.log(res.data);

//     } catch (error) {
//       console.log(error);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950">
//       <form
//         onSubmit={handleLogin}
//         className="bg-slate-800 p-8 rounded-xl w-96"
//       >
//         <h2 className="text-3xl text-white mb-6">Sign In</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-blue-600 p-3 rounded text-white">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signin;