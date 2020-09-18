import uid from "uid";

export function addTag(size, quantity, gender, sizes, setSizes) {
  console.log(sizes);
  setSizes([
    ...sizes,
    {
      size: size,
      quantity: quantity,
      gender: gender,
      id: uid(),
    },
  ]);
  console.log(sizes);
}
