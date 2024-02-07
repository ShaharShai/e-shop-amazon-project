import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "../imports.js"

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/reset/reset-password", { token, newPassword });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.warn(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred while resetting the password.");

    }
  };

//   useEffect(() => {
//     console.log("Token:", token);
//   }, [token]);

  return (
    <div>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
