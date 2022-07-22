class UserSettings {
  public isIgnoreFormatOnKeyField: boolean;
  public keyFieldIdentifier: string;
  public commaPosition: string;
  public fieldDelimiter: string;
  public isReplaceChars: boolean;
  public charsToReplace: string;
  public replaceWith: string;
  public isSpaceOutCapitals: boolean;
  public changeStringCase: string;
  public isSubfieldFieldName: boolean;
  public subfieldSeparator: string;
  public fieldAffixPosition: string;
  public fieldAffixValue: string;
  public useAliasAsSourceName: boolean;
  public isDarkModeTheme: boolean;
  public subfieldNo: number;

  constructor() {
    this.isIgnoreFormatOnKeyField = false;
    this.keyFieldIdentifier = "";
    this.commaPosition = "lc";
    this.fieldDelimiter = "";
    this.isReplaceChars = false;
    this.charsToReplace = "";
    this.replaceWith = "";
    this.isSpaceOutCapitals = false;
    this.changeStringCase = "doNothing";
    this.isSubfieldFieldName = false;
    this.subfieldSeparator = "";
    this.subfieldNo = 0;
    this.fieldAffixPosition = "doNothing";
    this.fieldAffixValue = "";
    this.useAliasAsSourceName = false;
    this.isDarkModeTheme = true;
  }
}


function setUserSettings(): void {
  userSettings.useAliasAsSourceName = (<HTMLInputElement>document.getElementById("isSourceFieldAlias")).checked;
  userSettings.isIgnoreFormatOnKeyField = (<HTMLInputElement>document.getElementById("isIgnoreKeyField")).checked;
  userSettings.keyFieldIdentifier = (<HTMLInputElement>document.getElementById("keyFieldIdentifier")).value;
  userSettings.commaPosition = (<HTMLInputElement>document.getElementById("commaPosition")).value;
  userSettings.fieldDelimiter = (<HTMLInputElement>document.getElementById("fieldDelimiter")).value;
  userSettings.isReplaceChars = (<HTMLInputElement>document.getElementById("isReplaceChars")).checked;
  userSettings.charsToReplace = (<HTMLInputElement>document.getElementById("charsToReplace")).value;
  userSettings.replaceWith = (<HTMLInputElement>document.getElementById("replacementChar")).value;
  userSettings.isSpaceOutCapitals = (<HTMLInputElement>document.getElementById("isSpaceOutCapitals")).checked;
  userSettings.changeStringCase = (<HTMLInputElement>document.getElementById("changeStringCase")).value;
  userSettings.isSubfieldFieldName = (<HTMLInputElement>document.getElementById("isSubfieldFields")).checked;
  userSettings.subfieldSeparator = (<HTMLInputElement>document.getElementById("subfieldSeparator")).value;
  userSettings.subfieldNo = parseInt((<HTMLInputElement>document.getElementById("subfieldno")).value);
  userSettings.fieldAffixPosition = (<HTMLInputElement>document.getElementById("fieldAffixPosition")).value;
  userSettings.fieldAffixValue = (<HTMLInputElement>document.getElementById("fieldAffixText")).value;
  userSettings.isDarkModeTheme = (<HTMLButtonElement>document.getElementById("toggleTheme")).value === "dark" ? true : false;
}

