import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MultiSelect from "../components/MultiSelect";

// Mock de `fetch` pour empêcher les erreurs en test
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, label: "Boisson", children: [{ id: 2, label: "Eau" }] },
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
  
  // Attendre que l'élément "Boisson" soit chargé
  await waitFor(() => screen.getByText("Boisson"));

  expect(screen.getByText("Boisson")).toBeInTheDocument();
});

test("permet de sélectionner un élément", async () => {
  render(<MultiSelect />);
  
  // Attendre l'affichage de la liste
  await waitFor(() => screen.getByText("Boisson"));

  // Sélectionner la checkbox
  const checkbox = await screen.findByRole("checkbox", { name: /boisson/i });

  // Simuler un clic
  fireEvent.click(checkbox);
  
  // Vérifier que la case est bien cochée
  expect(checkbox).toBeChecked();
});
