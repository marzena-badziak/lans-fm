export class LansFmUtils {
  static randomString = stringLength => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < stringLength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  static verifySpotifyToken = (token, expires) => {
    return token === "" || (expires !== "" && expires < Date.now())
      ? true
      : false;
  };
}

export const encodeURI = (str) => {
  str = str.replace(/\s+/g, "_");
  return encodeURIComponent(str);
}

export const decodeURI = (str) => {
  str = str.replace(/_/g, " ");
  return decodeURIComponent(str);
}
