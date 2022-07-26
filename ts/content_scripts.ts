// The mutation observer that will be called whenever a change happens to elements with the class qv-client
const MUTATION_OBSERVER = new MutationObserver(function (mutations) {
    mutations.forEach((mutation): void => {
        try {
            // If the element "expression-editor-wrapper" gets added to the DOM, it means an expression window was open.
            // Whenever an expression window opens, add the custom div/button/label to the page.
            if (mutation.addedNodes.length) {
                if ((<HTMLElement>mutation.addedNodes[0]).innerHTML.match("expression-editor-wrapper")) {
                    const expressionEditorFooterIndex: number = GetExpressionEditorFooderIndex("lui-dialog__footer", "expression-editor-wrapper");
                    
                    (<HTMLInputElement>document.getElementsByClassName("lui-dialog__footer")[expressionEditorFooterIndex]).prepend(CreateCopyOutputDiv()); // Prepending (adding at the start) of the div's child elements.
                    (<HTMLInputElement>document.getElementsByClassName("lui-dialog__footer")[expressionEditorFooterIndex]).classList.add("sff-expressionFooter"); // Add a custom css class to the footer to allow the button to appear on the left side.
                }
            }
        }
        catch (e: any) {
            console.log(e.message);
        }

        /**
         * CreateCopyOutputDiv creates a div with elements inside to allow the copying of the expression editor output.
         * @returns Returns a div containing a button to copy the output and a label to write error messages.
         */
        function CreateCopyOutputDiv(): HTMLDivElement {
            let copyOutputDiv = document.createElement('div');
            copyOutputDiv.id = "div_SFF_CopyOutput";
            copyOutputDiv.classList.add("ng-scope", "sff-div-copyOutput");
            copyOutputDiv.append(CreateCopyOutputButton(), CreateCopyOutputLabel());

            function CreateCopyOutputButton(): HTMLButtonElement {
                let copyOutputButton = document.createElement('button');
                copyOutputButton.id = "btn_SFF_CopyOutput";
                copyOutputButton.classList.add("sff-btn-copyOutput", "lui-button", "button");
                copyOutputButton.textContent = "Copy f(x) Output";
                copyOutputButton.onclick = function () {
                    if ((<HTMLInputElement>document.getElementsByClassName("evaluated")[0]) !== undefined) {
                        const outputText = (<HTMLInputElement>document.getElementsByClassName("evaluated")[0]).innerText.trim();
                        copyToClipboardPromise(outputText).then(function () {
                            displayMessageInHTMLElement('lbl_SFF_CopyOutput', 'Success!', 500);                            
                          });
                    }
                    else {
                        displayMessageInHTMLElement('lbl_SFF_CopyOutput', 'There\'s no expression to copy.', 2500);
                    }
                };
                return copyOutputButton;
            }

            function CreateCopyOutputLabel(): HTMLLabelElement {
                let copyOutputLabel = document.createElement('label');
                copyOutputLabel.id = "lbl_SFF_CopyOutput";
                copyOutputLabel.classList.add("sff-lbl-copyOutput");
                copyOutputLabel.textContent = "";

                return copyOutputLabel;
            }

            return copyOutputDiv;
        }
    })
});

// Creating a mutation observer on the class "qv-client" that represents the qlik page.
// This observer will notifiy the content-scripts on changes to the DOM and will trigger events.
const qlikSenseAppPage: Node = document.querySelector('.qv-client')!
MUTATION_OBSERVER.observe(qlikSenseAppPage, {
    childList: true
});

/**
 * Copies a string to the clipboard. Must be called from within an event handler such as click.
 * @param textToCopy 
 * @returns Returns a void Promise
 */
function copyToClipboardPromise(textToCopy: string) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise<void>((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}