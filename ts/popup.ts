class UserSettings {
  public isIgnoreFormatOnKeyField: boolean;
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
  public useAliasAsSourceName: boolean;
  public isDarkModeTheme: boolean;
  public subfieldNo: number;
  public isAlignAliases: boolean;
  public isFormatOnly: boolean;
  public fieldSortOrder: string;
  public keySourcePosition: string;
  public keySourceIdentifier: string;
  public keyAliasPosition: string;
  public keyAliasIdentifier: string;

  constructor() {
    this.isIgnoreFormatOnKeyField = false;
    this.commaPosition = "lc";
    this.fieldDelimiter = "sb";
    this.isReplaceChars = false;
    this.charsToReplace = "";
    this.replaceWith = "";
    this.isSpaceOutCapitals = false;
    this.changeStringCase = "doNothing";
    this.isSubfieldFieldName = false;
    this.subfieldSeparator = "";
    this.subfieldNo = 0;
    this.fieldAffixPosition = "doNothing";
    this.useAliasAsSourceName = false;
    this.isFormatOnly = false;
    this.isDarkModeTheme = true;
    this.isAlignAliases = false;
    this.fieldSortOrder = "doNothing";
    this.keySourcePosition = "start";
    this.keySourceIdentifier = "";
    this.keyAliasPosition = "start";
    this.keyAliasIdentifier = "";
  }

  public loadFieldsFromStorage(pStorageData: UserSettings) {
    this.isIgnoreFormatOnKeyField = pStorageData.isIgnoreFormatOnKeyField;
    this.commaPosition = pStorageData.commaPosition;
    this.fieldDelimiter = pStorageData.fieldDelimiter;
    this.isReplaceChars = pStorageData.isReplaceChars;
    this.charsToReplace = pStorageData.charsToReplace;
    this.replaceWith = pStorageData.replaceWith;
    this.isSpaceOutCapitals = pStorageData.isSpaceOutCapitals;
    this.changeStringCase = pStorageData.changeStringCase;
    this.isSubfieldFieldName = pStorageData.isSubfieldFieldName;
    this.subfieldSeparator = pStorageData.subfieldSeparator;
    this.subfieldNo = pStorageData.subfieldNo;
    this.fieldAffixPosition = pStorageData.fieldAffixPosition;
    this.useAliasAsSourceName = pStorageData.useAliasAsSourceName;
    this.isFormatOnly = pStorageData.isFormatOnly;
    this.isDarkModeTheme = pStorageData.isDarkModeTheme;
    this.isAlignAliases = pStorageData.isAlignAliases;
    this.fieldSortOrder = pStorageData.fieldSortOrder;
    this.keySourcePosition = pStorageData.keySourcePosition;
    this.keySourceIdentifier = pStorageData.keySourceIdentifier;
    this.keyAliasPosition = pStorageData.keyAliasPosition;
    this.keyAliasIdentifier = pStorageData.keyAliasIdentifier;
  }

  public isKeyFieldGeneratorActive() {
    return this.keySourceIdentifier.trim().length > 0 && this.keyAliasIdentifier.trim().length > 0;
  }
}

class Field {
  public fieldSourceName: string;
  public fieldAliasName: string;
  public isKeyField: boolean;

  constructor() {
    this.fieldSourceName = "";
    this.fieldAliasName = "";
    this.isKeyField = false;
  }

  public getFieldNameWithAlias(): string {
    return userSettings.isFormatOnly ? this.fieldSourceName.trim() : this.fieldSourceName + " AS " + this.fieldAliasName;
  }
}

