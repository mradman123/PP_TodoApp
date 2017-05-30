var Oop = (tekst) => {

  var Tekst = function(tekst) {
    this.tekst = tekst;
  };
  Tekst.prototype.Caps = function(str) {
    var prvoSlovo = str.charAt(0);
    var ostatak = str.substring(1);
    return [prvoSlovo.toUpperCase(), ostatak].join("");
  };
  Tekst.prototype.Kapitaliziraj = function() {
    var rez = [];
    var tekstArray = this.tekst.split(" ");
    for (let i = 0; i < tekstArray.length; i++) {
      rez.push(this.Caps(tekstArray[i]));
    }
    return rez.join(" ");
  };

  var noviTekst = new Tekst(tekst);
  return noviTekst.Kapitaliziraj();

}

module.exports = {Oop};
