import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: any;
};

const Portal  = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById("portal");
  if (!portalRoot) return null;

  return  createPortal(<div className="z-9999999 absolute w-full left-0 top-0 h-full">{children}</div>, portalRoot);
};

export default Portal;
