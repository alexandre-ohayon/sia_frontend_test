import React, { useState } from "react";
import data from "../data.json";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
    const labels = data.map((item) => item.label);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleLabelClick = (label: string) => {
        setSelectedLabels((prevSelected) =>
            prevSelected.includes(label)
                ? prevSelected.filter((item) => item !== label)
                : [...prevSelected, label]
        );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleChange}
            />
            <div>
                {labels
                    .filter((label) => label.toLowerCase().includes(search.toLowerCase()))
                    .map((label) => (
                        <div
                            key={label}
                            onClick={() => handleLabelClick(label)}
                            style={{
                                cursor: "pointer",
                                backgroundColor: selectedLabels.includes(label)
                                    ? "lightgray"
                                    : "white",
                            }}
                        >
                            {label}
                        </div>
                    ))}
            </div>
        </div>
    );
}
