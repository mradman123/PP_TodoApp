var Functional = (tekst) => {

  var Caps = (str) =>  [str.charAt(0).toUpperCase(),str.substring(1)].join("");
  var Kapitaliziraj = (fn, str) => str.split(" ").map(fn).join(" ");

  return Kapitaliziraj(Caps, tekst);

}

module.exports = {Functional};
