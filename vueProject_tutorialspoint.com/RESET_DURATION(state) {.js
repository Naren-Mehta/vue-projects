RESET_DURATION(state) {
    const { filters } = state;
    const { duration } = filters;

    const newDuration = {
      ...duration,
      isOpen: true,
      sliderValues: [duration.min, duration.max],
      isTouched: false,
    };

    state.filters.duration = newDuration;
  },
  RESET_COST(state) {
    const { filters } = state;
    const { cost } = filters;

    const newCost = {
      ...cost,
      isOpen: true,
      sliderValues: [cost.min, cost.max],
      isTouched: false,
    };

    state.filters.cost = newCost;
  },