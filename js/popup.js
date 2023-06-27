"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class UserSettings {
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
    loadFieldsFromStorage(pStorageData) {
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
    isKeyFieldGeneratorActive() {
        return this.keySourceIdentifier.trim().length > 0 && this.keyAliasIdentifier.trim().length > 0;
    }
}
class Field {
    constructor() {
        this.fieldSourceName = "";
        this.fieldAliasName = "";
        this.isKeyField = false;
    }
    getFieldNameWithAlias() {
        return userSettings.isFormatOnly ? this.fieldSourceName.trim() : `${this.fieldSourceName} AS ${this.fieldAliasName}`;
    }
}
const REGEX_MATCH_AS = /(?<!\["`)\bAS\b(?![\w\s]*[\]"`])/gmi; // (?<!\["`)\bAS\b(?![\w\s]*[\]"`]) Finds an AS that is not between delimiters
function setUserSettings() {
    userSettings.useAliasAsSourceName = document.getElementById("isSourceFieldAlias").checked;
    userSettings.isIgnoreFormatOnKeyField = document.getElementById("isIgnoreKeyField").checked;
    userSettings.commaPosition = document.getElementById("commaPosition").value;
    userSettings.fieldDelimiter = document.getElementById("fieldDelimiter").value;
    userSettings.isReplaceChars = document.getElementById("isReplaceChars").checked;
    userSettings.charsToReplace = document.getElementById("charsToReplace").value;
    userSettings.replaceWith = document.getElementById("replacementChar").value;
    userSettings.isSpaceOutCapitals = document.getElementById("isSpaceOutCapitals").checked;
    userSettings.changeStringCase = document.getElementById("changeStringCase").value;
    userSettings.isSubfieldFieldName = document.getElementById("isSubfieldFields").checked;
    userSettings.subfieldSeparator = document.getElementById("subfieldSeparator").value;
    userSettings.subfieldNo = parseInt(document.getElementById("subfieldno").value);
    userSettings.fieldAffixPosition = document.getElementById("fieldAffixPosition").value;
    userSettings.isDarkModeTheme = document.getElementById("toggleTheme").value === "dark" ? true : false;
    userSettings.isAlignAliases = document.getElementById("alignAlias").checked;
    userSettings.isFormatOnly = document.getElementById("isFormatOnly").checked;
    userSettings.fieldSortOrder = document.getElementById("sortFields").value;
    userSettings.keySourcePosition = document.getElementById("sourceKeyPosition").value;
    userSettings.keySourceIdentifier = document.getElementById("sourceKeyIdentifier").value;
    userSettings.keyAliasPosition = document.getElementById("aliasKeyPosition").value;
    userSettings.keyAliasIdentifier = document.getElementById("aliasKeyIdentifier").value;
}
function setUserSettingsHTMLFields() {
    document.getElementById("isSourceFieldAlias").checked = userSettings.useAliasAsSourceName;
    document.getElementById("isIgnoreKeyField").checked = userSettings.isIgnoreFormatOnKeyField;
    document.getElementById("commaPosition").value = userSettings.commaPosition;
    document.getElementById("fieldDelimiter").value = userSettings.fieldDelimiter;
    document.getElementById("isReplaceChars").checked = userSettings.isReplaceChars;
    document.getElementById("charsToReplace").value = userSettings.charsToReplace;
    document.getElementById("replacementChar").value = userSettings.replaceWith;
    document.getElementById("isSpaceOutCapitals").checked = userSettings.isSpaceOutCapitals;
    document.getElementById("changeStringCase").value = userSettings.changeStringCase;
    document.getElementById("isSubfieldFields").checked = userSettings.isSubfieldFieldName;
    document.getElementById("subfieldSeparator").value = userSettings.subfieldSeparator;
    document.getElementById("subfieldno").value = userSettings.subfieldNo !== undefined ? parseInt(userSettings.subfieldNo.toString()) === 0 || userSettings.subfieldNo.toString() === "NaN" ? "" : userSettings.subfieldNo.toString() : "0"; // Added check for undefinied variable to avoid toString on undefined field
    document.getElementById("fieldAffixPosition").value = userSettings.fieldAffixPosition;
    document.getElementById("toggleTheme").value = userSettings.isDarkModeTheme ? "dark" : "light";
    document.getElementById("alignAlias").checked = userSettings.isAlignAliases;
    document.getElementById("isFormatOnly").checked = userSettings.isFormatOnly;
    document.getElementById("sortFields").value = userSettings.fieldSortOrder;
    document.getElementById("sourceKeyPosition").value = userSettings.keySourcePosition;
    document.getElementById("sourceKeyIdentifier").value = userSettings.keySourceIdentifier;
    document.getElementById("aliasKeyPosition").value = userSettings.keyAliasPosition;
    document.getElementById("aliasKeyIdentifier").value = userSettings.keyAliasIdentifier;
}
function saveUserSettings() {
    setUserSettings();
    chrome.storage.local.set({
        userConfiguration: userSettings
    });
}
/**
 * Listen for clicks on the buttons, and performs the appropriate action.
 */
function listenForClicks() {
    // Event listener for "change" event
    document.addEventListener("change", () => {
        saveUserSettings();
        toggleDisplayOfElements();
    });
    // Event listener for "click" event
    document.addEventListener("click", (event) => {
        // Get the target element
        const targetElement = event.target;
        // Handle different target element names
        switch (targetElement.name) {
            case "toggleTheme":
                // Toggle the theme and save user settings
                userSettings.isDarkModeTheme = !userSettings.isDarkModeTheme;
                toggleTheme();
                saveUserSettings();
                break;
            case "isReplaceChars":
                // Toggle the child elements based on the checkbox state
                toggleCheckboxChildElements(targetElement.name, 'replaceChar');
                break;
            case "isSubfieldFields":
                // Toggle the child elements based on the checkbox state
                toggleCheckboxChildElements(targetElement.name, 'subField');
                break;
            case "fieldAffixPosition":
                // Toggle the child elements based on the dropdown value
                toggleDropDownChildElements(targetElement.name, 'fieldAffix');
                break;
            case "submitBtn":
                // Format fields and copy to clipboard
                formatFieldsAndCopyToClipboard();
                break;
            case "previewBtn":
                // Format fields and preview the output
                formatFieldsAndPreview();
                break;
            case "inputTab":
            case "outputTab":
                // Change the active tab
                changeTab(targetElement, 'inputText', 'tabcontent', 'tablinks');
                break;
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
    // Get all checkbox elements and hide/show the corresponding child elements
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        switch (checkbox.id) {
            case "isReplaceChars":
                toggleCheckboxChildElements(checkbox.id, 'replaceChar');
                break;
            case "isSubfieldFields":
                toggleCheckboxChildElements(checkbox.id, 'subField');
                break;
            // Add more cases for other checkboxes as needed
        }
    }
}
/**
 * Loops through all the input elements of the page and will call the toggleDropDownChildElements method for all dropdowns to show/hide their child content.
 */
function toggleDropdowns() {
    // Get all select elements and hide/show the corresponding dropdowns
    const dropdowns = document.querySelectorAll("select");
    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        if (dropdown instanceof HTMLSelectElement) {
            switch (dropdown.id) {
                case "fieldAffixPosition":
                    toggleDropDownChildElements(dropdown.id, 'fieldAffix');
                    break;
                // Add more cases for other dropdowns as needed
            }
        }
    }
}
/**
 * Shows/Hide the child elements of a dropdown. Child elements are anything that is "nested" below them.
 * @param pDropdownId The parent's dropdown id. Used to check wheter to show or hide the content
 * @param pChildClassName The child's class name to find in the DOM.
 */
function toggleDropDownChildElements(pDropdownId, pChildClassName) {
    // Get the dropdown element
    const dropdownElement = document.getElementById(pDropdownId);
    // Get all child elements with the specified class name
    const tabcontent = document.querySelectorAll(`.${pChildClassName}`);
    // Determine the display value based on the dropdown value
    const displayValue = dropdownElement.value !== "doNothing" ? "inline" : "none";
    // Get the length of the tabcontent array
    const tabcontentLength = tabcontent.length;
    // Loop through each tabcontent element and set the display style
    for (let i = 0; i < tabcontentLength; i++) {
        // Cast each tabcontent element as HTMLInputElement
        const tabcontentElement = tabcontent[i];
        // Set the display style based on the calculated value
        tabcontentElement.style.display = displayValue;
    }
}
/**
 * Shows/Hide the child elements of a checkbox. Child elements are anything that is "nested" below them.
 * @param pCheckboxId The parent's checkbox id. Used to check wheter to show or hide the content
 * @param pChildClassName The child's class name to find in the DOM.
 */
function toggleCheckboxChildElements(pCheckboxId, pChildClassName) {
    // Get the checkbox element based on the provided ID
    const checkboxElement = document.getElementById(pCheckboxId);
    // Get all child elements with the provided class name
    const childElements = document.querySelectorAll(`.${pChildClassName}`);
    // Determine the display value based on the checkbox state
    const displayValue = checkboxElement.checked ? "inline" : "none";
    // Iterate over the child elements and toggle their display
    for (let i = 0; i < childElements.length; i++) {
        // Cast childElement to HTMLElement to access the style property
        const childElement = childElements[i];
        childElement.style.display = displayValue;
    }
}
function formatFieldsAndCopyToClipboard() {
    try {
        const formattedOutput = buildOutput();
        previewFormatting(formattedOutput);
        storeOutputToClipboard(formattedOutput);
    }
    catch (e) {
        console.error(e);
    }
}
function formatFieldsAndPreview() {
    try {
        const formattedOutput = buildOutput();
        previewFormatting(formattedOutput);
    }
    catch (e) {
        console.error(e);
    }
}
function buildOutput() {
    // Get the input field information
    let fieldInfo = document.getElementById("fieldInfo").value;
    let loadStatement = "";
    ({ fieldInfo, loadStatement } = extractLoadSection(fieldInfo));
    let fromTableStatement = "";
    ({ fieldInfo, fromTableStatement } = extractFromSection(fieldInfo));
    // Split the field information into an array, trim and remove empty rows
    let fieldArray = fieldInfo
        .split(/[\r\n\\]+/)
        .map(s => s.trim())
        .filter(str => str);
    // Clean up the input fields before formatting
    fieldArray = parseFields(fieldArray);
    // Get the maximum length of the field names for alignment
    const MAX_ARRAY_FIELD_LENGTH = Math.max(...fieldArray.map(el => el.length));
    // Convert the array of field names to an array of Field objects
    let fieldArrayObject = parseInputForFields(fieldArray, MAX_ARRAY_FIELD_LENGTH);
    // Format field aliases if not in format-only mode
    if (!userSettings.isFormatOnly) {
        formatFieldAliases();
    }
    let output = "";
    // Add the load statement before the fields if it exists
    if (loadStatement.length > 0) {
        output += loadStatement + "\r\n";
    }
    // Concatenate the formatted field strings with proper comma insertion
    output += fieldArrayObjectToArrayOfString(sortArray(fieldArrayObject)).map((elem, i) => insertCommaIntoArrayValue(elem, fieldArray.length, i)).join("\r\n");
    // Add the fromTable statement after the fields if it exists
    if (fromTableStatement.length > 0) {
        output += "\r\n" + fromTableStatement;
    }
    // Return the final output string
    return output;
    // Convert the array of field names to an array of Field objects
    function parseInputForFields(pFieldArray, pMaxFieldLen) {
        return pFieldArray.map((fieldName) => {
            fieldName = fieldName.trim();
            if (userSettings.isFormatOnly) {
                fieldName = fieldName.substring(fieldName.search(REGEX_MATCH_AS));
            }
            const sourceField = new Field();
            sourceField.fieldSourceName = userSettings.isAlignAliases ? AddFieldDelimiter(fieldName) + ' '.repeat(pMaxFieldLen - fieldName.length + 2) : AddFieldDelimiter(fieldName);
            sourceField.fieldAliasName = fieldName;
            sourceField.isKeyField = fieldIsAKeyField(fieldName);
            return sourceField;
        });
    }
    // Format the field aliases
    function formatFieldAliases() {
        fieldArrayObject.forEach((field) => {
            if ((!field.isKeyField || (field.isKeyField && !userSettings.isIgnoreFormatOnKeyField))) {
                if (userSettings.isSubfieldFieldName) {
                    field.fieldAliasName = applySubField(field.fieldAliasName);
                }
                if (userSettings.isReplaceChars) {
                    field.fieldAliasName = replaceChars(field.fieldAliasName);
                }
                if (userSettings.isSpaceOutCapitals) {
                    field.fieldAliasName = spaceOutCapitals(field);
                }
                field.fieldAliasName = addAffix(field);
                field.fieldAliasName = setFieldCase(field.fieldAliasName);
                if (field.isKeyField) {
                    field.fieldAliasName = addKeyAffixToAlias(field.fieldAliasName);
                }
                field.fieldAliasName = AddFieldDelimiter(field.fieldAliasName);
            }
        });
    }
}
function fieldArrayObjectToArrayOfString(pFieldArrayObject) {
    return pFieldArrayObject.map(field => field.getFieldNameWithAlias());
}
/**
 * Extracts the fromTableStatement from the given fieldInfo string.
 * @param pFieldInfo - The fieldInfo string to extract from.
 * @returns An object containing the updated fieldInfo and the extracted fromTableStatement.
 */
function extractFromSection(pFieldInfo) {
    const FROM_LABEL = 'From';
    // Find the index of the From/Resident keyword preceded by certain conditions
    const sourceTableIndex = pFieldInfo.search(/\w*(?<!((as)|,)\s*)(?<!\["`)(From|Resident)\b(?![\w\s]*[\]"`])/gsi);
    // Extract the fromTableStatement if found, otherwise set it as an empty string
    const fromTableStatement = sourceTableIndex > -1 ? pFieldInfo.slice(sourceTableIndex).trimEnd() : '';
    // Update pFieldInfo by removing the fromTableStatement if found
    pFieldInfo = sourceTableIndex > -1 ? pFieldInfo.slice(0, sourceTableIndex) : pFieldInfo;
    // Return the updated pFieldInfo and the extracted fromTableStatement
    return { fieldInfo: pFieldInfo, fromTableStatement };
}
/**
 * Extracts the loadStatement from the given fieldInfo string.
 * @param pFieldInfo - The fieldInfo string to extract from.
 * @returns An object containing the updated fieldInfo and the extracted loadStatement.
 */
function extractLoadSection(pFieldInfo) {
    const LOAD_LABEL = 'Load';
    // Find the index of the Load keyword preceded by certain conditions
    const loadStatementIndex = pFieldInfo.search(/\w*(?<!,\s*)Load/gsi);
    // Extract the loadStatement if found, otherwise set it as an empty string
    const loadStatement = loadStatementIndex > -1 ? pFieldInfo.slice(0, loadStatementIndex + LOAD_LABEL.length).trimStart() : '';
    // Update pFieldInfo by removing the loadStatement if found
    pFieldInfo = loadStatementIndex > -1 ? pFieldInfo.slice(loadStatementIndex + LOAD_LABEL.length) : pFieldInfo;
    // Return the updated pFieldInfo and the extracted loadStatement
    return { fieldInfo: pFieldInfo, loadStatement };
}
function parseFields(pFieldArray) {
    const removeAliasRegex = /(.+\sAS\s+)/i;
    // Parse and clean up each field in pFieldArray
    return pFieldArray.map((field) => {
        if (userSettings.useAliasAsSourceName) {
            // Remove the AS portion from the field if useAliasAsSourceName is enabled
            return field.replace(removeAliasRegex, '');
        }
        else {
            // Extract the field name based on the AS keyword index
            const asIndex = field.search(REGEX_MATCH_AS);
            return asIndex !== -1 ? field.substring(0, asIndex) : field;
        }
    }).map(removeDelimiter); // Clean up the field by removing the delimiter if needed
}
function sortArray(pFieldArray) {
    if (userSettings.fieldSortOrder === "key") {
        pFieldArray.sort((a, b) => {
            if (a.isKeyField && !b.isKeyField) {
                return -1;
            }
            if (!a.isKeyField && b.isKeyField) {
                return 1;
            }
            return a.fieldAliasName.localeCompare(b.fieldAliasName, undefined, { sensitivity: 'case' });
        });
    }
    else if (userSettings.fieldSortOrder === "all") {
        pFieldArray.sort((a, b) => a.fieldAliasName.localeCompare(b.fieldAliasName, undefined, { sensitivity: 'case' }));
    }
    return pFieldArray;
}
function assembleFieldAndAlias(pSourceFieldName, pAliasField) {
    return userSettings.isFormatOnly ? pSourceFieldName : `${pSourceFieldName} AS ${pAliasField}`;
}
function previewFormatting(formatOutput) {
    const formattingOutput = document.getElementById("formattingOutput");
    formattingOutput.value = formatOutput;
    changeTab(document.getElementById("outputTab"), 'outputText', 'tabcontent', 'tablinks');
}
function coalesce([]) {
    return [].find.call(arguments, x => x !== null && x !== undefined);
}
function storeOutputToClipboard(newClip) {
    navigator.clipboard.writeText(newClip)
        .then(() => {
        displayMessageInHTMLElement('transformLbl', 'Success!', 500);
    })
        .catch(() => {
        displayMessageInHTMLElement('transformLbl', 'Failed... Something went wrong', 2000);
    });
}
/**
 * Adds a field delimiter, either square brackets or double quotes, to an input string.
 * @param {string} pInputField String expression to which we'll add delimiters, at the start and end of the string.
 * @returns {string} A string wrapped by delimiters.
 */
function AddFieldDelimiter(pInputField) {
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
function insertCommaIntoArrayValue(pFieldValue, pArraySize, pArrayIndex) {
    const IS_LEADING_COMMA = userSettings.commaPosition === 'lc';
    const IS_FINAL_ROW = pArraySize - 1 === pArrayIndex;
    const IS_FIRST_ROW = pArrayIndex === 0;
    let outputText;
    if (IS_LEADING_COMMA) {
        outputText = IS_FIRST_ROW ? pFieldValue : "," + pFieldValue;
    }
    else {
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
function removeCharacter(pFieldValue, pCharToRemove) {
    let isCharacterFound = false;
    if (pFieldValue.startsWith(pCharToRemove)) {
        pFieldValue = pFieldValue.slice(1).trim();
        isCharacterFound = true;
    }
    if (pFieldValue.endsWith(pCharToRemove)) {
        pFieldValue = pFieldValue.slice(0, -1).trim();
        isCharacterFound = true;
    }
    return [pFieldValue, isCharacterFound];
}
/**
 * Extracts characters beginning from the rightmost side to the left
 *
 * @param {string} pStr String expression from which the leftmost characters are returned
 * @param {string} pChrLength Numeric expression indicating how many characters to return.
 * @returns {string} A string containing a specified number of characters from the right side of a string.
 */
function right(pStr, pChrLength) {
    return pStr.slice(pStr.length - pChrLength, pStr.length);
}
/**
 * Extracts characters beginning from the leftmost side to the right
 *
 * @param {string} pStr String expression from which the leftmost characters are returned
 * @param {string} pChrLength Numeric expression indicating how many characters to return.
 * @returns {string} A string containing a specified number of characters from the left side of a string.
 */
function left(pStr, pChrLength) {
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
function addAffix(pFieldValue) {
    const fieldAffixValue = document.getElementById("fieldAffixText").value;
    if (userSettings.fieldAffixPosition === "doNothing" || (userSettings.isIgnoreFormatOnKeyField && pFieldValue.isKeyField)) {
        return pFieldValue.fieldAliasName;
    }
    if (!userSettings.isIgnoreFormatOnKeyField && pFieldValue.isKeyField && userSettings.fieldAffixPosition === 'prefix' && userSettings.keySourcePosition === 'start') {
        const keyIdentifierLength = userSettings.keySourceIdentifier.length;
        return `${pFieldValue.fieldAliasName.slice(0, keyIdentifierLength)}${fieldAffixValue}${pFieldValue.fieldAliasName.slice(keyIdentifierLength)}`;
    }
    return userSettings.fieldAffixPosition === 'suffix'
        ? `${pFieldValue.fieldAliasName}${fieldAffixValue}`
        : `${fieldAffixValue}${pFieldValue.fieldAliasName}`;
}
function removeDelimiter(pFieldValue) {
    const fieldDelimiterList = ['[', ']', '"', ",", '`'];
    let isCharacterFound = false;
    for (const delimiter of fieldDelimiterList) {
        let returnInfo = removeCharacter(pFieldValue, delimiter);
        pFieldValue = returnInfo[0];
        if (returnInfo[1]) {
            isCharacterFound = true;
            break;
        }
    }
    if (isCharacterFound) {
        return removeDelimiter(pFieldValue); // Restart the loop to check for any missed delimiters
    }
    return pFieldValue;
}
function fieldIsAKeyField(pInputString) {
    if (userSettings.keySourceIdentifier.trim().length === 0) {
        return false;
    }
    const inputString = pInputString.trim();
    const keySourceIdentifier = userSettings.keySourceIdentifier.trim();
    if (userSettings.keySourcePosition === "start") {
        return inputString.startsWith(keySourceIdentifier);
    }
    else if (userSettings.keySourcePosition === "end") {
        return inputString.endsWith(keySourceIdentifier);
    }
    return false;
}
function isBlank(str) {
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
function spaceOutCapitals(pInputString) {
    return userSettings.isSpaceOutCapitals && !pInputString.isKeyField
        ? pInputString.fieldAliasName.replace(/(?<![A-Z])([A-Z])/g, ' $1').trim().replace(/\s\s+/g, ' ')
        : pInputString.fieldAliasName;
}
/**
 * Changes which tab is active in the page, showing the active one's content and hidding the inactive's.
 * @param {HTMLInputElement} event The HTML Dom that triggered the action
 * @param {string} pContentId The tab to set active
 */
function changeTab(event, pContentId, tabContentName, tabClassName) {
    const tabcontent = document.getElementsByClassName(tabContentName);
    const tablinks = document.getElementsByClassName(tabClassName);
    // Hide all tab content
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Remove "active" class from all tab links
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    const currentTabContent = document.getElementById(pContentId);
    currentTabContent.style.display = "block"; // Display the selected tab content
    event.classList.add("active"); // Add "active" class to the clicked tab
}
function replaceChars(pInputString) {
    return pInputString.replaceAll(userSettings.charsToReplace, userSettings.replaceWith);
}
function setFieldCase(pInputString) {
    let fieldString = pInputString;
    const changeStringCase = userSettings.changeStringCase;
    switch (changeStringCase) {
        case "upper":
            fieldString = fieldString.toUpperCase();
            break;
        case "lower":
            fieldString = fieldString.toLowerCase();
            break;
        case "capitalize":
            fieldString = capitalize(fieldString);
            break;
        case "capitalizeFirst":
            fieldString = capitalizeFirst(fieldString);
            break;
        default:
            break;
    }
    return fieldString;
}
function capitalize(str) {
    return str.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
function capitalizeFirst(str) {
    return str.toLowerCase().replace(/^.{1}/g, m => m.toUpperCase());
}
function applySubField(pInputString) {
    let str = pInputString;
    const subfieldSeparator = userSettings.subfieldSeparator;
    const subfieldNo = userSettings.subfieldNo;
    if (subfieldSeparator.length > 0 || !isNaN(subfieldNo)) {
        const subFieldArray = pInputString.split(subfieldSeparator);
        if (subfieldNo - 1 >= 0 && subfieldNo - 1 < subFieldArray.length) {
            str = subFieldArray[subfieldNo - 1];
        }
        else {
            str = subFieldArray[0];
        }
    }
    return str;
}
function addKeyAffixToAlias(pFieldAliasName) {
    return userSettings.keyAliasPosition === "start" ? userSettings.keyAliasIdentifier + pFieldAliasName : pFieldAliasName + userSettings.keyAliasIdentifier;
}
function toggleTheme() {
    const toggleThemeButton = document.getElementById("toggleTheme");
    const isDarkModeTheme = userSettings.isDarkModeTheme;
    toggleThemeButton.value = isDarkModeTheme ? "dark" : "light";
    toggleThemeButton.innerText = `Toggle ${isDarkModeTheme ? "Light" : "Dark"} Mode`;
    const toggleClass = (elements, className) => {
        elements.forEach(element => element.classList.toggle(className));
    };
    const classNames = [
        "tab",
        "flex-sect",
        "fieldTextInput",
        "smallInput",
        "label",
        "option-label",
        "dropdown",
        "header",
    ];
    classNames.forEach(className => {
        toggleClass(document.querySelectorAll(`.${className}`), `${className}-light`);
    });
}
function initializeTheme() {
    if (!userSettings.isDarkModeTheme) {
        toggleTheme();
    }
}
/**asd */
String.prototype.replaceAll = function (strReplace, strWith) {
    return this.split(strReplace).join(strWith.toString());
};
let userSettings = new UserSettings();
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield new Promise((resolve) => {
            chrome.storage.local.get(['userConfiguration'], (result) => {
                resolve(result);
            });
        });
        if (result.userConfiguration !== undefined) {
            userSettings.loadFieldsFromStorage(result.userConfiguration);
        }
        setUserSettingsHTMLFields();
        toggleDisplayOfElements();
        initializeTheme();
        listenForClicks();
    }
    catch (e) {
        console.log(e.message);
    }
}))();
