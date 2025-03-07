export function buildDict(list, key, uniq) {
    if (!Array.isArray(list)) {
        throw new Error("Le premier paramètre doit être une liste (array).");
    }
    if (typeof key !== "string") {
        throw new Error("La clé doit être une chaîne de caractères.");
    }

    return list.reduce((dictionary, item) => {
        const keyValue = item[key];

        if (keyValue === undefined) {
            throw new Error(`La clé '${key}' est introuvable dans l'object ${item}`);
        }

        if (!dictionary[keyValue]) dictionary[keyValue] = [];
      
        if (uniq) {
          if (!dictionary[keyValue].some(existingItem => JSON.stringify(existingItem).includes(JSON.stringify(item)))) dictionary[keyValue].push(item);
        } else {
          dictionary[keyValue].push(item);
        }
        return dictionary;
    }, {});
}