import React, { useEffect, useState } from "react";
import { Apis } from "../../config";

export default function SocialLogin() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (windowWidth > 7) {
    return true;
  }
  return (
    <div className="d-flex p-2 mb-3">
      <a
        className="btn btn-block btn-sm btn-soft-google transition-3d-hover ml-1 mt-0"
        href={Apis.GetUserGoogleLogin}
      >
        <span className="fab fa-google mr-1" />
        Google
      </a>
    </div>
  );
}
