export const state = {
  players: ['x', 'o'],
  activePlayer: 'x',
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  winner: null,
  winningLine: [],
  tied: false
}

let boardIsFull = board => {
  for (let x in board)
    for (let y in board[x])
      if (!board[x][y])
        return false

  return true
}

let cellValue = board => ({x, y}) => board[x][y]

let findWinningCoords = board => {
  let value = cellValue(board)

  let winnerCoords = [
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],

    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
    [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],

    [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
    [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}]
  ]

  return winnerCoords.find(coords => {
    return value(coords[0]) !== null
      &&
      value(coords[0]) === value(coords[1])
      &&
      value(coords[1]) === value(coords[2])
  })
}

export const actions = {
  makeMove ({commit, state}, {x, y, player}) {
    if (state.tied || state.winner) return

    if (state.activePlayer !== player) return

    if (state.board[x][y]) return

    commit('moveMade', {x, y, player})

    if (boardIsFull(state.board))
      commit('tied')

    let coords = findWinningCoords(state.board)

    if (coords)
      commit('playerWon', {coords, player: cellValue(state.board)(coords[0])})
  }
}

export const mutations = {
  moveMade (state, {x, y, player}) {
    state.activePlayer = state.players.find(p => p !== state.activePlayer)
    state.board[x][y] = player
  },
  tied (state) {
    state.tied = true
  },
  playerWon (state, {coords, player}) {
    state.winner = player
    state.winningLine = coords
  }
}
