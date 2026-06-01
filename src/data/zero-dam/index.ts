import type { MapDifficulty, OfficialPointsBundle } from '../../types'
import bundle from './official-points.json'

export const officialBundle = bundle as OfficialPointsBundle

export function getLootPoints(difficulty: MapDifficulty = '常规') {
  return officialBundle.difficulties[difficulty] ?? []
}

export const availableDifficulties = Object.keys(
  officialBundle.difficulties,
) as MapDifficulty[]
