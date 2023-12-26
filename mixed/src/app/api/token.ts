import { JwtHeader, SigningKeyCallback } from "jsonwebtoken"
import jwksClient from "jwks-rsa"
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken";

const getPublicKey = async () => {
  const client = jwksClient({
    jwksUri: `https://${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW}/discovery/v2.0/keys`,
  })

  const getKey = async (header: JwtHeader, callback: SigningKeyCallback) => {
    const key = await client.getSigningKey(header.kid);
    const signingKey = key.getPublicKey();

    callback(null, signingKey);
  }

  return getKey;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID,
    NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
    NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW
  } = process.env;

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const getKey = await getPublicKey();

    const decoded = jwt.verify(token, getKey, {
      audience: NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID,
      issuer: `https://${NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW}/v2.0/`,
      algorithms: ["RS256"],
    });

    return res.status(200).json(decoded);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default handler;
