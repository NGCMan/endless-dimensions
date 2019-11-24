function getDefaultPlayer() {
  return {
    antiMatter: new Decimal(10),
    metaShift: 0,
    metaShiftCost: new Decimal(1e75),
    ndOwned: new Decimal(10),
    ndAmounts: [null],
    ndBoughts: [null],
    ndCosts: [null],
    ndMults: [null]
  }
}

function resetND() {
  resetValues(["ndAmounts", "ndBoughts", "ndCosts", "ndMults"])
  for (let i = 1; i <= player.ndOwned; i++) {
    player.ndAmounts.push(new Decimal(0))
    player.ndBoughts.push(0)
    player.ndCosts.push(Decimal.pow(10, i))
    player.ndMults.push(new Decimal(1))
  }
}

var player = getDefaultPlayer()
resetND()
let gameLoopIntervalId = 0

var getNDCostScale = id => Decimal.pow(10, id)

function buyND(id) {
  if (player.antiMatter.gte(player.ndCosts[id])) {
    player.antiMatter = player.antiMatter.minus(player.ndCosts[id])
    player.ndAmounts[id] = player.ndAmounts[id].plus(1)
    player.ndBoughts[id]++
    if (player.ndBoughts[id] >= 10) {
      player.ndBoughts[id] = 0
      player.ndCosts[id] = player.ndCosts[id].times(getNDCostScale(id))
      player.ndMults[id] = player.ndMults.times(2)
    }
  }
}

function resetValues(names) {
  let reference = getDefaultPlayer()
  names.forEach(function(name) {
    _.set(player, name, _.get(reference, name))
  })
}

var getAMPerSec = _ => player.ndAmounts[1].times(player.ndMults[1])
var getAntiGrindMulti = _ => player.ndAmounts[10].div(15).plus(1)

var getDimTitles = id => [null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"][id]

function gameLoop() {
  player.antiMatter = player.antiMatter.plus(
    getAMPerSec()
      .div(20)
      .times(getAntiGrindMulti())
  )

  document.getElementById("AntimatterAmount").innerHTML = `You have ${shortenMoney(player.antiMatter)} antimatter.`
  document.getElementById("AntimatterMulti").innerHTML = `Your antimatter production multiplier is ${shorten(getAntiGrindMulti())}&times;`

  for (let i = 1; i < 11; i++) {
    document.getElementById(`dim${i}stats`).innerHTML = `You have ${shortenDimensions(player.ndAmounts[i])} ${getDimTitles(i)} dimensions. They have a ${player.ndMults[i]}&times; multiplier. ${player.ndBoughts[i]} bought. Cost: ${shorten(player.ndCosts[i])} antimatter.`
    if (player.ndOwned.neq(i)) player.ndAmounts[i] = player.ndAmounts[i].plus(player.ndAmounts[i + 1].times(player.ndMults[i + 1]).div(20 * (i + 1)))
  }
}
function metaShift() {
  if (player.antiMatter.gte(player.metaShiftCost)) {
    player.antiMatter = player.antiMatter.sub(player.metaShiftCost)
    player.metaShift++
    player.metaShiftCost = Decimal.pow(10, player.metaShiftCost)
  }
}

function startInterval() {
  gameLoopIntervalId = setInterval(gameLoop, 50)
}
