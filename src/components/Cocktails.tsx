import styled from "styled-components";
import type { Cocktail } from "../interfaces/Cocktail.ts";

const AllCocktailsDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    background-color: bisque;
    padding: 1%;
`;

const SingleCocktailDiv = styled.div<{ alcoholic: string }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    border: 3px darkred solid;
    border-radius: 8px;
    font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
    text-align: center;
    color: ${(props) => (props.alcoholic === "Alcoholic" ? "white" : "black")};
    background-color: ${(props) =>
            props.alcoholic === "Alcoholic" ? "#5d4037" : "#f8bbd0"};
`;

const CocktailImage = styled.img`
    width: 100%;
    max-width: 250px;
    margin: 4% auto;
    border-radius: 8px;
    border: 2px solid white;
`;

const InstructionsP = styled.p`
    font-size: calc(3px + 0.7vw);
    font-style: normal;
    text-transform: none;
    margin-top: 4%;
    text-align: left;
`;

const IngredientsTable = styled.table`
    margin: 4% auto 0 auto;
    border-collapse: collapse;
    font-size: calc(4px + 0.7vw);
    font-style: normal;
    text-transform: none;

    td {
        padding: 3px 8px;
        border-top: 1px solid rgba(255, 255, 255, 0.4);
        text-align: left;
    }
`;

export default function Cocktails(props: { data: Cocktail[] }) {
    return (
        <AllCocktailsDiv>
            {
                props.data.map((drink: Cocktail) => {
                    // Build [ [ingredient, measure], ... ] pairs from the flattened keys.
                    const ingredients: { name: string; measure: string }[] = [];
                    for (let i = 1; i <= 15; i++) {
                        const name = drink[`strIngredient${i}`];
                        const measure = drink[`strMeasure${i}`];
                        if (name && name.trim() !== "") {
                            ingredients.push({
                                name,
                                measure: measure ? measure.trim() : "",
                            });
                        }
                    }

                    return (
                        <SingleCocktailDiv
                            key={drink.idDrink}
                            alcoholic={drink.strAlcoholic}
                        >
                            <h1>{drink.strDrink}</h1>
                            <p><strong>Category:</strong> {drink.strCategory}</p>
                            <p><strong>Alcoholic:</strong> {drink.strAlcoholic}</p>
                            <p><strong>Glass:</strong> {drink.strGlass}</p>
                            <CocktailImage
                                src={drink.strDrinkThumb}
                                alt={`image of ${drink.strDrink}`}
                            />

                            <IngredientsTable>
                                <tbody>
                                {
                                    ingredients.map((ing, idx) => (
                                        <tr key={idx}>
                                            <td>{ing.name}</td>
                                            <td>{ing.measure}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </IngredientsTable>

                            <InstructionsP>{drink.strInstructions}</InstructionsP>
                        </SingleCocktailDiv>
                    );
                })
            }
        </AllCocktailsDiv>
    );
}