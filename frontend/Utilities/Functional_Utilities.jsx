"require strict";

module.exports = {
  getRandomIntegerInclusive(minimum, maximum) {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  },

  getRandomColorValue() {
    return this.getRandomIntegerInclusive(0, 255);
  },


  randomRGBValue() {
    return `rgb(${this.getRandomColorValue()}, ${this.getRandomColorValue()}, ${this.getRandomColorValue()})`;
  },

};
