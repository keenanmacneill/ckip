export default function FilterPillsGroup({
  label,
  options,
  selectedValues,

  onChange,
}) {
  const handleToggle = value => {
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
