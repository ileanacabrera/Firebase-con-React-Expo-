const calcularPromedioAPI = async (lista) => {
  try {
    const response = await fetch('https://364p73ogyf.execute-api.us-east-1.amazonaws.com/calcularpromedios', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ edades: lista }),
    });

    const data = await response.json();
    setPromedio(data.promedio || null);
  } catch (error) {
    console.error("Error al calcular promedio en API:", error);
  }
};
