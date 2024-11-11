// // components/ProtectedRoute.js
// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";

// const ProtectedRoute = ({ exemptedRoutes, children }) => {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       // Redirect to login if no token is present
//       router.push("/login");
//       return;
//     }

//     const decodedToken = jwtDecode(token);

//     // Redirect if user doesn't match exempted route conditions
//     if (!exemptedRoutes.includes(decodedToken.userType)) {
//       router.push("/login");
//     }
//   }, [router, exemptedRoutes]);

//   return children;
// };

// export default ProtectedRoute;
