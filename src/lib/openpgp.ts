// lazily load openpgp
const openpgpModule = import(
  /* webpackChunkName: "openpgp,  webpackPrefetch: true" */ "openpgp"
);

interface PublicKey {
  keyId: string;
  publicKey: string;
}

/**
 * Encrypt dataToEncrypt
 *
 * @param {Object} dataToEncrypt
 * @param {PublicKey} Object containing keyId and publicKey properties
 *
 * @return {Object} Object containing encryptedMessage and keyId
 */
export async function openPGPEncryption(
  dataToEncrypt: object,
  { keyId, publicKey }: PublicKey
): Promise<{
  keyId: string;
  encryptedMessage: string;
}> {
  console.debug(publicKey, keyId);
  if (!publicKey || !keyId) {
    throw new Error("Unable to encrypt data");
  }
  const decodedPublicKey = atob(publicKey);
  const openpgp = await openpgpModule;
  const options = {
    message: await openpgp.createMessage({
      text: JSON.stringify(dataToEncrypt),
    }),
    encryptionKeys: await openpgp.readKey({ armoredKey: decodedPublicKey }),
  };

  return openpgp.encrypt(options).then((ciphertext) => {
    return {
      encryptedMessage: btoa(ciphertext),
      keyId,
    };
  });
}
