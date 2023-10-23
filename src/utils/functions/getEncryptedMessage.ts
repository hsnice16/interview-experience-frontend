import JSEncrypt from "jsencrypt";

export function getEncryptedMessage() {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(process.env.REACT_APP_RSA_PUBLIC_KEY);
  return encrypt.encrypt(process.env.REACT_APP_MESSAGE_CODE);
}
