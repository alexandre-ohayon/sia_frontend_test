import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect from "../components/MultiSelect";
import { beforeAll, afterEach, test, expect, vi } from "vitest";

// Mock des données
const mockData = [
  {
    id: 1,
    label: "Boisson",
    children: [
      { id: 2, label: "Eau" },
      { id: 3, label: "Jus de fruit" },
    ],
  },
  {
    id: 4,
    label: "Beauté",
    children: [
      { id: 5, label: "Shampoing" },
      { id: 6, label: "Savon" },
    ],
  },
];

// Mock de `global.fetch`
beforeAll(() => {
  vi.spyOn(global, "fetch").mockResolvedValue(
    Promise.resolve({
      ok: true,
      status: 200,
      json: async () => mockData,
      headers: new Headers({ "Content-Type": "application/json" }),
      text: async () => JSON.stringify(mockData),
    }) as unknown as Response
  );
});

// Cleanup après chaque test
afterEach(() => {
  vi.restoreAllMocks();
});

// Test : Vérifie si la liste s'affiche correctement
test("affiche la liste des éléments", async () => {
  render(<MultiSelect />);

  // Vérifier que les éléments sont affichés
  await waitFor(() => {
    expect(screen.getByText("Boisson")).toBeInTheDocument();
    expect(screen.getByText("Beauté")).toBeInTheDocument();
  });
});

// Test : Vérifie si on peut sélectionner un élément
test("permet de sélectionner un élément", async () => {
  render(<MultiSelect />);

  // Attendre que la liste apparaisse
  await waitFor(() => {
    expect(screen.getByText("Boisson")).toBeInTheDocument();
  });

  // Sélectionner la checkbox de "Boisson"
  const checkbox = screen.getByRole("checkbox", { name: /boisson/i });
  fireEvent.click(checkbox);

  // Vérifier que la case est bien cochée
  expect(checkbox).toBeChecked();
});

// Test : Vérifie si la recherche fonctionne
test("filtre la liste avec la recherche", async () => {
  render(<MultiSelect />);

  // Attendre que les éléments s'affichent
  await waitFor(() => {
    expect(screen.getByText("Boisson")).toBeInTheDocument();
  });

  // Récupérer l'input de recherche
  const searchInput = screen.getByPlaceholderText("Rechercher...");
  fireEvent.change(searchInput, { target: { value: "Beauté" } });

  // Vérifier que seul "Beauté" est affiché
  await waitFor(() => {
    expect(screen.getByText("Beauté")).toBeInTheDocument();
    expect(screen.queryByText("Boisson")).not.toBeInTheDocument();
  });
});
