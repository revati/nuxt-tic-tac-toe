<template>
  <div>
    <div v-if="tied">
      Game is tied
    </div>
    <div v-if="winner">
      Game won {{ winner }}
    </div>

    {{ activePlayer }}

    <table>
      <tbody>
        <tr v-for="(row, x) in board">
          <td v-for="(cell, y) in row" @click="makeMove(x, y)" :class="{active: isInWinningLine(x, y)}">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  computed: {
    activePlayer () { return this.$store.state.game.activePlayer },
    winningLine () { return this.$store.state.game.winningLine },
    winner () { return this.$store.state.game.winner },
    board () { return this.$store.state.game.board },
    tied () { return this.$store.state.game.tied }
  },
  methods: {
    makeMove (x, y) {
      this.$store.dispatch('game/makeMove', {x, y, player: this.activePlayer})
    },
    isInWinningLine (xCoord, yCoord) {
      return !!this.winningLine.find(({x, y}) => x === xCoord && y === yCoord)
    }
  }
}
</script>

<style>
  td {
    width: 50px;
    height: 50px;
    border: solid 1px black;
  }

  .active {
    background: red
  }
</style>
