import bcrypt from "bcryptjs";

export default function (password: string) {
  const encryptedPass = bcrypt.hashSync(password, 10);
  return encryptedPass;
}
