import NextAuth from "next-auth";
import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // For "/api/auth" pathnames function automatically returns
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  if (isApiAuthRoute) return;

  // If a user who wants to register pet (click on "register-pet" link)
  //  is not logged in, he or she is redirected to "login page" first with
  //   callback Url to "register-pet" in order to be automatcally redirected
  //    to "register-pet" page after logging in.
  const isRegisterPetRoute = nextUrl.pathname === "/pets/register-pet";
  if (isRegisterPetRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  const isEditPetsRoute = nextUrl.pathname === "/pets/delete-pets";
  if (isEditPetsRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
