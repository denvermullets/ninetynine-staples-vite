import { ChakraStylesConfig } from "chakra-react-select";
import { mode } from "@chakra-ui/theme-tools";
import { GroupBase } from "react-select";

// using generics here because T should be BoxsetOption && CollectionSelectOption but i don't want duplicate code
export const selectBoxStyles = <T>(colorMode: "light" | "dark"): ChakraStylesConfig<T, boolean, GroupBase<T>> => ({
  control: (provided, { theme }) => ({
    ...provided,
    borderRadius: "16px",
    color: mode("cyan.600", "darkGray.200")(theme),
    background: mode("white", "darkGray.800")({ colorMode }),
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "30px",
    background: mode("white", "darkGray.500")({ colorMode }),
  }),
  placeholder: (provided, { theme }) => ({
    ...provided,
    color: mode("cyan.600", "darkGray.200")(theme),
  }),
});
