export class StringUtils {
  static randomString = stringLength => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < stringLength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
}
