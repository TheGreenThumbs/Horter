const inRange = (x, start, end) => (x - start) * (x - end) <= 0;

export const collisionCheckHorizontal = (curr, other, scale) => {
  for (
    let i = curr.left; // Start with the left of the current one
    i <= curr.left + curr.width; // Keep checking until you hit the end
    i += scale // Increment check by gardenScale
  ) {
    console.log("checks", i);
    if (
      inRange(
        i,
        scale * (other.position_x + 1),
        scale * (other.position_x + other.radius - 1)
      )
    ) {
      // There has been a collision Horizantally
      return true;
    }
  }
  return false;
};

export const collisionCheckVertical = (curr, other, scale) => {
  for (
    let i = curr.top; // Start with the top of the current one
    i <= curr.top + curr.height; // Keep checking until you hit the end
    i += scale // Increment check by gardenScale
  ) {
    console.log("checks", i);
    if (
      inRange(
        i,
        scale * (other.position_y + 1),
        scale * (other.position_y + other.radius - 1)
      )
    ) {
      // There has been a collision Vertically
      return true;
    }
  }
  return false;
};
