import * as jose from 'jose'
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
function CallbackPage() {
  const [searchParams] = useSearchParams();


  useEffect(() => {
    async function generatePubKey() {
      const code = searchParams.get("code");
      console.log(code);
      const alg = 'ES256'
      const privateJwk = { crv: 'P-256', d: 'u-tH-27uBwv0Bry-MMQZO0xNq-3mmMpEMzI9dsWrFwk', kty: 'EC', x: 'lDLBk4ohdbJZ7oMaknrKutgnlAzx3bjOa_GDIBM_miA', y: 'U7_iImOHaFig_lYwcWVBDpOszv05Bfn7YVYRBkwnS8Y', use: 'sig', kid: "sig-2021-01-15T12:09:06Z"};
      const publicJwk = { crv: 'P-256', kty: 'EC', x: 'lDLBk4ohdbJZ7oMaknrKutgnlAzx3bjOa_GDIBM_miA', y: 'U7_iImOHaFig_lYwcWVBDpOszv05Bfn7YVYRBkwnS8Y', use: 'sig', kid: "sig-2021-01-15T12:09:06Z" };
      const dppJwksFormat = [publicJwk];
      const privateKeyToSign = await jose.importJWK(privateJwk, alg)
      const publicKeyToVerify = await jose.importJWK(publicJwk, alg)
      console.log(privateJwk)

      console.log(JSON.stringify({ keys: dppJwksFormat }))

      const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg: alg, kid: "sig-2021-01-15T12:09:06Z", type: "JWT" })
        .setIssuedAt(Math.floor(Date.now() / 1000))
        .setSubject('GHJxWcqnnxqCHsmVFeTkY1W6I95wtYze')
        .setIssuer('GHJxWcqnnxqCHsmVFeTkY1W6I95wtYze')
        .setAudience('https://stg-id.singpass.gov.sg')
        .setExpirationTime(Math.floor(Date.now() / 1000) + 100)
        .sign(privateKeyToSign)

      console.log(jwt);
    
      const { payload, protectedHeader } = await jose.jwtVerify(jwt, publicKeyToVerify, {})
      console.log(payload);
      console.log(protectedHeader);
      if (code) {
        const param = processSearchParam({
          client_id: 'GHJxWcqnnxqCHsmVFeTkY1W6I95wtYze',
          grant_type: 'authorization_code',
          redirect_uri: 'https://heehehooo.netlify.app/callback',
          code: code,
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          client_assertion: jwt
        });
        const host = 'https://stg-id.singpass.gov.sg/token';

        await fetch(host, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1'
          },
          body: param
        })
          .then(response => response.json())
          .then(response => console.log(JSON.stringify(response)))
      }

    }
    generatePubKey();
  }, [searchParams])

  const processSearchParam = (p: Record<string, string>) => {
    return new URLSearchParams(p);
  }
  
  return (
    <div>
      Callback
    </div>
  );
}

export default CallbackPage;