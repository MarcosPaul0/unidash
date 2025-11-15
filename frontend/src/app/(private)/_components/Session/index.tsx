"use client";

import { COOKIES, Cookies } from "@unidash/lib/cookies";
import { JwtDecode } from "@unidash/lib/jwtDecode";
import { AuthCSService } from "@unidash/services/auth/auth.cs.service";
import { useAuthStore } from "@unidash/store/auth.store";
import { useEffect } from "react";

export function Session() {
  const { setSession, clearSession } = useAuthStore();

  useEffect(() => {
    (async () => {
      const token = await Cookies.get(COOKIES.token);

      if (!token) {
        clearSession();
        return;
      }

      const tokenDecoded = JwtDecode.decode(token);

      if (!tokenDecoded) {
        clearSession();
        return;
      }

      const sessionResponse = await AuthCSService.getSessionByRole(
        tokenDecoded.userRole
      );

      setSession(sessionResponse.session, sessionResponse.teacherCourses);
    })();
  }, [setSession, clearSession]);

  return null;
}
