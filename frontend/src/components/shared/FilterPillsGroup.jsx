export default function FilterPillsGroup({
  label,
  options,
  selectedValues,
  allValue,
  allLabel,
  onChange,
}) {
  const handleToggle = value => {
    if (value === allValue) {
      onChange([]); // reset to "all" by clearing all selected values
      return;
    }

    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(item => item !== value)); // remove value if already selected
      return;
    }

    onChange([...selectedValues, value]); // add value if not currently selected
  };

  return (
    <div className="filter-pill-group" role="group" aria-label={label}>
      <div className="filter-pill-group-label">{label}</div> {/* group label */}
      <div className="filter-pill-list">
        <button
          type="button"
          className={`filter-pill ${selectedValues.length === 0 ? 'active' : ''}`} // active when no filters selected
          onClick={() => handleToggle(allValue)} // toggle "all" option
        >
          {allLabel}
        </button>

        {options.map(option => (
          <button
            type="button"
            key={option.value} // unique key for each option
            className={`filter-pill ${
              selectedValues.includes(option.value) ? 'active' : '' // active if selected
            }`}
            onClick={() => handleToggle(option.value)} // toggle individual option
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
