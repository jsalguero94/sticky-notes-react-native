// Generate a random position for a new note
export const generateRandomPosition = (
  boardWidth: number,
  boardHeight: number,
): { x: number; y: number } => {
  // Calculate a position that's away from edges
  const margin = 50;
  const maxX = Math.max(boardWidth - 220 - margin, margin); // 220px is approximate note width
  const maxY = Math.max(boardHeight - 220 - margin, margin); // 220px is approximate note height

  // Add some randomness to position (within central area)
  const x = margin + Math.random() * (maxX - margin * 2);
  const y = margin + Math.random() * (maxY - margin * 2);

  return { x, y };
};

// Add a slight random rotation to notes for a natural feel
export const getRandomRotation = (): string => {
  const rotation = Math.random() * 6 - 3; // Between -3 and 3 degrees
  return `rotate(${rotation}deg)`;
};

// Get contrast text color (black or white) based on background color
export const getContrastTextColor = (bgColor: string): string => {
  // Simple contrast calculation for our note colors
  switch (bgColor) {
    case "yellow":
    case "green":
    case "pink":
      return "text-gray-800";
    case "blue":
    case "purple":
      return "text-gray-100";
    default:
      return "text-gray-800";
  }
};
