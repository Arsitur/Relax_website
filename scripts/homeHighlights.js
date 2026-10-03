// The home showcase uses the same local demo catalogue as the menu.
// Prices are illustrative, not the restaurant's official price list.
export function createHomeHighlights(menu) {
  const product = (id, title) => {
    const item = menu.find(item => item.id === id);
    return {
      title,
      content: `${item.name}: ${item.description}`,
      detail: `${item.masa} ${item.unit} · ${item.price} MDL · preț orientativ`,
      link: `pages/menu.html?product=${encodeURIComponent(item.id)}`,
      action: `Vezi ${item.name}`,
    };
  };
  const pizza = menu.filter(item => item.category === "pizza-section");
  const sushi = menu.filter(item => item.category === "sushi-section");
  return {
    pizza: {
      label: "Pizza · alege după gust",
      slides: [
        product("pizza-demo-02", "Ce găsești într-o Capricciosa"),
        product("pizza-demo-03", "Pentru iubitorii de brânzeturi"),
        {
          title: "Clasică, picantă sau fără carne?",
          content: "Pepperoni și Diavola pentru un gust intens; Vegetariana pentru o combinație fără carne. Compară ingredientele înainte să alegi.",
          detail: `${pizza.length} variante · ${Math.min(...pizza.map(item => item.price))}–${Math.max(...pizza.map(item => item.price))} MDL · orientativ`,
          link: "pages/menu.html#pizza-section", action: "Descoperă toate pizzele",
        },
      ],
    },
    sushi: {
      label: "Sushi · rulouri și seturi",
      slides: [
        product("sushi-demo-01", "Philadelphia, ingredient cu ingredient"),
        product("sushi-demo-10", "O variantă fără pește"),
        {
          title: "Maki sau un rulou crocant?",
          content: "Maki cu somon pentru o combinație simplă; Tempura roll cu creveți și legume pentru o textură crocantă. În meniu găsești ingredientele și gramajul fiecăruia.",
          detail: `${sushi.length} variante · ${Math.min(...sushi.map(item => item.price))}–${Math.max(...sushi.map(item => item.price))} MDL · orientativ`,
          link: "pages/menu.html#sushi-section", action: "Explorează sushi",
        },
      ],
    },
    shaorma: {
      label: "Relax · mai mult de descoperit",
      slides: [
        {
          title: "De la mic dejun la o masă completă",
          content: "Ciorbe, salate, pește, carne și garnituri: nu trebuie să te oprești la pizza și sushi. Caută un preparat sau filtrează meniul după categorie.",
          detail: `${menu.length} preparate · ${new Set(menu.map(item => item.category)).size} categorii`,
          link: "pages/menu.html", action: "Deschide meniul complet",
        },
        {
          title: "Ai încercat un preparat? Spune cum a fost",
          content: "Fiecare produs are loc pentru o recenzie și o notă de la 1 la 5. Autentifică-te ca să lași propria impresie; o poți actualiza mai târziu.",
          detail: "Autentifică-te pentru a scrie o recenzie",
          link: "pages/menu.html", action: "Vezi preparatele și recenziile",
        },
        {
          title: "O întrebare înainte de vizită?",
          content: "Pentru ingrediente, alergeni sau alte detalii, folosește formularul de contact. Nu presupune că o variantă fără carne este automat potrivită pentru orice dietă.",
          detail: "Mesaj direct din pagina Contacte",
          link: "pages/contact.html", action: "Hai să vorbim",
        },
      ],
    },
  };
}
