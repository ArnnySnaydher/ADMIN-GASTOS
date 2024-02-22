export const formatearCantidad = (cantidad) => {
  return Number(cantidad).toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
  });
};

export const generateID = ()=>{
  return self.crypto.randomUUID();
}
