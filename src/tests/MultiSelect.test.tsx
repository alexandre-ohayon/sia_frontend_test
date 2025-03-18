import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MultiSelect from "../components/MultiSelect";

// Mock de `fetch` pour empêcher les erreurs en test
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, label: "Boisson", children: [{ id: 2, label: "Eau" }] },
          { id: 3, label: "Beauté", children: [{ id: 4, label: "Parfum" }] }
        ]),
    })
  );
});

// Réinitialiser les mocks après chaque test
afterEach(() => {
  vi.restoreAllMocks();
});

test("affiche la liste des éléments", async () => {
  render(<MultiSelect />);
  
  await waitFor(() => screen.getByText("Boisson"));

  expect(screen.getByText("Boisson")).toBeInTheDocument();
  expect(screen.getByText("Beauté")).toBeInTheDocument();
});

test("permet de sélectionner un élément", async () => {
  render(<MultiSelect />);
  
  await waitFor(() => screen.getByText("Boisson"));

  const checkboxes = await screen.findAllByRole("checkbox");
  const checkbox = checkboxes[0];

  fireEvent.click(checkbox);
  
  expect(checkbox).toBeChecked();
});

test("permet de rechercher un élément", async () => {
  render(<MultiSelect />);
  
  const searchInput = screen.getByPlaceholderText("Rechercher...");
  fireEvent.change(searchInput, { target: { value: "Boisson" } });

  expect(await screen.findByText("Boisson")).toBeInTheDocument();
  expect(screen.queryByText("Beauté")).not.toBeInTheDocument(); // Beauté doit disparaître
});