function setUserSettingsHTMLFields() {
  (<HTMLInputElement>document.getElementById("isSourceFieldAlias")).checked = userSettings.useAliasAsSourceName;
  (<HTMLInputElement>document.getElementById("isIgnoreKeyField")).checked = userSettings.isIgnoreFormatOnKeyField;
  (<HTMLInputElement>document.getElementById("keyFieldIdentifier")).value = userSettings.keyFieldIdentifier;
  (<HTMLInputElement>document.getElementById("commaPosition")).value = userSettings.commaPosition;
  (<HTMLInputElement>document.getElementById("fieldDelimiter")).value = userSettings.fieldDelimiter;
  (<HTMLInputElement>document.getElementById("isReplaceChars")).checked = userSettings.isReplaceChars;
  (<HTMLInputElement>document.getElementById("charsToReplace")).value = userSettings.charsToReplace;
  (<HTMLInputElement>document.getElementById("replacementChar")).value = userSettings.replaceWith;
  (<HTMLInputElement>document.getElementById("isSpaceOutCapitals")).checked = userSettings.isSpaceOutCapitals;
  (<HTMLInputElement>document.getElementById("changeStringCase")).value = userSettings.changeStringCase;
  (<HTMLInputElement>document.getElementById("isSubfieldFields")).checked = userSettings.isSubfieldFieldName;
  (<HTMLInputElement>document.getElementById("subfieldSeparator")).value = userSettings.subfieldSeparator;
  (<HTMLInputElement>document.getElementById("subfieldno")).value = parseInt(userSettings.subfieldNo.toString()) === 0 || userSettings.subfieldNo.toString() === "NaN" ? "" : userSettings.subfieldNo.toString();
  (<HTMLInputElement>document.getElementById("fieldAffixPosition")).value = userSettings.fieldAffixPosition;
  (<HTMLInputElement>document.getElementById("fieldAffixText")).value = userSettings.fieldAffixValue;
  (<HTMLInputElement>document.getElementById("toggleTheme")).value = userSettings.isDarkModeTheme ? "dark" : "light";
}

function saveUserSettings(): void {
  setUserSettings();

  chrome.storage.local.set({
    userConfiguration: userSettings
  });
}

/**
 * Listen for clicks on the buttons, and performs the appropriate action.
 */
function listenForClicks(): void {
  (<HTMLFormElement>document.getElementById("keyFieldIdentifier")).addEventListener("input", (e) => {
    toggleIgnoreOfKeyField();
  });

  document.addEventListener("change", (e) => {
    saveUserSettings();
    toggleDisplayOfElements();

    // displayMessageInHTMLElement("transformLbl", "Saved.", 500);
  });

  document.addEventListener("click", (e) => {
    const EVENTNAME = (<HTMLInputElement>e.target);


    switch (EVENTNAME.name) {
      case "toggleTheme":
        userSettings.isDarkModeTheme = !userSettings.isDarkModeTheme;
        toggleTheme();
        return saveUserSettings();
      case "isReplaceChars":
        return toggleCheckboxChildElements(EVENTNAME.name, 'replaceChar');
      case "isSubfieldFields":
        return toggleCheckboxChildElements(EVENTNAME.name, 'subField');
      case "fieldAffixPosition":
        return toggleDropDownChildElements(EVENTNAME.name, 'fieldAffix');
      case "submitBtn": // If we press the submit button, perform the field formatting procedure and paste to clipboard
        return formatFieldsAndCopyToClipboard();
      case "previewBtn": // If we press the submit button, perform the field formatting procedure and display in the preview without copying to clipboard
        return formatFieldsAndPreview();
      case "inputTab":
        return changeTab(EVENTNAME, 'inputText');
      case "outputTab":
        return changeTab(EVENTNAME, 'outputText');
    }
  });
}

function toggleIgnoreOfKeyField() {
  (<HTMLInputElement>document.getElementById("keyFieldIdentifier")).value.length > 0 ?
    (<HTMLFormElement>document.getElementById("ignoreFormatKeyFieldLabel")).style.display = ""
    : (<HTMLFormElement>document.getElementById("ignoreFormatKeyFieldLabel")).style.display = "none";
}

/**
 * Calls the toggle element functions to show/hide content in the page
 */
function toggleDisplayOfElements() {
  toggleCheckboxes();
  toggleDropdowns();
  toggleIgnoreOfKeyField();
}

/**
 * Loops through all the input elements of the page and will call the toggleCheckboxChildElements method for all checkboxes to show/hide their child content.
 */
function toggleCheckboxes() {
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByTagName("input");
  for (let i = 0; i < tabcontent.length; ++i) {
    if ((<HTMLInputElement>tabcontent[i]).type === "checkbox") {
      switch ((<HTMLInputElement>tabcontent[i]).id) {
        case "isReplaceChars":
          toggleCheckboxChildElements((<HTMLInputElement>tabcontent[i]).id, 'replaceChar');
        case "isSubfieldFields":
          toggleCheckboxChildElements((<HTMLInputElement>tabcontent[i]).id, 'subField');
      }
    }
  }
}

