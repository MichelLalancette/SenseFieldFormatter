// The mutation observer that will be called whenever a change happens to elements with the class qv-client
function handleMutation(mutation: MutationRecord): void {
  try {
    if (mutation.addedNodes.length) {
      const addedNode = mutation.addedNodes[0] as HTMLElement;
      if (addedNode.innerHTML.includes("expression-editor-wrapper")) {
        const expressionEditorFooterIndex: number = GetExpressionEditorFooderIndex("lui-dialog__footer", "expression-editor-wrapper");
        const footerElement = document.getElementsByClassName("lui-dialog__footer")[expressionEditorFooterIndex] as HTMLElement;

        const copyOutputDiv = CreateCopyOutputDiv();
        footerElement.prepend(copyOutputDiv);
        footerElement.classList.add("sff-expressionFooter");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function CreateCopyOutputDiv(): HTMLDivElement {
  // Create a div element for the copy output section
  const copyOutputDiv = document.createElement('div');
  copyOutputDiv.id = "div_SFF_CopyOutput";
  copyOutputDiv.classList.add("ng-scope", "sff-div-copyOutput");

  // Append the copy output button and label to the div
  copyOutputDiv.append(CreateCopyOutputButton(), CreateCopyOutputLabel());

  // Create the copy output button
  function CreateCopyOutputButton(): HTMLButtonElement {
    const copyOutputButton = document.createElement('button');
    copyOutputButton.id = "btn_SFF_CopyOutput";
    copyOutputButton.className = "sff-btn-copyOutput lui-button button";
    copyOutputButton.textContent = "Copy f(x) Output";

    // Add click event listener to the button
    copyOutputButton.addEventListener("click", handleCopyButtonClick);

    // Handle the click event
    function handleCopyButtonClick() {
      // Get the evaluated element
      const evaluatedElement = document.getElementsByClassName("evaluated")[0] as HTMLElement;

      if (evaluatedElement) {
        // If the evaluated element exists, copy its text content to the clipboard
        const outputText = evaluatedElement.innerText.trim();
        copyToClipboardPromise(outputText)
          .then(() => displayMessageInHTMLElement('lbl_SFF_CopyOutput', 'Success!', 500))
          .catch(() => displayMessageInHTMLElement('lbl_SFF_CopyOutput', 'Failed to copy.', 2500));
      } else {
        // If there is no evaluated element, display a message
        displayMessageInHTMLElement('lbl_SFF_CopyOutput', 'There\'s no expression to copy.', 2500);
      }
    }

    return copyOutputButton;
  }

  // Create the copy output label
  function CreateCopyOutputLabel(): HTMLLabelElement {
    const copyOutputLabel = document.createElement('label');
    copyOutputLabel.id = "lbl_SFF_CopyOutput";
    copyOutputLabel.className = "sff-lbl-copyOutput";
    copyOutputLabel.textContent = "";

    return copyOutputLabel;
  }

  return copyOutputDiv;
}



const MUTATION_OBSERVER = new MutationObserver(function (mutations) {
  mutations.forEach(handleMutation);
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
function copyToClipboardPromise(textToCopy: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => resolve())
        .catch(() => reject());
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        successful ? resolve() : reject();
      } catch (error) {
        reject();
      }
      textArea.remove();
    }
  });
}

const targetURLPattern = "https://*/dataloadeditor*"; // URL pattern with wildcards

function addFormatButton(): void {
  const targetURLPattern = "https://nortera.us.qlikcloud.com/dataloadeditor*"; // URL pattern with wildcards
  const toolbarDiv = document.querySelector("div[tid='qs-sub-toolbar']>div:first-child");

  if (toolbarDiv) {
    const button = document.createElement("button");
    button.textContent = "Apply Quick Format";
    button.addEventListener("click", applyQuickFormat);

    toolbarDiv.appendChild(button);
  }

  function applyQuickFormat(): void {
    const selectedText = window.getSelection()?.toString() ?? "";
    const transformedText = selectedText.toUpperCase();
    document.execCommand("insertText", false, transformedText);
  }
}

// Check URL on initial page load
if (window.location.href.match(targetURLPattern)) {
  addFormatButton();
}

// Observe URL changes
window.addEventListener("popstate", handleURLChange);

function handleURLChange(): void {
  if (window.location.href.match(targetURLPattern)) {
    addFormatButton();
  }
}
