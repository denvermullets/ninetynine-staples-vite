import { BoxsetRecord } from "./Boxset.model";

export type MagicCard = {
  id: string | number;
  boxset_id: number;
  name: string;
  text: string;
  original_text: string;
  power: string;
  toughness: string;
  rarity: string;
  card_type: string;
  original_type: string;
  edhrec_rank: number;
  has_foil: boolean;
  has_non_foil: boolean;
  border_color: string;
  converted_mana_cost: string;
  flavor_text: string;
  frame_version: string;
  is_reprint: boolean;
  card_number: string;
  // identifiers: object;
  card_uuid: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  mana_value: string;
  mana_cost: string;
  face_name: string;
  card_side: string;
  created_at: string;
  updated_at: string;
  magic_card_color_idents: MagicCardColorIdents[];
  boxset?: Pick<BoxsetRecord, "code" | "name">;
  normal_price: string;
  foil_price: string;
};

type MagicCardColorIdents = {
  color: MagicCardColor;
};

type MagicCardColor = {
  name: string;
};
