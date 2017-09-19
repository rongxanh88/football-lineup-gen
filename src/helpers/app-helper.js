const genLineup = (players) => {
    const salaryCap = 50000
    let highestProduction = 0
    let bestLineup = []
    let numberOfOperations = 0

    let quarterbacks = truncatePlayers(players.quarterbacks, "QB")
    let runningbacks = truncatePlayers(players.runningbacks, "RB")
    let receivers = truncatePlayers(players.receivers, "WR")
    let tightends = truncatePlayers(players.tightends, "TE")
    let defenses = players.defenses.sort((a,b) => {
      return b.expected_point_production - a.expected_point_production
    }).slice(0,5)

    quarterbacks.forEach(quarterback => {
      let pointTotal = 0
      let salaryTotal = 0
      let lineup = []

      pointTotal += parseFloat(quarterback.expected_point_production)
      salaryTotal += parseFloat(quarterback.salary)
      lineup.push(quarterback)

      runningbacks.forEach(rb1 => {
        let pointTotal1 = pointTotal
        let salaryTotal1 = salaryTotal
        let lineup1 = lineup.slice()
        
        pointTotal1 += parseFloat(rb1.expected_point_production)
        salaryTotal1 += parseFloat(rb1.salary)
        lineup1.push(rb1)

        const secondRunningbacks = runningbacks.filter(rb2 => rb2 !== rb1)
        secondRunningbacks.forEach(rb2 => {
          let pointTotal2 = pointTotal1
          let salaryTotal2 = salaryTotal1
          let lineup2 = lineup1.slice()

          pointTotal2 += parseFloat(rb2.expected_point_production)
          salaryTotal2 += parseFloat(rb2.salary)
          lineup2.push(rb2)

          receivers.forEach(wr1 => {
            let pointTotal3 = pointTotal2
            let salaryTotal3 = salaryTotal2
            let lineup3 = lineup2.slice()

            pointTotal3 += parseFloat(wr1.expected_point_production)
            salaryTotal3 += parseFloat(wr1.salary)
            lineup3.push(wr1)

            const secondReceivers = receivers.filter(wr2 => wr2 !== wr1)
            secondReceivers.forEach(wr2 => {
              let pointTotal4 = pointTotal3
              let salaryTotal4 = salaryTotal3
              let lineup4 = lineup3.slice()

              pointTotal4 += parseFloat(wr2.expected_point_production)
              salaryTotal4 += parseFloat(wr2.salary)
              lineup4.push(wr2)

              const thirdReceivers = receivers.filter(wr3 => (wr3 !== wr2) && (wr3 !== wr1))
              thirdReceivers.forEach(wr3 => {
                let pointTotal5 = pointTotal4
                let salaryTotal5  = salaryTotal4
                let lineup5 = lineup4.slice()

                pointTotal5 += parseFloat(wr3.expected_point_production)
                salaryTotal5 += parseFloat(wr3.salary)
                lineup5.push(wr3)

                for(let i = 0; i < tightends.length; i++) {
                  const te = tightends[i]

                  let pointTotal6 = pointTotal5
                  let salaryTotal6 = salaryTotal5
                  let lineup6 = lineup5.slice()

                  pointTotal6 += parseFloat(te.expected_point_production)
                  salaryTotal6 += parseFloat(te.salary)
                  lineup6.push(te)

                  if (salaryTotal6 > salaryCap) {
                    continue
                  }

                  for(let j = 0; j < defenses.length; j++) {
                    const defense = defenses[j]
                    let pointTotal7 = pointTotal6
                    let salaryTotal7 = salaryTotal6
                    let lineup7 = lineup6.slice()
                    
                    pointTotal7 += parseFloat(defense.expected_point_production)
                    salaryTotal7 += parseFloat(defense.salary)
                    lineup7.push(defense)

                    if (salaryTotal7 > salaryCap) {
                      continue
                    }
                    const secondTightends = tightends.filter(te2 => te2 !== te)
                    const flexPos = secondRunningbacks.concat(thirdReceivers, secondTightends)

                    for(let k = 0; k < flexPos.length; k++) {
                      const player = flexPos[k]
                      let pointTotal8 = pointTotal7
                      let salaryTotal8 = salaryTotal7
                      let lineup8 = lineup7.slice()

                      pointTotal8 += parseFloat(player.expected_point_production)
                      salaryTotal8 += parseFloat(player.salary)
                      lineup8.push(player)

                      numberOfOperations++

                      if (salaryTotal8 > salaryCap) {
                        continue
                      } else if (pointTotal8 > highestProduction) {
                        highestProduction = pointTotal8
                        bestLineup = lineup8
                      }
                    }
                  }
                }
              })
            })
          })
        })
      })
    })
    console.log("number of operations: " + numberOfOperations)
    return bestLineup
  }

  // genLineupRecursivly() {
    // let quarterbacks = truncatePlayers(this.state.quarterbacks, "QB")
    // let runningbacks = truncatePlayers(this.state.runningbacks, "RB")
    // let receivers = truncatePlayers(this.state.receivers, "WR")
    // let tightends = truncatePlayers(this.state.tightends, "TE")
    // let defenses = this.state.defenses.sort((a,b) => {
    //   return b.expected_point_production - a.expected_point_production
    // }).slice(0,5)

  //   const maxLineupSpaces = {
  //     "QB": 1,
  //     "RB": 2,
  //     "WR": 4,
  //     "TE": 1,
  //     "DEF": 1
  //   }

  //   let currentPositionsFilled = {
  //     "QB": 0,
  //     "RB": 0,
  //     "WR": 0,
  //     "TE": 0,
  //     "DEF": 0
  //   }

  //   const salaryCap = 50000
  //   let lineup = []
  //   let currentCost = 0
  //   let maxPoints = 0
  //   let currentPoints = 0

  //   lineup = this.recurse(maxLineupSpaces, maxPoints, salaryCap, currentPositionsFilled, currentCost, currentPoints, all)
  //   console.log(lineup)
  // }

  // recurse(maxLineupSpaces, maxPoints, salaryCap, currentPositionsFilled, currentCost, currentPoints, players) {
  //   //base case
  //   if (currentCost > salaryCap) {
  //     return
  //   }
  //   //recurse here
    
  //   // recurse(maxLineupSpaces, maxPoints, salaryCap, )

  //   //return lineup
  // }

  // removePlayer(event) {
  //   debugger
  // }

  const truncatePlayers = (players, position) => {
  return players.filter(player => player.position === position)
                .sort((a,b) => {
                  return parseFloat(b.expected_point_production) - parseFloat(a.expected_point_production)
                })
                .slice(0,5)
}

module.exports = { genLineup }