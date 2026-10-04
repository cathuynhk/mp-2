import useSWR from "swr";
import styled from "styled-components";
import Cocktails from "./components/Cocktails.tsx";
import type { Cocktail, CocktailResponse } from "./interfaces/Cocktail.ts";

const API_URL =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
// You can change the search filter to anything. The API runs on whatever search you have.
// Right now the search is set to drinks with the name "margarita" in it, or in the ingredients list.
// Change the search from Margarita to something else if you want other Cocktails to be shown.

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ParentDiv = styled.div`
    width: 90vw;
    margin: auto;
    border: 5px darkgoldenrod solid;
    padding: 1%;
    background-color: #fdf6e3;
`;

export default function App() {
    const { data, error, isLoading } = useSWR<CocktailResponse>(
        API_URL,
        fetcher
    );

    if (error) return <div><p>Failed to Load</p></div>;
    if (isLoading || !data) return <div><p>Loading...</p></div>;

    // The API returns `drinks: null` when the search string matches nothing.
    const drinks: Cocktail[] = data.drinks ?? [];

    return (
        <ParentDiv>
            <Cocktails data={drinks} />
        </ParentDiv>
    );
}