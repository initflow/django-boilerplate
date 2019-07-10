import { mapper, fromInput } from 'demapper';

@mapper
export default class {
  @fromInput('results')
  items = [];
  @fromInput('count')
  total = 0;
}