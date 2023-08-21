import { Params } from "react-router-dom";
import { BoxsetOption, BoxsetWithCards } from "./Boxset.model";

export type LoaderData = {
  boxsets: BoxsetOption[];
  selectedBoxset: BoxsetWithCards;
};

export interface LoaderParam extends Params {
  [key: string]: string | undefined;
}
