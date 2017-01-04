import { LightState } from './light.state.model';

export interface Light {
  id: number;
  state: LightState;
  name: string;
}
