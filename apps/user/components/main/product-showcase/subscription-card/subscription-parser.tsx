// Move this outside to prevent recreation on each render
const parseSubscriptionFeatures = (item: API.Subscribe) => {
  let parsedDescription;
  try {
    parsedDescription = JSON.parse(item.description);
  } catch {
    parsedDescription = { description: '', features: {} };
  }

  // Extract duration and saves from features
  let subscriptionQuantity = 1; // Default to 1
  let subscriptionDiscount = 0; // Default to 0
  const features = parsedDescription.features;

  // Simple direct property access for the dictionary
  if (features) {
    // Get duration/quantity from features
    if (features.duration) {
      subscriptionQuantity = parseFloat(features.duration) || 1;
    }

    // Get saves/discount from features
    if (features.saves) {
      subscriptionDiscount = parseFloat(features.saves) || 0;
    }
  }

  return {
    subscriptionQuantity,
    subscriptionDiscount,
    isPopular: item.name.includes('超值'),
  };
};

export default parseSubscriptionFeatures;