/**
 * Loops through all the input elements of the page and will call the toggleDropDownChildElements method for all dropdowns to show/hide their child content.
 */
function toggleDropdowns() {
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByTagName("select");
  for (let i = 0; i < tabcontent.length; ++i) {
    if ((<HTMLSelectElement>tabcontent[i]).type === "select-one") {
      switch ((<HTMLSelectElement>tabcontent[i]).id) {
        case "fieldAffixPosition":
          toggleDropDownChildElements((<HTMLSelectElement>tabcontent[i]).id, 'fieldAffix');
      }
    }
  }
}

/**
 * Shows/Hide the child elements of a dropdown. Child elements are anything that is "nested" below them.
 * @param pDropdownId The parent's dropdown id. Used to check wheter to show or hide the content
 * @param pChildClassName The child's class name to find in the DOM.
 */
function toggleDropDownChildElements(pDropdownId: string, pChildClassName: string) {
  let checkboxElement = (<HTMLInputElement>document.getElementById(pDropdownId));
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByClassName(pChildClassName);
  for (let i = 0; i < tabcontent.length; ++i) {
    if (checkboxElement.value !== "doNothing") {
      (<HTMLInputElement>tabcontent[i]).style.display = "inline"
    }
    else { (<HTMLInputElement>tabcontent[i]).style.display = "none"; }
  }
}

/**
 * Shows/Hide the child elements of a checkbox. Child elements are anything that is "nested" below them.
 * @param pCheckboxId The parent's checkbox id. Used to check wheter to show or hide the content
 * @param pChildClassName The child's class name to find in the DOM.
 */
function toggleCheckboxChildElements(pCheckboxId: string, pChildClassName: string) {
  let checkboxElement = (<HTMLInputElement>document.getElementById(pCheckboxId));
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByClassName(pChildClassName);
  for (let i = 0; i < tabcontent.length; ++i) {
    if (checkboxElement.checked) {
      (<HTMLInputElement>tabcontent[i]).style.display = "inline"
    }
    else { (<HTMLInputElement>tabcontent[i]).style.display = "none"; }
  }
}

function formatFieldsAndCopyToClipboard() {
  const FORMATTED_OUTPUT: string = formatInputFields();

  // Assigns the outputted fields into the clipboard 
  storeOutputToClipboard(FORMATTED_OUTPUT);
}

function formatFieldsAndPreview() {
  const FORMATTED_OUTPUT: string = formatInputFields();

  // Assigns the outputted fields into the clipboard 
  previewFormatting(FORMATTED_OUTPUT);
}

