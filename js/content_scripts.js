"use strict";
// The mutation observer that will be called whenever a change happens to elements with the class qv-client
const MUTATION_OBSERVER = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
        try {
            // If the element "expression-editor-wrapper" gets added to the DOM, it means an expression window was open.
            // Whenever an expression window opens, add the custom div/button/label to the page.
            if (mutation.addedNodes.length) {
                if (mutation.addedNodes[0].innerHTML.match("expression-editor-wrapper")) {
                    document.getElementsByClassName("lui-dialog__footer")[0].prepend(CreateCopyOutputDiv()); // Prepending (adding at the start) of the div's child elements.
                    document.getElementsByClassName("lui-dialog__footer")[0].classList.add("sff-expressionFooter"); // Add a custom css class to the footer to allow the button to appear on the left side.
                }
            }
        }
        catch (e) {
            console.log(e.message);
        }
        /**
         * CreateCopyOutputDiv creates a div with elements inside to allow the copying of the expression editor output.
         * @returns Returns a div containing a button to copy the output and a label to write error messages.
         */
        function CreateCopyOutputDiv() {
            let copyOutputDiv = document.createElement('div');
            copyOutputDiv.id = "div_SFF_CopyOutput";
            copyOutputDiv.classList.add("ng-scope", "sff-div-copyOutput");
            copyOutputDiv.append(CreateCopyOutputButton(), CreateCopyOutputLabel());
            function CreateCopyOutputButton() {
                let copyOutputButton = document.createElement('button');
                copyOutputButton.id = "btn_SFF_CopyOutput";
                copyOutputButton.classList.add("sff-btn-copyOutput", "lui-button", "button");
                copyOutputButton.textContent = "Copy f(x) Output";
                copyOutputButton.onclick = function () {
                    if (document.getElementsByClassName("evaluated")[0] !== undefined) {
                        const outputText = document.getElementsByClassName("evaluated")[0].innerText.trim();
                        navigator.clipboard.writeText(outputText);
                    }
                    else {
                        displayMessageInHTMLElement('lbl_SFF_CopyOutput', 'There\'s no expression to copy.', 2500);
                    }
                };
                return copyOutputButton;
            }
            function CreateCopyOutputLabel() {
                let copyOutputLabel = document.createElement('label');
                copyOutputLabel.id = "lbl_SFF_CopyOutput";
                copyOutputLabel.classList.add("sff-lbl-copyOutput");
                copyOutputLabel.textContent = "";
                return copyOutputLabel;
            }
            return copyOutputDiv;
        }
    });
});
// Creating a mutation observer on the class "qv-client" that represents the qlik page.
// This observer will notifiy the content-scripts on changes to the DOM and will trigger events.
const qlikSenseAppPage = document.querySelector('.qv-client');
MUTATION_OBSERVER.observe(qlikSenseAppPage, {
    childList: true
});