const REGEX_MATCH_AS: RegExp = /(?<!\["`)\bAS\b(?![\w\s]*[\]"`])/gmi; // (?<!\["`)\bAS\b(?![\w\s]*[\]"`]) Finds an AS that is not between delimiters


function setUserSettings(): void {
  userSettings.useAliasAsSourceName = (<HTMLInputElement>document.getElementById("isSourceFieldAlias")).checked;
  userSettings.isIgnoreFormatOnKeyField = (<HTMLInputElement>document.getElementById("isIgnoreKeyField")).checked;
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
  userSettings.isDarkModeTheme = (<HTMLButtonElement>document.getElementById("toggleTheme")).value === "dark" ? true : false;
  userSettings.isAlignAliases = (<HTMLInputElement>document.getElementById("alignAlias")).checked;
  userSettings.isFormatOnly = (<HTMLInputElement>document.getElementById("isFormatOnly")).checked;
  userSettings.fieldSortOrder = (<HTMLInputElement>document.getElementById("sortFields")).value;

  userSettings.keySourcePosition = (<HTMLInputElement>document.getElementById("sourceKeyPosition")).value;
  userSettings.keySourceIdentifier = (<HTMLInputElement>document.getElementById("sourceKeyIdentifier")).value;
  userSettings.keyAliasPosition = (<HTMLInputElement>document.getElementById("aliasKeyPosition")).value;
  userSettings.keyAliasIdentifier = (<HTMLInputElement>document.getElementById("aliasKeyIdentifier")).value;
}

function setUserSettingsHTMLFields() {
  (<HTMLInputElement>document.getElementById("isSourceFieldAlias")).checked = userSettings.useAliasAsSourceName;
  (<HTMLInputElement>document.getElementById("isIgnoreKeyField")).checked = userSettings.isIgnoreFormatOnKeyField;
  (<HTMLInputElement>document.getElementById("commaPosition")).value = userSettings.commaPosition;
  (<HTMLInputElement>document.getElementById("fieldDelimiter")).value = userSettings.fieldDelimiter;
  (<HTMLInputElement>document.getElementById("isReplaceChars")).checked = userSettings.isReplaceChars;
  (<HTMLInputElement>document.getElementById("charsToReplace")).value = userSettings.charsToReplace;
  (<HTMLInputElement>document.getElementById("replacementChar")).value = userSettings.replaceWith;
  (<HTMLInputElement>document.getElementById("isSpaceOutCapitals")).checked = userSettings.isSpaceOutCapitals;
  (<HTMLInputElement>document.getElementById("changeStringCase")).value = userSettings.changeStringCase;
  (<HTMLInputElement>document.getElementById("isSubfieldFields")).checked = userSettings.isSubfieldFieldName;
  (<HTMLInputElement>document.getElementById("subfieldSeparator")).value = userSettings.subfieldSeparator;
  (<HTMLInputElement>document.getElementById("subfieldno")).value = userSettings.subfieldNo !== undefined ? parseInt(userSettings.subfieldNo.toString()) === 0 || userSettings.subfieldNo.toString() === "NaN" ? "" : userSettings.subfieldNo.toString() : "0"; // Added check for undefinied variable to avoid toString on undefined field
  (<HTMLInputElement>document.getElementById("fieldAffixPosition")).value = userSettings.fieldAffixPosition;
  (<HTMLInputElement>document.getElementById("toggleTheme")).value = userSettings.isDarkModeTheme ? "dark" : "light";
  (<HTMLInputElement>document.getElementById("alignAlias")).checked = userSettings.isAlignAliases;
  (<HTMLInputElement>document.getElementById("isFormatOnly")).checked = userSettings.isFormatOnly;
  (<HTMLInputElement>document.getElementById("sortFields")).value = userSettings.fieldSortOrder;
  (<HTMLInputElement>document.getElementById("sourceKeyPosition")).value = userSettings.keySourcePosition;
  (<HTMLInputElement>document.getElementById("sourceKeyIdentifier")).value = userSettings.keySourceIdentifier;
  (<HTMLInputElement>document.getElementById("aliasKeyPosition")).value = userSettings.keyAliasPosition;
  (<HTMLInputElement>document.getElementById("aliasKeyIdentifier")).value = userSettings.keyAliasIdentifier;
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
  document.addEventListener("change", () => {
    saveUserSettings();
    toggleDisplayOfElements();
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
        return changeTab(EVENTNAME, 'inputText', 'tabcontent', 'tablinks');
      case "outputTab":
        return changeTab(EVENTNAME, 'outputText', 'tabcontent', 'tablinks');
    }
  });
}

/**
 * Calls the toggle element functions to show/hide content in the page
 */
function toggleDisplayOfElements() {
  toggleCheckboxes();
  toggleDropdowns();
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
  try {
    const FORMATTED_OUTPUT: string = buildOutput();

    // Assigns the outputted fields into the clipboard 
    previewFormatting(FORMATTED_OUTPUT);

    // Assigns the outputted fields into the clipboard 
    storeOutputToClipboard(FORMATTED_OUTPUT);
  }
  catch (e) {
    console.error(e);
  }
}

function formatFieldsAndPreview() {
  try {
    const FORMATTED_OUTPUT: string = buildOutput();

    // Assigns the outputted fields into the clipboard 
    previewFormatting(FORMATTED_OUTPUT);
  }
  catch (e) {
    console.error(e);
  }
}

function buildOutput() {

  let fieldInfo = (<HTMLInputElement>document.getElementById("fieldInfo")).value;
  let loadStatement: string = "";
  ({ fieldInfo, loadStatement } = extractLoadSection(fieldInfo));

  let fromTableStatement: string = "";
  // Check if the keywords Resident or From (case insensitive) are matched and not preceded directly by AS or a comma. This indicates it's a Table Load, not a field
  ({ fieldInfo, fromTableStatement } = extractFromSection(fieldInfo));

  // Split the string into an array for each line break, trim records, then remove empty rows
  let fieldArray: string[] = fieldInfo
    .split(/[\r\n\\]+/)
    .map(s => s.trim())
    .filter(function (str) { return str });

  fieldArray = parseFields(fieldArray); // Cleanup the input fields before formatting

  const MAX_ARRAY_FIELD_LENGTH: number = Math.max(...(fieldArray.map(el => el.length))); // Get the longest field name to align the aliases

  let fieldArrayObject: Field[] = parseInputForFields(fieldArray, MAX_ARRAY_FIELD_LENGTH);

  if (!userSettings.isFormatOnly) {
    formatFieldAliases();
  }

  let fieldsOutput: string[] = new Array();
  if (loadStatement.length > 0) { fieldsOutput.push(loadStatement); } // Add Load statement that comes before the fields
  fieldsOutput = fieldsOutput.concat(fieldArrayObjectToArrayOfString(sortArray(fieldArrayObject)).map((elem: string, i: number) => {
    return insertCommaIntoArrayValue(elem, fieldArray.length, i);
  })); // Add the Fields
  if (fromTableStatement.length > 0) { fieldsOutput.push(fromTableStatement); } // Add the From/Resident after the fields

  // Transform the array into a string with linebreaks between each record
  return fieldsOutput.join("\r\n");

  function parseInputForFields(pFieldArray: string[], pMaxFieldLen: number) {

    let fieldArrayObject: Field[] = new Array();

    pFieldArray.forEach(e => {
      let sourceField: Field = new Field();
      let fieldName: string = e.trim();
      if (userSettings.isFormatOnly) {
        fieldName = fieldName.substring(fieldName.search(REGEX_MATCH_AS));
      }
      sourceField.fieldSourceName = AddFieldDelimiter(fieldName).padEnd(userSettings.isAlignAliases ? pMaxFieldLen + 2 : 0, ' '); // Align the "AS" used in aliasing so that all the aliases start at the same character index
      sourceField.fieldAliasName = fieldName;
      sourceField.isKeyField = fieldIsAKeyField(fieldName); // Check if the key field is a key Identifier using the configuration
      fieldArrayObject.push(sourceField);
    }
    );

    return fieldArrayObject;
  }

  function formatFieldAliases() {
    for (let i = 0; i < fieldArrayObject.length; i++) {
      if (!fieldArrayObject[i].isKeyField || (fieldArrayObject[i].isKeyField && !userSettings.isIgnoreFormatOnKeyField)) {
        if (userSettings.isSubfieldFieldName) { fieldArrayObject[i].fieldAliasName = applySubField(fieldArrayObject[i].fieldAliasName); };
        if (userSettings.isReplaceChars) { fieldArrayObject[i].fieldAliasName = replaceChars(fieldArrayObject[i].fieldAliasName); }
        // Add spaces then add the prefix or suffix and finally wrap with double quotes ot square brackets
        if (userSettings.isSpaceOutCapitals) { fieldArrayObject[i].fieldAliasName = spaceOutCapitals(fieldArrayObject[i]); }
        fieldArrayObject[i].fieldAliasName = addAffix(fieldArrayObject[i]);
        fieldArrayObject[i].fieldAliasName = setFieldCase(fieldArrayObject[i].fieldAliasName);
        if (fieldArrayObject[i].isKeyField) { fieldArrayObject[i].fieldAliasName = addKeyAffixToAlias(fieldArrayObject[i].fieldAliasName); };
      }
      else { fieldArrayObject[i].fieldAliasName = addKeyAffixToAlias(fieldArrayObject[i].fieldAliasName); }

      fieldArrayObject[i].fieldAliasName = AddFieldDelimiter(fieldArrayObject[i].fieldAliasName);
    }
  }
}

function fieldArrayObjectToArrayOfString(pFieldArrayObject: Field[]): string[] {

  let fieldArrayStrings: string[] = new Array();
  for (let i = 0; i < pFieldArrayObject.length; i++) {
    fieldArrayStrings.push(pFieldArrayObject[i].getFieldNameWithAlias());
  }

  return fieldArrayStrings;
}

function extractFromSection(pFieldInfo: string) {
  const SOURCE_TABLE_INDEX = pFieldInfo.search(/\w*(?<!((as)|,)\s*)(?<!\["`)(From|Resident)\b(?![\w\s]*[\]"`])/gsi);

  let fromTableStatement: string = "";

  if (SOURCE_TABLE_INDEX > -1) {
    fromTableStatement = pFieldInfo.slice(SOURCE_TABLE_INDEX).trimEnd(); // Take everyting up to the Load word
    pFieldInfo = pFieldInfo.slice(0, SOURCE_TABLE_INDEX); // Remove the Load and keep everything to the end of string
  }

  return { fieldInfo: pFieldInfo, fromTableStatement };
}

function extractLoadSection(pFieldInfo: string,) {
  const LOAD_STATEMENT_INDEX = pFieldInfo.search(/\w*(?<!,\s*)Load/gsi);

  const LOAD_LABEL = 'Load';

  let loadStatement: string = "";

  if (LOAD_STATEMENT_INDEX > -1) {
    loadStatement = pFieldInfo.slice(0, LOAD_STATEMENT_INDEX + LOAD_LABEL.length).trimStart(); // Take everyting up to the Load word
    pFieldInfo = pFieldInfo.slice(LOAD_STATEMENT_INDEX + LOAD_LABEL.length); // Remove the Load and keep everything to the end of string
  }
  return { fieldInfo: pFieldInfo, loadStatement };
}

function parseFields(pFieldArray: string[]) {
  for (let i = 0; i < pFieldArray.length; i++) {
    if (userSettings.useAliasAsSourceName) { pFieldArray[i] = pFieldArray[i].replace(/(.+\sAS\s+)/i, ''); } // (.+\sAS\s+) matches everything up to the AS part of the alias
    else if (pFieldArray[i].search(REGEX_MATCH_AS) !== -1) {
      pFieldArray[i] = pFieldArray[i].substring(0, pFieldArray[i].search(REGEX_MATCH_AS));
    }
    pFieldArray[i] = removeDelimiter(pFieldArray[i]);
  }

  return pFieldArray;
}

function sortArray(pFieldArray: Field[]): Field[] {
  if (userSettings.fieldSortOrder === "key") {
    pFieldArray = pFieldArray.sort((a, b) => a.isKeyField && !b.isKeyField ? -1 : !a.isKeyField && b.isKeyField ? 1
      : (a.isKeyField && b.isKeyField && a.fieldAliasName.toUpperCase() > b.fieldAliasName.toUpperCase()) ? 1
        : (a.isKeyField && b.isKeyField && b.fieldAliasName.toUpperCase() > a.fieldAliasName.toUpperCase()) ? -1
          : 0)
  } else if (userSettings.fieldSortOrder === "all") {
    pFieldArray = pFieldArray.sort((a, b) => (a.fieldAliasName.toUpperCase() > b.fieldAliasName.toUpperCase()) ? 1
      : ((b.fieldAliasName.toUpperCase() > a.fieldAliasName.toUpperCase()) ? -1
        : 0))
  }

  return pFieldArray;
}

function assembleFieldAndAlias(pSourceFieldName: string, pAliasField: string): string {
  return userSettings.isFormatOnly ? pSourceFieldName : pSourceFieldName + " AS " + pAliasField;
}

function previewFormatting(formatOutput: string) {
  (<HTMLInputElement>document.getElementById("formattingOutput")).value = formatOutput;
  changeTab((<HTMLInputElement>document.getElementById("outputTab")), 'outputText', 'tabcontent', 'tablinks');
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
function addAffix(pFieldValue: Field): string {
  let fieldAffixValue: string = (<HTMLInputElement>document.getElementById("fieldAffixText")).value;
  if (userSettings.fieldAffixPosition === "doNothing" || userSettings.isIgnoreFormatOnKeyField && pFieldValue.isKeyField) {
    return pFieldValue.fieldAliasName;
  }
  else if (!userSettings.isIgnoreFormatOnKeyField && pFieldValue.isKeyField && userSettings.fieldAffixPosition === 'prefix' && userSettings.keySourcePosition === 'start') {
    return pFieldValue.fieldAliasName.slice(0, userSettings.keySourceIdentifier.length) + fieldAffixValue + pFieldValue.fieldAliasName.slice(userSettings.keySourceIdentifier.length);
  }

  return userSettings.fieldAffixPosition === 'suffix'
    ? pFieldValue.fieldAliasName + fieldAffixValue
    : fieldAffixValue + pFieldValue.fieldAliasName;
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
  let isKeyField = false;
  if (userSettings.keySourcePosition === "start" && userSettings.keySourceIdentifier.trim().length > 0) {
    isKeyField = pInputString.startsWith(userSettings.keySourceIdentifier) ? true : false;
  }
  else if (userSettings.keySourcePosition === "end" && userSettings.keySourceIdentifier.trim().length > 0) {
    isKeyField = pInputString.endsWith(userSettings.keySourceIdentifier) ? true : false;
  }

  return isKeyField;
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
function spaceOutCapitals(pInputString: Field): string {
  return userSettings.isSpaceOutCapitals && !pInputString.isKeyField
    ? pInputString.fieldAliasName.replace(/(?<![A-Z])([A-Z])/g, ' $1').trim().replace(/\s\s+/g, ' ')
    : pInputString.fieldAliasName;
}

/**
 * Changes which tab is active in the page, showing the active one's content and hidding the inactive's.
 * @param {HTMLInputElement} event The HTML Dom that triggered the action
 * @param {string} pContentId The tab to set active
 */
function changeTab(event: HTMLInputElement, pContentId: string, tabContentName: string, tabClassName: string): void {
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByClassName(tabContentName);
  for (let i = 0; i < tabcontent.length; i++) {
    (<HTMLInputElement>tabcontent[i]).style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  let tablinks = document.getElementsByClassName(tabClassName);
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  (<HTMLInputElement>document.getElementById(pContentId)).style.display = "block";
  event.className += " active";
}


function replaceChars(pInputString: string): string {
  return pInputString.replaceAll(userSettings.charsToReplace, userSettings.replaceWith);
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
    case "capitalizeFirst":
      fieldString = fieldString.toLowerCase().replace(/^.{1}/g, m => m.toUpperCase());
      break;
    default: break;
  };

  return fieldString;
}

function applySubField(pIntputString: string): string {
  let str: string = pIntputString;

  if (userSettings.subfieldSeparator.length > 0 || !isNaN(userSettings.subfieldNo)) {
    const SUB_FIELD_ARRAY = pIntputString.split(userSettings.subfieldSeparator);
    if (userSettings.subfieldNo - 1 > SUB_FIELD_ARRAY.length || userSettings.subfieldNo - 1 === SUB_FIELD_ARRAY.length) {
      str = SUB_FIELD_ARRAY[0];
    } else {
      str = SUB_FIELD_ARRAY[userSettings.subfieldNo - 1];
    }
  }

  return str;
}

function addKeyAffixToAlias(pFieldAliasName: string): string {
  return userSettings.keyAliasPosition === "start" ? userSettings.keyAliasIdentifier + pFieldAliasName : pFieldAliasName + userSettings.keyAliasIdentifier;
}


function toggleTheme(): any {

  if (userSettings.isDarkModeTheme) {
    (<HTMLButtonElement>document.getElementById("toggleTheme")).value = "dark";
    (<HTMLButtonElement>document.getElementById("toggleTheme")).innerText = "Toggle Light Mode";
  }
  else {
    (<HTMLButtonElement>document.getElementById("toggleTheme")).value = "light";
    (<HTMLButtonElement>document.getElementById("toggleTheme")).innerText = "Toggle Dark Mode";
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

/**asd */
String.prototype.replaceAll = function (strReplace: string, strWith: any): string {
  // See http://stackoverflow.com/a/3561711/556609
  let esc = strReplace.toString().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  let reg = new RegExp(esc, 'ig');
  return this.replace(reg, strWith.toString());
};

let userSettings = new UserSettings();
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
try {
  chrome.storage.local.get(['userConfiguration'], (result) => {
    if (result.userConfiguration !== undefined) {
      userSettings.loadFieldsFromStorage(result.userConfiguration);
    }

    setUserSettingsHTMLFields();
    toggleDisplayOfElements();
    initializeTheme();

    listenForClicks();
  });
}
catch (e: any) {
  console.log(e.message);
}