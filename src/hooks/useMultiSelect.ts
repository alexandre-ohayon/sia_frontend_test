import { useState } from "react";

export const useMultiSelect = (data: any[]) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return { selectedItems, toggleSelection };
};
