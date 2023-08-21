import { Box, Container, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { LoaderData } from "../../models/LoaderData.model";
import { useContext } from "react";
import { UserCollections } from "../../providers/UserCollectionsProvider";
import { selectBoxStyles } from "../../components/ChakraReactSelect/helpers";
import { SelectOptions } from "../../models/Boxset.model";

const Boxsets: React.FC = () => {
  // const [userCollection, setUserCollection] = useState([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const { collectionOptions } = useContext(UserCollections);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { boxsets, selectedBoxset } = useLoaderData() as LoaderData;
  const params = useParams();
  console.log("boxsets: ", boxsets);
  console.log("selectedBoxset: ", selectedBoxset);
  // so there's some weird stuff going on with chakra-react-select / react-select
  // v4.7.0 wasn't working with useBasicStyles, and now it's not typing properly(?)
  // tbh, i kinda don't care at this point

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterOptions = (option: SelectOptions, inputValue: string) => {
    return (
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.data.abbreviation.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // const handleBoxsetChange = (e) => {
  //   navigate({ search: `?boxset=${e.value}` });
  // const posts = await fetchPosts(params.category, state.userId);
  //  navigate("/posts", { state: { userId } });
  // };

  return (
    <Container variant="collection">
      <Box>
        <Grid gap={6} templateColumns="repeat(4, 1fr)" padding={2}>
          <GridItem colSpan={2}>
            <Select
              isSearchable
              filterOption={filterOptions}
              options={boxsets}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(option: any) => {
                option && navigate(`/sets/${option.value}`);
              }}
              placeholder="Select a Boxset"
              useBasicStyles
              focusBorderColor="green.500"
              selectedOptionColorScheme="green"
              chakraStyles={selectBoxStyles(colorMode)}
              defaultValue={
                params?.boxsetId ? boxsets.find((set) => set.value === Number(params.boxsetId)) : boxsets[0]
              }
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              options={collectionOptions}
              // onChange={setSelectedCollection}
              key="userCollection-select"
              name="user-collection-select"
              placeholder="Select your Collection"
              useBasicStyles
              focusBorderColor="green.500"
              selectedOptionColorScheme="green"
              chakraStyles={selectBoxStyles(colorMode)}
            />
          </GridItem>
        </Grid>
        {/* {loading && (
          <HStack justifyContent="center" margin={20}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
          </HStack>
        )} */}
        {/* {cards && cards.length > 0 && (
          <CardList
            setGridView={setGridView}
            gridView={gridView}
            cards={cards}
            collection={userCollection}
            setUserCollection={setUserCollection}
            selectedCollection={selectedCollection}
          />
        )} */}
        <ul>
          {selectedBoxset.magic_cards.map((magicCard) => (
            <li key={magicCard.id}>{magicCard.name}</li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default Boxsets;
