const fetchSvg = async (userData) => {
  try {
    let name = (userData && userData.name) || "";
    const response = await fetch(
      `https://ui-avatars.com/api/?name=${name}?format=svg&bold=true&rounded=true`
    );

    if (response.ok) {
      const svgText = URL.createObjectURL(await response.blob());
      return svgText;
    } else {
      console.error("Error al obtener el SVG:", response.status);
    }
  } catch (error) {
    console.error("Error al obtener el SVG:", error);
  }
};
export default fetchSvg;
