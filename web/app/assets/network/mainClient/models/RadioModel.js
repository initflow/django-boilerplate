import { mapper, fromInput } from 'demapper';

@mapper
export default class {
  @fromInput('status', { transform: x => x === 'online' })
  isOnline = false;
  @fromInput('current_track', { transform: x => x !== null ? x.title : null })
  currentTrackTitle = null;
  @fromInput('current_track', { transform: x => x !== null ? x.artwork_url : null })
  image = null;
}