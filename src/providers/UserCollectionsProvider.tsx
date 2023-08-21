import axios from "axios";
import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import config from "../config";
import { CollectionSelectOption, UserCollection } from "../models/UserCollection.model";
import { UserContext } from "./CurrentUserProvider";
import { handleAxiosError } from "../helpers/axiosErrors";

type ProviderProps = {
  children: ReactNode;
};

type UserCollectionsContext = {
  userCollections: UserCollection[];
  collectionOptions: CollectionSelectOption[];
  selectedCollection: CollectionSelectOption | null;
  setSelectedCollection: (selectedCollection: CollectionSelectOption) => void;
};

export const UserCollections = createContext<UserCollectionsContext>({
  userCollections: [],
  collectionOptions: [],
  selectedCollection: null,
  setSelectedCollection: () => {},
});

export const UserCollectionsProvider = ({ children }: ProviderProps) => {
  const [userCollections, setUserCollections] = useState<UserCollection[]>([]);
  const [collectionOptions, setCollectionOptions] = useState<CollectionSelectOption[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<CollectionSelectOption | null>(null);
  const { currentUser } = useContext(UserContext);

  const getCollections = async (userId: number, token: string) => {
    try {
      const collections = await axios(`${config.API_URL}/collections?player_id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (collections) {
        const sortedCollections = collections.data.sort((a: UserCollection, b: UserCollection) => {
          return Number(a.id) - Number(b.id);
        });

        const selectOptions: CollectionSelectOption[] = sortedCollections.map((collection: UserCollection) => {
          return {
            value: Number(collection.id),
            label: collection.name,
          };
        });

        setUserCollections(collections.data);
        setCollectionOptions([...selectOptions]);
      }
    } catch (error) {
      const errorHandler = handleAxiosError(error);
      if (errorHandler === "auth") {
        throw new Error("Something went wrong with your authentication!");
      } else {
        throw new Error("Could not load User Collections!");
      }
    }
  };

  useEffect(() => {
    const loadCollections = async (userId: number, token: string) => {
      await getCollections(userId, token);
    };

    if (currentUser) {
      loadCollections(Number(currentUser.id), currentUser.token);
    }
  }, [currentUser]);

  return (
    <UserCollections.Provider
      value={{ userCollections, collectionOptions, selectedCollection, setSelectedCollection }}
    >
      {children}
    </UserCollections.Provider>
  );
};
