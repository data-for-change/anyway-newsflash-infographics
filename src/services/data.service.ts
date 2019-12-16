import {INewFlash} from '../models/NewFlash';

export function getCollection(): Array<INewFlash> {
  return [
    {
      userId: 1,
      id: 1,
      title: 'Learn JavaScript',
      completed: true
    },
    {
      userId: 1,
      id: 2,
      title: 'Learn React',
      completed: false
    },
    {
      userId: 3,
      id: 3,
      title: 'Drink some tea',
      completed: false
    },
    {
      userId: 2,
      id: 4,
      title: 'Get some coffee',
      completed: false
    }
  ]
}
