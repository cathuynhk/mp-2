export interface Cocktail {
    idDrink: string;
    strDrink: string;
    strCategory: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strDrinkThumb: string;
    strTags: string | null;
    // The API returns ingredients/measures as numbered keys 1 through 15.
    // We use an index signature so TypeScript knows about them.
    [key: `strIngredient${number}`]: string | null | undefined;
    [key: `strMeasure${number}`]: string | null | undefined;
}

export interface CocktailResponse {
    drinks: Cocktail[] | null;   // API returns null when no drinks match
}