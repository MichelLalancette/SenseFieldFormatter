/**
 * Displays a message for a duration into an HTML element.
 * @param {string} pElementId The HTML element to which we will be writing into.
 * @param {string} pMessage A string expression to display in the HTML element
 * @param {string} pTimeoutDuration The duration, in milliseconds, of how long the message will be displayed.
 */
function displayMessageInHTMLElement(pElementId: string, pMessage: string, pTimeoutDuration: number): void {
  let status = document.getElementById(pElementId);
  status!.textContent = pMessage;
  setTimeout(function () {
    status!.textContent = '';
  }, pTimeoutDuration);
}