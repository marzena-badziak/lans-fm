export class StringUtils {
  static randomString = stringLength => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < stringLength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
}
