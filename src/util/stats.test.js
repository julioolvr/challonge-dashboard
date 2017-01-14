import {
  goalsMade,
  wonMatches,
  lostMatches,
  tiedMatches,
  unplayedMatches
} from './stats.js'

const matchesForPlayer = [
  {
    player1: { id: 1, name: '@julito' },
    player2: { id: 2, name: '@pablito' },
    played: true,
    score: {
      players: [
        {
          player: { id: 1, name: '@julito' },
          score: 0
        },
        {
          player: { id: 2, name: '@pablito' },
          score: 5
        }
      ],
      winnerId: 2
    }
  },
  {
    player1: { id: 1, name: '@julito' },
    player2: { id: 2, name: '@pablito' },
    played: true,
    score: {
      players: [
        {
          player: { id: 1, name: '@julito' },
          score: 2
        },
        {
          player: { id: 2, name: '@pablito' },
          score: 2
        }
      ],
      winnerId: null
    }
  },
  {
    player1: { id: 1, name: '@julito' },
    player2: { id: 2, name: '@pablito' },
    played: true,
    score: {
      players: [
        {
          player: { id: 1, name: '@julito' },
          score: 5
        },
        {
          player: { id: 2, name: '@pablito' },
          score: 2
        }
      ],
      winnerId: 1
    }
  },
  {
    player1: { id: 1, name: '@julito' },
    player2: { id: 2, name: '@pablito' },
    played: false,
    score: {
      players: [
        {
          player: { id: 1, name: '@julito' },
          score: undefined
        },
        {
          player: { id: 2, name: '@pablito' },
          score: undefined
        }
      ],
      winnerId: undefined
    }
  }
]

describe('goalsMade', () => {
  it('returns the sum of goals made by a player', () => {
    expect(goalsMade(1, matchesForPlayer)).toEqual(7)
    expect(goalsMade(2, matchesForPlayer)).toEqual(9)
  });
  it('returns 0 when no matches are passed', () => {
    expect(goalsMade(2, [])).toEqual(0)
  })
})

describe('wonMatches', () => {
  it('returns the matches where a given player was the winner', () => {
    expect(wonMatches(1, matchesForPlayer).length).toEqual(1)
    expect(wonMatches(2, matchesForPlayer).length).toEqual(1)
  })
  it('returns empty array when no matches', () => {
    expect(wonMatches(1, [])).toEqual([])
  })
})

describe('lostMatches', () => {
  it('returns the matches where a given player lost', () => {
    expect(lostMatches(1, matchesForPlayer).length).toEqual(1)
    expect(lostMatches(2, matchesForPlayer).length).toEqual(1)
  })
  it('returns empty array when no matches', () => {
    expect(lostMatches(1, [])).toEqual([])
  })
})

describe('tiedMatches', () => {
  it('returns the tied matches given an array of matches', () => {
    expect(tiedMatches(matchesForPlayer).length).toEqual(1)
  })
  it('returns empty array when no matches', () => {
    expect(tiedMatches([])).toEqual([])
  })
})

describe('unplayedMatches', () => {
  it('returns the unplayed matches given an array of matches', () => {
    expect(unplayedMatches(matchesForPlayer).length).toEqual(1)
  })
  it('returns empty array when no matches', () => {
    expect(unplayedMatches([])).toEqual([])
  })
})
