/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessageFromError } from "functions/handleErrors";

import AuthService from "services/auth.service";
import { logout } from "store/actions/auth.action";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";
import { Button } from "@mui/material";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await AuthService.changePassword(oldPassword, newPassword, user.user.email)
      .then((res) => {
        dispatch(showSuccessSnackbar(res.data.msg));
        dispatch(logout());
      })
      .catch((error) => {
        const message = getMessageFromError(error);
        dispatch(showErrorSnackbar(message));
      });
    setLoading(false);
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="change-password">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old password</label>
          <input
            type="password"
            // placeholder="Old password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            minLength={6}
            maxLength={30}
          />
        </div>
        <div>
          <label>New password</label>
          <input
            type="password"
            // placeholder="New password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            maxLength={30}
          />
        </div>
        <div>
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button type="submit">Change</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
