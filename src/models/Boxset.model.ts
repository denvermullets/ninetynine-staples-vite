import axios from "axios";
import { MagicCard } from "./MagicCard.model";
import config from "../config";

export type BoxsetRecord = {
  id: number;
  code: string;
  name: string;
  release_date: string;
  base_set_size: number;
  total_set_size: number;
  set_type: string;
  valid_cards: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type BoxsetOption = {
  label: string;
  value: number | string;
  abbreviation: string;
};

export type SelectOptions = {
  label: string;
  value: number | string;
  data: BoxsetOption;
};

export type BoxsetWithCards = BoxsetRecord & { magic_cards: MagicCard[] };

type BoxsetModel = {
  getBoxsets: () => Promise<BoxsetOption[]>;
  getBoxsetById: (boxsetId: number) => Promise<BoxsetWithCards>;
};

const Boxset: BoxsetModel = {
  getBoxsets: async () => {
    console.log("new boxset getReq");
    const boxsets = await axios(`${config.API_URL}/boxsets`);
    const boxsetData: BoxsetRecord[] = boxsets.data;
    const boxsetOptions: BoxsetOption[] = boxsetData.map((boxset) => {
      return { value: boxset.id, label: boxset.name, abbreviation: boxset.code };
    });

    return boxsetOptions;
  },
  getBoxsetById: async (boxsetId) => {
    console.log("boxsetId: ", boxsetId);
    const loadSetWithCards = await axios(`${config.API_URL}/boxsets/${boxsetId}`);
    console.log("loadSetWithCards: ", loadSetWithCards);
    const setWithCards: BoxsetWithCards = loadSetWithCards.data;
    return setWithCards;
  },
};

export default Boxset;
