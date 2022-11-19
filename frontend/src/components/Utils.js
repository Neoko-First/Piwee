// formatage des dates affichée sur l'app
export const dateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

// fonction qui permet de filtrer les entrées des input de l'app contre l'injection 
export const sanitizor = (value) => {
  // tableau des mots interdit (ajouter dans le tableau pour filtrer une nouvelle valeur)
  const redFlags = [
    "SELECT",
    "INSERT",
    "DELETE",
    "UPDATE",
    "CREATE",
    "DROP",
    "ALTER",
    "<script>",
  ];
  // si la valeur contient un mot interdit, c'est tchiao
  for (const redflag of redFlags) {
    if (value.includes(redflag)) {
      return false;
    }
  }
  // sinon c'est good
  return true;
};
