async function load(mobile) {
    try {
        /*if(mobile){
            const input_json = localStorage.getItem("userBSignsFromMobile");
        }
        else{
            const input_json = localStorage.getItem("userFavorites");
        }*/


        let input_json = document.getElementById("stor-input").value;


        if (!input_json.trim()) {

            try {
                input_json = await navigator.clipboard.readText();
                if (!input_json.trim()) {
                    throw new Error("Clipboard is empty or contains invalid data.");
                }
            } catch (clipboardError) {
                throw new Error("Failed to read from clipboard: " + clipboardError.message);
            }
        }

        // Parse the JSON input
        const jsonData = JSON.parse(input_json);

        jsonData.forEach(element => {
            // Mobile load switches these
            if (mobile) {
                if (element[1] === 'on') {
                    element[1] = 'off';
                } else {
                    element[1] = 'on';
                }
            }
            create_sign(element);
        });
    } catch (error) {
        show_error_popup(error);
    }
}

function show_error_popup(msg) {
    document.getElementById("error-popup-wrap").classList.add("showing");
    document.getElementById("error-msg").innerHTML = msg;
}
function hide_error_popup() {
    document.getElementById("error-popup-wrap").classList.remove("showing");
}

function show_print_dialog(){
    document.getElementById("print-dialog").classList.add("showing");

    let actualPagesCount = 0;

    for(const child of document.getElementById('print-container').children){
        if(!child.classList.contains('hidden')) actualPagesCount++;
    };

    if(actualPagesCount === 0){
        show_error_popup("You have not yet imported any signs.");
        document.getElementById('print-dialog').classList.remove('showing');
        return;
    }
    
    document.getElementById("print-dialog").querySelectorAll('#print-count').forEach(element => element.innerHTML = actualPagesCount);
}

function confirm_print(){
    document.getElementById("print-dialog").classList.remove("showing");
    window.print();
}

function cancel_print(){
    document.getElementById("print-dialog").classList.remove("showing");
}