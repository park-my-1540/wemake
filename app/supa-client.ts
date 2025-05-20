import { createClient } from "@supabase/supabase-js";
import {
  createBrowserClient,
  parseCookieHeader,
  createServerClient,
  serializeCookieHeader,
} from "@supabase/ssr";

export const browserClient = createBrowserClient<any>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
/**
 * 하는 일 : supabase 클라이언트로 부터 쿠키를 포워딩 그래서 사용자가 요청을 보내면 서버 측 클라이언트를 만들게 되는것
 * 1. 유저의 요청을 보내면 (request)
 * 2. supabase 클라이언트가 어느 유저가 요청을 보냇는지 알수있음 (getAll)
 * 3. 계정생성, 로그인, 로그아웃 등의 일들을 하기 위해서 쿠키를 설정해줘야 함. => setAll 만듬
 *  supabase 클라이언트는 유저가 필요한 쿠키들을 헤더에 넣기 위해서 setAll 함수를 호출할것임.
 * set-Cookie 헤더를 주면 유저의 브라우저에 자동으로 쿠키를 만들어주기 때문
 * 4. supabase가 브라우저에 설정하고 싶어하는 쿠키들을 받아서 헤더안에 넣은 다음
 * 5. return 한다. => 헤더를 유저에게 돌려주면서 쿠키가 브라우저에 설정 될수 있도록
 */
export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<any, "public">(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(
            request.headers.get("Cookie") ?? ""
          );
          return cookies.map((cookie) => ({
            ...cookie,
            value: cookie.value ?? "",
          }));
        },

        /**
         * supabase가 쿠키를 설정하고 싶으면 setAll을 호출할것이고
         * 우린 그 쿠키들을 받아서 Set-Cookie 헤더 안에 넣어줌
         * serializeCookieHeader 를 사용해서 supabase가 보낸 쿠키를 브라우저에서 사용 할 수 있는
         * 쿠키로 변환
         */
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        }, // 여기서 받은 쿠키들을 유저에게 전달할 응답을 붙여주기만 하면 됨
      },
    }
  );

  /**
   * 쿠키를 가져와 헤더를 설정하고 사용자에게 줘야함. => serverSideClient와 헤더까지 함께 리턴
   * => why? 여기서 헤더를 만들고 쿠키를 설정한다고 하더라도, 이걸 유저에게 줘서 브라우저에 쿠키를 설정하게 하지 않으면 아무 의미가 없음(그래서 home-page.tsx에서 예시 보여준듯)
   *
   */

  return {
    client: serverSideClient,
    headers,
  };
};

// 이코드가 샐행된다면 클라이언트는 자동으로 브라우저의 쿠키에 접근한다.
// 클라이언트는 쿠키를 가져와서 쿠키에서 토큰을 추출하고 해당 토큰으로 supabase와 통신할것.
// 그리고 클라이언트가 응답을 받는다면, 우리가 getUser같은 함수를 사용할떄.
// client.auth.getUser

// 브라우저에서만 가능함. 하지만 지금 ssr로 이루어져서 어떻게 클라이언트가 어떤 유저가 로그인했는지 알 수 잇을까 브라우저에서 작동하지 않을때
// 해답 : 직접 브라우저로부터 쿠키를 가져와서, 클라이언트에게 전달해주자
/**
 * Browser
 * Client Cookies ------> Supabase Server  -----> Who is the user
 * 여긴 자동으로 되기 때문에 createClient만 만들어주기만 하면 끝 자동으로 전송
 * 
 * Server
 * Browser Send Cookies ----->  loader() receives cookies -----> supabase SSC (cookies) ---> Supbase Server --->  Who is the user?
우리가 서버에 있다면, 브라우저가 우리의 loader 함수에 쿠키를 보낼것임.
여기는 자동으로 일어나는 일. 웹이 작동하는 방식임. - 브라우저가 서버로 요청을 보낼 때 마다, 브라우저의 쿠키가 서버로 전송됨.

브라우저가 쿠키를 보내고 백엔드는 그 쿠키를 다시 받아서 db에서 그 쿠키를 가진 사용자를 검색해서 그 사용자의 정보를 알게된다.

supabase SSC (cookies 에서는  유저의 쿠키를 주는것 뿐 아니라 사용자의 쿠키를 수정할 수 있는 권한도 부여해줘야함.

해야할일은 중재자인것임.
우린 유저의 쿠키를 supabase 클라이언트에게 보내주고, supabase클라이언트가 쿠키를 설정하고 싶어한다면 쿠키를 설정할도록 도와줘야함. -> 백엔드에서 해야할 일임.
 */

// 이 클라이언트는 자동으로 특정 쿠키를 찾고, 쿠키를 사용하여 supabase와 통신해서,
//  쿠키를 사용하여 supabase와 통신해서, 누가 우리 애플리케이션을 사용하고 있는지 알아냄.
