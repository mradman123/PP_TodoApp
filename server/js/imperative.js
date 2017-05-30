var Imperative = (tekst) => {
  if(tekst===undefined)
  {
    return;
  }
  var rez = [];

  var Kapitaliziraj = (tekst) => {
    var array = tekst.split(" ");
    var newArray = "";
    rez = [];
    for (let i = 0; i < array.length; i++) {
      newArray = [
        array[i].charAt(0).toUpperCase(),
        array[i].substring(1)
      ].join("");
      rez.push(newArray);
    }
  };
  Kapitaliziraj(tekst);
  return rez.join(" ");
}

module.exports = {Imperative};