function formatInputFields() {
  // Split the string into an array for each line break, trim records, then remove empty rows
  let fieldArray = (<HTMLInputElement>document.getElementById("fieldInfo")).value.split(/[\r\n\\]+/).map(s => s.trim()).filter(function (str) { return str });

  let aliasFieldName: string;
  let sourceFieldName: string;
  let isKeyField: boolean;
  
  for (let i = 0; i < fieldArray.length; i++) {
    aliasFieldName = fieldArray[i];
    
    if (userSettings.useAliasAsSourceName) { aliasFieldName = aliasFieldName.replace(/(.+\sAS\s+)/i, ''); }
    else if (aliasFieldName.search(/(?<!\["`)\bAS\b(?![\w\s]*[\]"`])/gmi) !== -1) {
      aliasFieldName = aliasFieldName.substring(0, aliasFieldName.search(/(?<!\["`)\bAS\b(?![\w\s]*[\]"`])/gmi));
    }
    aliasFieldName = removeDelimiter(aliasFieldName);
    sourceFieldName = AddFieldDelimiter(aliasFieldName); // Create the source field name by wrapping it with delimiters

    isKeyField = fieldIsAKeyField(aliasFieldName); // Check if the key field is a key Identifier using the configuration

    if (userSettings.isSubfieldFieldName) { aliasFieldName = applySubField(aliasFieldName) };
    aliasFieldName = replaceChars(aliasFieldName);
    // Add spaces then add the prefix or suffix and finally wrap with double quotes ot square brackets
    aliasFieldName = spaceOutCapitals(aliasFieldName, isKeyField);
    aliasFieldName = setFieldCase(aliasFieldName);
    aliasFieldName = addAffix(aliasFieldName, isKeyField);
    aliasFieldName = AddFieldDelimiter(aliasFieldName);

    fieldArray[i] = insertCommaIntoArrayValue(sourceFieldName + " AS " + aliasFieldName, fieldArray.length, i);
  }

  const FORMATTED_OUTPUT: string = fieldArray.join("\r\n");

  // Formats the fields according to the user settings 
  // then transforms the array into a string with linebreaks between each record
  return FORMATTED_OUTPUT;
}

function previewFormatting(formatOutput: string) {
  (<HTMLInputElement>document.getElementById("formattingOutput")).value = formatOutput;
  changeTab((<HTMLInputElement>document.getElementById("outputTab")), 'outputText');
}

function coalesce([]) {
  return [].find.call(arguments, x => x !== null && x !== undefined);
}

function storeOutputToClipboard(newClip: string): void {
  navigator.clipboard.writeText(newClip).then(function () {
    displayMessageInHTMLElement('transformLbl', 'Success!', 500);
  }, function () {
    displayMessageInHTMLElement('transformLbl', 'Failed... Something went wrong', 2000);
  });
}

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

/**
 * Adds a field delimiter, either square brackets or double quotes, to an input string.
 * @param {string} pInputField String expression to which we'll add delimiters, at the start and end of the string.
 * @returns {string} A string wrapped by delimiters.
 */
function AddFieldDelimiter(pInputField: string): string {
  return userSettings.fieldDelimiter === 'sb'
    ? "[" + pInputField + "]"
    : '"' + pInputField + '"';
}

/**
 * Function to insert a comma to a value at the leftmost or rightmost side.
 * A comma will not be added if we value is the first from the array and it's a leading comma.
 * A comma will not be added if we value is the last from the array and it's a trailing comma.
 * @param {string} pFieldValue String expression to which we will be adding a comma to the leftmost or right most side.
 * @param {string} pArraySize The total array size from which we get the pFieldValue.
 * @param {string} pArrayIndex The current index of the array.
 * @returns {string} A string with an added comma.
 */
function insertCommaIntoArrayValue(pFieldValue: string, pArraySize: number, pArrayIndex: number): string {

  const IS_LEADING_COMMA: boolean = userSettings.commaPosition === 'lc' ? true : false;
  const IS_FINAL_ROW: boolean = pArraySize - 1 === pArrayIndex ? true : false;
  const IS_FIRST_ROW: boolean = pArrayIndex === 0 ? true : false;

  let outputText: string;

  if (IS_LEADING_COMMA) {
    outputText = IS_FIRST_ROW ? pFieldValue : "," + pFieldValue;
  } else {
    outputText = IS_FINAL_ROW ? pFieldValue : pFieldValue + ",";
  }

  return outputText;
}

/**
 * Removes characters from the rightmost and leftmost side if they match the inputted character to remove
 *
 * @param {string} pFieldValue String expression from which the leftmost and rightmost characters will be removed.
 * @param {string} pCharToRemove The specified character to remove.
 * @returns {Array} An array of strings where the first and last characters have been removed if matching the input and if the character was found.
 */
function removeCharacter(pFieldValue: string, pCharToRemove: string): string[] {

  let isCharacterFound: string = "false";

  if (left(pFieldValue, 1) === pCharToRemove) {
    pFieldValue = pFieldValue.slice(1).trim();
    isCharacterFound = "true";
  }
  if (right(pFieldValue, 1) === pCharToRemove) {
    pFieldValue = pFieldValue.slice(0, -1).trim();
    isCharacterFound = "true";
  }

  let returnInformation: Array<string> = [pFieldValue, isCharacterFound]

  return returnInformation;
}

/**
 * Extracts characters beginning from the rightmost side to the left
 *
 * @param {string} pStr String expression from which the leftmost characters are returned
 * @param {string} pChrLength Numeric expression indicating how many characters to return.
 * @returns {string} A string containing a specified number of characters from the right side of a string.
 */
function right(pStr: string, pChrLength: number): string {
  return pStr.slice(pStr.length - pChrLength, pStr.length);
}

/**
 * Extracts characters beginning from the leftmost side to the right
 *
 * @param {string} pStr String expression from which the leftmost characters are returned
 * @param {string} pChrLength Numeric expression indicating how many characters to return.
 * @returns {string} A string containing a specified number of characters from the left side of a string.
 */
function left(pStr: string, pChrLength: number): string {
  return pStr.slice(0, pChrLength - pStr.length);
}

/**
 * Adds an affix. When not a primary key, either as a prefix or suffix to an input string.
 * If the field is a primary key and a prefix, we insert right after the Key identifier, otherwise, normally as a suffix.
 *
 * @param {string} pFieldValue The string to which we will be adding the FIELD_AFFIX_TEXT either at the beginning or end.
 * @param {boolean} pIsKeyField A boolean that indicates if the field is a key field, often prefixed with %
 * @returns {string} A string prefixed or suffixed with the configured affix.
 */
function addAffix(pFieldValue: string, pIsKeyField: boolean): string {

  if (userSettings.fieldAffixPosition === "doNothing") {
    return pFieldValue;
  }

  if (!pIsKeyField) {

    pFieldValue = userSettings.fieldAffixPosition === 'suffix'
      ? pFieldValue + userSettings.fieldAffixValue
      : userSettings.fieldAffixValue + pFieldValue;
  }
  else if (!userSettings.isIgnoreFormatOnKeyField) {
    pFieldValue = userSettings.fieldAffixPosition === 'suffix'
      ? pFieldValue + userSettings.fieldAffixValue
      : pFieldValue.slice(0, userSettings.keyFieldIdentifier.length) 
          + userSettings.fieldAffixValue 
          + pFieldValue.slice(userSettings.keyFieldIdentifier.length);
  }

  return pFieldValue;
}

function removeDelimiter(pFieldValue: string) {

  let returnInfo: Array<string>;

  let fieldDelimiterList = ['[', ']', '"', ",", '`'];
  for (let j = 0; j < fieldDelimiterList.length; j++) {

    returnInfo = removeCharacter(pFieldValue, fieldDelimiterList[j]);

    pFieldValue = returnInfo[0]; // Getting the string information of the transformed string

    // Special case: Because we iterate over the list in a specific order, it's possible the comma may happen before the other characters.
    // If one of the character is found, start the field delimiter loop over to make sure we didn't miss a character that was not first or last.
    // e.g. ,"my field" will need to start over to make sure we don't miss the double quote right after the comma
    if (JSON.parse(returnInfo[1])) { j = -1; }
  }

  return pFieldValue;
}

function fieldIsAKeyField(pInputString: string) {
  return pInputString.startsWith(userSettings.keyFieldIdentifier) && userSettings.keyFieldIdentifier.length > 0 ? true : false;
}

function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
}

/**
 * Returns a string with a space before each capital letter, if the user has enabled the option, otherwise returns the string as is, except for key fields
 * that are returned as-is.
 *
 * @param {string} pInputString The string containing the field to add spaces to, depending on the user configuration.
 * @param {string} pIsKeyField A boolean that indicates if the field is a key field, often prefixed with %
 * @returns {string} Returns the initial string if the option is disabled, otherwise returns a string with a space before each capital letter, unless it's a key field.
 */
function spaceOutCapitals(pInputString: string, pIsKeyField: boolean): string {
  return userSettings.isSpaceOutCapitals && !pIsKeyField
    ? pInputString.replace(/(?<![A-Z])([A-Z])/g, ' $1').trim().replace(/\s\s+/g, ' ')
    : pInputString;
}

/**
 * Changes which tab is active in the page, showing the active one's content and hidding the inactive's.
 * @param {HTMLInputElement} event The HTML Dom that triggered the action
 * @param {string} tabName The tab to set active
 */
function changeTab(event: HTMLInputElement, tabName: string): void {
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    (<HTMLInputElement>tabcontent[i]).style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  let tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  (<HTMLInputElement>document.getElementById(tabName)).style.display = "block";
  event.className += " active";
}


function replaceChars(pInputString: string): string {
  const FIND_WHAT_ARRAY = userSettings.charsToReplace.split('');

  const REPLACE_WITH = userSettings.replaceWith;

  FIND_WHAT_ARRAY.forEach(element => pInputString = pInputString.replace(element, REPLACE_WITH));

  return pInputString;
}

function setFieldCase(pInputString: string): string {

  let fieldString = pInputString;

  switch (userSettings.changeStringCase) {
    case "doNothing":
      break;
    case "upper":
      fieldString = fieldString.toUpperCase();
      break;
    case "lower":
      fieldString = fieldString.toLowerCase();
      break;
    case "capitalize":
      fieldString = fieldString.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      break;
    default: break;
  };

  return fieldString;
}

function applySubField(pIntputString: string): string {
  const SUB_FIELD_ARRAY = pIntputString.split(userSettings.subfieldSeparator);
  if (userSettings.subfieldNo - 1 > SUB_FIELD_ARRAY.length || userSettings.subfieldNo - 1 === SUB_FIELD_ARRAY.length) {
    return SUB_FIELD_ARRAY[0];
  } else {
    return SUB_FIELD_ARRAY[userSettings.subfieldNo - 1];
  }
}

function toggleTheme(): any {

  if (userSettings.isDarkModeTheme) {
    (<HTMLButtonElement>document.getElementById("toggleTheme")).value = "dark";
    (<HTMLButtonElement>document.getElementById("toggleTheme")).innerText = "Toggle Dark Mode";
  }
  else {
    (<HTMLButtonElement>document.getElementById("toggleTheme")).value = "light";
    (<HTMLButtonElement>document.getElementById("toggleTheme")).innerText = "Toggle Light Mode";
  }

  let tabElements = (<HTMLCollection>document.getElementsByClassName("tab"));
  for (let i = 0; i < tabElements.length; i++) {
    tabElements[i].classList.toggle("tablight");
  }

  let flexSectElements = (<HTMLCollection>document.getElementsByClassName("flex-sect"));
  for (let i = 0; i < flexSectElements.length; i++) {
    flexSectElements[i].classList.toggle("flex-sect-light");
  }

  let fieldTextInputs = (<HTMLCollection>document.getElementsByClassName("fieldTextInput"));
  for (let i = 0; i < fieldTextInputs.length; i++) {
    fieldTextInputs[i].classList.toggle("fieldTextInput-light");
  }

  let smallFieldTextInputs = (<HTMLCollection>document.getElementsByClassName("smallInput"));
  for (let i = 0; i < smallFieldTextInputs.length; i++) {
    smallFieldTextInputs[i].classList.toggle("smallInput-light");
  }

  let labels = (<HTMLCollection>document.getElementsByClassName("label"));
  for (let i = 0; i < labels.length; i++) {
    labels[i].classList.toggle("label-light");
  }

  let optionLabels = (<HTMLCollection>document.getElementsByClassName("option-label"));
  for (let i = 0; i < optionLabels.length; i++) {
    optionLabels[i].classList.toggle("option-label-light");
  }

  let dropdowns = (<HTMLCollection>document.getElementsByClassName("dropdown"));
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.toggle("dropdown-light");
  }


  let headers = (<HTMLCollection>document.getElementsByTagName("header"));
  for (let i = 0; i < headers.length; i++) {
    headers[i].classList.toggle(".header-light");
  }
}

function initializeTheme() {
  if (!userSettings.isDarkModeTheme) {
    toggleTheme();
  }
}

let userSettings = new UserSettings();
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
try {
  chrome.storage.local.get(['userConfiguration'], (result) => {
    if (result.userConfiguration !== undefined) {
      userSettings = Object.assign({}, userSettings, result.userConfiguration);
    } else { saveUserSettings(); }

    setUserSettingsHTMLFields();
    toggleDisplayOfElements();
    initializeTheme();

    listenForClicks();
  });
}
catch (e: any) {
  console.log(e.message);
}