var antiMatter = new Decimal(10)
let gameLoopIntervalId = 0
class Dimension {
  constructor(cost, multiplier) {
    this.amount = new Decimal(0)
    this.bought = new Decimal(0)
    this.baseCost = cost
    this.cost = cost
    this.multiplier = multiplier
  }

  buy() {
    if (antiMatter.gte(this.cost)) {
      antiMatter = antiMatter.minus(this.cost)
      this.amount = this.amount.plus(1)
      this.bought = this.bought.plus(1)
      if (this.bought.gte(10)) {
        this.bought = new Decimal(0)
        this.cost = this.cost.times(this.baseCost)
        this.multiplier = this.multiplier.times(2)
      }
    }
  }
}
var firstDimension = new Dimension(new Decimal(10), new Decimal(1))
var secondDimension = new Dimension(new Decimal(100), new Decimal(1))
var thirdDimension = new Dimension(new Decimal(1000), new Decimal(1))
var fourthDimension = new Dimension(new Decimal(10000), new Decimal(1))
var fifthDimension = new Dimension(new Decimal(100000), new Decimal(1))
var sixthDimension = new Dimension(new Decimal(1000000), new Decimal(1))
var seventhDimension = new Dimension(new Decimal(10000000), new Decimal(1))
var eighthDimension = new Dimension(new Decimal(100000000), new Decimal(1))
var ninthDimension = new Dimension(new Decimal(1000000000), new Decimal(1))
var tenthDimension = new Dimension(new Decimal(10000000000), new Decimal(1))
var metaShift = 0
var metaShiftCost = 1e75

var getAMPerSec = _ => firstDimension.amount.times(firstDimension.multiplier)
var getAntiGrindMulti = _ => tenthDimension.amount.div(15).plus(1)

function gameLoop() {
  antiMatter = antiMatter.plus(
    getAMPerSec()
      .div(20)
      .times(getAntiGrindMulti())
  )

  document.getElementById("AntimatterAmount").innerHTML = `You have ${shortenMoney(antiMatter)} antimatter.`
  document.getElementById("AntimatterMulti").innerHTML = `Your antimatter production multiplier is ${shorten(getAntiGrindMulti())}&times;`

  let dims = [firstDimension, secondDimension, thirdDimension, fourthDimension, fifthDimension, sixthDimension, seventhDimension, eighthDimension, ninthDimension, tenthDimension]
  let dim_titles = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"]

  for (let i = 0; i < 10; i++) {
    document.getElementById(`dim${i}stats`).innerHTML = `You have ${shortenDimensions(dims[i].amount)} ${dim_titles[i]} dimensions. They have a ${dims[i].multiplier}&times; multiplier. ${dims[i].bought} bought. Cost: ${shorten(dims[i].cost)} antimatter.`
    if (i < 9) dims[i].amount = dims[i].amount.plus(dims[i + 1].amount.times(dims[i + 1].multiplier).div(20 * (i + 1)))
  }
}
function metaShift() {
  if (antiMatter.times(metaShiftCost)) {
    antiMatter = antiMatter.sub(metaShiftCost)
    metaShift++
    metaShiftCost = Decimal.pow(10, metaShiftCost)
  }
}

function startInterval() {
  gameLoopIntervalId = setInterval(gameLoop, 50)
}
