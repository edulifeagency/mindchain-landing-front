import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthModal } from "../components/AuthModal";
import { useUserStore } from "../store/useUserStore";

export const ReferralPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const referralCode = searchParams.get("id");

    if (!referralCode) {
      navigate("/", { replace: true });
      return;
    }

    if (user) {
      navigate("/", { replace: true });
      return;
    }

    setIsAuthOpen(true);
  }, [searchParams, user, navigate]);

  return (
    <AuthModal
      isOpen={isAuthOpen}
      initialMode="signup"
      onClose={() => navigate("/", { replace: true })}
      onSuccess={() => navigate("/", { replace: true })}
    />
  );
};
