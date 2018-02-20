import { IModels } from './models'

export interface Ibase {

  prototype?;
  associate?(models: IModels): void;

}
