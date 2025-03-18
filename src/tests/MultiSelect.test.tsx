import { render, screen, fireEvent } from "@testing-library/react";
import MultiSelect from "../components/MultiSelect";

test("affiche la liste des éléments", async () => {
  render(<MultiSelect />);
  const input = screen.getByPlaceholderText("Rechercher...");
  expect(input).toBeInTheDocument();
});

test("permet de sélectionner un élément", async () => {
  render(<MultiSelect />);
  const checkbox = screen.getByLabelText("Boisson");
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
