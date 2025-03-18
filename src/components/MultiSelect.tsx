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

  const renderOptions = (items: any[], depth = 0) => (
    <ul style={{ paddingLeft: `${depth * 15}px` }}>
      {items
        .filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
        .map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelection(item.id)}
            />
            {item.label}
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
      {renderOptions(data)}
      <h3>📝 Sélections :</h3>
      <ul>
        {selectedItems.map(id => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
