// function to capitalized first name of user
export const formatName = (name: string): string => {
  const nameArray = name.split(" ");
  return nameArray[0].charAt(0).toUpperCase() + nameArray[0].slice(1);
};
