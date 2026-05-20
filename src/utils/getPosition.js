export const getPosition = () => {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject),
    );
  }
};
