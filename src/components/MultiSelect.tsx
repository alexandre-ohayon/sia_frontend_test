import React, { useState, useEffect } from "react";
import { transformData } from "../utils/transformData";
import { useMultiSelect } from "../hooks/useMultiSelect";

const MultiSelect = () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // Simulation d'un appel API
    fetch("/data.json")
      .then(res => res.json())
      .then(json => setData(transformData(json)));
  }, []);

  const { selectedItems, toggleSelection } = useMultiSelect(data);

  // 🔍 Filtrer l'arbre pour inclure les éléments correspondant à la recherche et leurs parents
  const filterTree = (items: any[], search: string) => {
    return items
      .map(item => {
        const matches = item.label.toLowerCase().includes(search.toLowerCase());
        const filteredChildren = item.children ? filterTree(item.children, search) : [];
        if (matches || filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      })
      .filter(Boolean); // Supprime les `null`
  };

  // 📌 Trouver un label par ID (pour afficher les sélections correctement)
  const findLabel = (id: number, items: any[]): string | null => {
    for (const item of items) {
      if (item.id === id) return item.label;
      if (item.children) {
        const found = findLabel(id, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  // 🖥️ Rendu récursif de la liste
  const renderOptions = (items: any[], depth = 0) => (
    <ul style={{ paddingLeft: `${depth * 15}px` }}>
      {items.map(item => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelection(item.id)}
            />
            {item.label}
          </label>
          {item.children && renderOptions(item.children, depth + 1)}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {renderOptions(filterTree(data, search))}
      
      <h3>📝 Sélections :</h3>
      <ul>
        {selectedItems.map(id => (
          <li key={id}>{findLabel(id, data) || id}</li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
