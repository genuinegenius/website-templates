function id(element) {
    return document.getElementById(element);
}

let menuState = [];
let count = 0;

document.querySelectorAll('[buttons_menu]').forEach(e => {
    menuState[count++] = e.innerHTML;
});

document.addEventListener("click", e => {
    let button_add = e.target.matches('[button_menu_add]');
    let button_edit = e.target.matches('[edit_pen]');

    if ((!button_add && e.target.closest('[button_menu_add_container]') != null) ||
        (!button_edit && e.target.closest('[button_menu_edit_container]') != null)) return

    let currentB;
    if (button_add) {
        currentB = e.target.closest('[button_menu_add_container]')
        currentB.classList.toggle('active')
        function makeContentForAddMenu() {
            let html = "";
            menuState.forEach(element => {
                let currentElement = "";
                let auxElement = element;
                if (element.length > 5) {
                    element = element.charAt(0) + element.charAt(1) + element.charAt(2) + element.charAt(3) + element.charAt(4) + "..";
                }
                currentElement = '<div class="rows">'
                    + '<div class="value">' + element + '</div>'
                    + '<div class="choices">'
                    + '<button class="choice_structure_x" onclick="getDataForDelete(event)" value="' + auxElement + '" delete_menu_option>&#10006;</button>'
                    + '<button class="choice_structure_edit" onclick="getDataForEdit(event)" value="' + auxElement + '" edit_menu_option>&#9998;</button>'
                    + '</div>'
                    + '</div>';
                html = html + currentElement;
            });
            html = html + '<button class="row_add_more">&#10010;</button>';
            return html;
        }


        id("menu_add_content").innerHTML = makeContentForAddMenu();
    }
    if (button_edit) {
        currentB = e.target.closest('[button_menu_edit_container]')
        currentB.classList.toggle('active')
    }

    document.querySelectorAll('[button_menu_add_container].active').forEach(dropdown => {
        if (dropdown === currentB) return
        dropdown.classList.remove('active')
    })
    document.querySelectorAll('[button_menu_edit_container].active').forEach(dropdown => {
        if (dropdown === currentB) return
        dropdown.classList.remove('active')
    })
})

function getDataForDelete(e) {
    let currentData = e.currentTarget.value;

    let elementToRemove = id(currentData);
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

function getDataForEdit(e) {
    console.log(e.currentTarget.value);
}
