export class Die {
  constructor(sides = 6, color = 'rgb(255, 255, 255)', numColor = 'rgb(0, 0, 0)') {
    this.id = Date.now();
    this.sides = sides;
    this.color = color;
    this.numColor = numColor;
  }

  roll(numRolls) {
    let min = Math.ceil(1);
    let max = Math.floor(this.sides);
    let rollsArray = [];
    for(let i=0; i<numRolls; i++) {
      rollsArray.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return rollsArray;
  }
}