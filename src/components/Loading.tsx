"use client";

import { RotatingLines } from "react-loader-spinner";
import { useLayoutStore } from "../store/useLayoutStore";
import { useUserStore } from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { User } from "../types/user";
import { SiteConfig } from "../types/config";
import api from "../lib/api";
import { useEffect } from "react";

export default function Loading() {
  const setSiteConfig = useLayoutStore((state) => state.setSiteConfig);
  const setLayoutLoading = useLayoutStore((state) => state.setLoading);

  const setUser = useUserStore((state) => state.setUser);
  const setUserLoading = useUserStore((state) => state.setLoading);

  const hasToken = !!Cookies.get("accessToken");

  const {
    data: user,
    isLoading: isUserLoading,
    isFetched: isUserFetched,
  } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: () => api.get("/auth/profile").then((res) => res.data.data.user),
    enabled: hasToken,
  });

  const {
    data: config,
    isLoading: isConfigLoading,
    isFetched: isConfigFetched,
  } = useQuery<SiteConfig>({
    queryKey: ["settings"],
    queryFn: () => api.get("/settings").then((res) => res.data.data),
  });

  useEffect(() => {
    if (config) {
      setSiteConfig(config);
    }

    if (user) {
      setUser(user);
    }

    if (!hasToken || isUserFetched) {
      setUserLoading(false);
    }

    if (isConfigFetched) {
      setLayoutLoading(false);
    }
  }, [
    config,
    user,
    hasToken,
    isUserFetched,
    isConfigFetched,
    setSiteConfig,
    setUser,
    setUserLoading,
    setLayoutLoading,
  ]);

  const loading = isConfigLoading || (hasToken && isUserLoading);

  if (!loading) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <RotatingLines
        visible={true}
        width="45"
        strokeColor="#22d3ee"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}
