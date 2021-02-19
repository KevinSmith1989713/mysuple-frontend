import { useEffect } from "react";

const useBeforeUnload = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("beforeunload", handleClick);

    return () => {
      document.removeEventListener("beforeunload", handleClick);
    };
  });
};

export default useBeforeUnload;