var antiMatter = 10
var antiMatterDisplay = antiMatter / Math.pow(10, Math.floor(Math.log10(antiMatter))) + "e" + Math.floor(Math.log10(antiMatter))
let gameLoopIntervalId = 0
class Dimension {
  constructor(amount, bought, cost, multiplier) {
    this.amount = amount
    this.bought = bought
    this.baseCost = cost
    this.cost = cost
    this.multiplier = multiplier
  }

  buy() {
    if (Math.round(antiMatter) >= this.cost) {
      antiMatter -= this.cost
      this.amount++
      this.bought++
      if (this.bought >= 10) {
        this.bought = 0
        this.cost *= this.baseCost
        this.multiplier *= 2
      }
    }
  }
}
var firstDimension = new Dimension(0, 0, 10, 1)
var secondDimension = new Dimension(0, 0, 100, 1)
var thirdDimension = new Dimension(0, 0, 1000, 1)
var fourthDimension = new Dimension(0, 0, 10000, 1)
var fifthDimension = new Dimension(0, 0, 100000, 1)
var sixthDimension = new Dimension(0, 0, 1000000, 1)
var seventhDimension = new Dimension(0, 0, 10000000, 1)
var eighthDimension = new Dimension(0, 0, 100000000, 1)
var ninthDimension = new Dimension(0, 0, 1000000000, 1)
var tenthDimension = new Dimension(0, 0, 10000000000, 1)
var antiGrindMulti = 1
var metaShift = 0
var metaShiftCost = 1e75
var amPerSecond = 0

function gameLoop() {
  antiMatter += (amPerSecond / 20) * antiGrindMulti

  antiMatterDisplay = (Math.round((antiMatter / Math.pow(10, Math.floor(Math.log10(antiMatter)))) * 100) / 100).toFixed(2) + "e" + Math.floor(Math.log10(antiMatter))
  document.getElementById("AntimatterAmount").innerHTML = "You have " + antiMatterDisplay + " antimatter."
  document.getElementById("AntimatterMulti").innerHTML = "Your antimatter production multiplier is " + antiGrindMulti + " ."

  let dims = [firstDimension, secondDimension, thirdDimension, fourthDimension, fifthDimension, sixthDimension, seventhDimension, eighthDimension, ninthDimension, tenthDimension]
  let dim_titles = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"]

  amPerSecond = dims[0].amount * dims[0].multiplier
  antiGrindMulti = tenthDimension.amount / 15 + 1

  for (let i = 0; i < 10; i++) {
    document.getElementById("dim" + i + "stats").innerHTML = "You have " + Math.round(dims[i].amount * 10) / 10 + " " + dim_titles[i] + " dimensions. They have a " + dims[i].multiplier + "&times; multiplier. " + dims[i].bought + " bought. Cost: " + dims[i].cost + " antimatter."
    if (i < 9) dims[i].amount += (dims[i + 1].amount * dims[i + 1].multiplier) / (20 * (i + 1))
  }
}
function metaShift() {
  if (Math.round(antiMatter) >= metaShiftCost) {
    antiMatter -= metaShiftCost
    metaShift++
    var metaShiftCost = Math.pow(10, metaShiftCost)
  }
}

function startInterval() {
  gameLoopIntervalId = setInterval(gameLoop, 50)
}

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("codeSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("codeSave"))
if (savegame !== null) {
  gameData = savegame
}
