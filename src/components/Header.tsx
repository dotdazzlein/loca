import { useState } from "react";
import { useUser } from "../context/UserContext";
import UserProfile from "../common/UserProfile";
import { Link } from "react-router-dom";

const Header = () => {
  const { setSigninModal, user } = useUser();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <div className="flex h-16 items-center justify-between px-5 py-3">
        <Link to="/" className="text-2xl font-bold">Snack</Link>
        {user ? (
          <div
            className="w-10 h-10 cursor-pointer rounded-full overflow-hidden"
            onClick={() => setOpenProfile(true)} >
            <img src={user?.image || "/no-avatar.jpg"} alt="avatar" />
          </div>
        ) : (
          <button
            onClick={() => setSigninModal(true)}
            className="text-white cursor-pointer bg-primary rounded-3xl font-semibold px-5 py-2" >
            Login
          </button>
        )}
      </div>

      {/* ---- user profile modal -------- */}
      <UserProfile
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />

    </>
  );
};

export default Header;
