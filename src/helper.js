

function createDatalist(list) {
    const choices = document.createElement("datalist");

    list.forEach(choice => {
        const choiceElement = document.createElement("option");
        choiceElement.value = choice;
        choices.appendChild(choiceElement);
    });

    return choices;
}

export { createDatalist } ;