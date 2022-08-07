"use strict";
class UserSettings {
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
        this.isAliasOnly = false;
        this.isDarkModeTheme = true;
        this.isAlignAliases = false;
        this.fieldSortOrder = "doNothing";
        this.keySourcePosition = "start";
        this.keySourceIdentifier = "";
        this.keyAliasPosition = "start";
        this.keyAliasIdentifier = "";
    }
}
class Field {
    constructor() {
        this.fieldOriginalName = "";
        this.fieldSourceName = "";
        this.fieldAliasName = "";
        this.isKeyField = false;
    }
}
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
    // userSettings.fieldAffixValue = (<HTMLInputElement>document.getElementById("fieldAffixText")).value;
    userSettings.isDarkModeTheme = document.getElementById("toggleTheme").value === "dark" ? true : false;
    userSettings.isAlignAliases = document.getElementById("alignAlias").checked;
    userSettings.isAliasOnly = document.getElementById("isFormatOnly").checked;
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
    document.getElementById("subfieldno").value = parseInt(userSettings.subfieldNo.toString()) === 0 || userSettings.subfieldNo.toString() === "NaN" ? "" : userSettings.subfieldNo.toString();
    document.getElementById("fieldAffixPosition").value = userSettings.fieldAffixPosition;
    // (<HTMLInputElement>document.getElementById("fieldAffixText")).value = userSettings.fieldAffixValue;
    document.getElementById("toggleTheme").value = userSettings.isDarkModeTheme ? "dark" : "light";
    document.getElementById("alignAlias").checked = userSettings.isAlignAliases;
    document.getElementById("isFormatOnly").checked = userSettings.isAliasOnly;
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
    // (<HTMLFormElement>document.getElementById("keyFieldIdentifier")).addEventListener("input", (e) => {
    //   toggleIgnoreOfKeyField();
    // });
    document.addEventListener("change", (e) => {
        saveUserSettings();
        toggleDisplayOfElements();
        // displayMessageInHTMLElement("transformLbl", "Saved.", 500);
    });
    document.addEventListener("click", (e) => {
        const EVENTNAME = e.target;
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
            case "settingsTab":
                return changeTab(EVENTNAME, 'settingsContent', 'settingsTabContent', 'settingsTab');
            case "advancedSettingsTab":
                return changeTab(EVENTNAME, 'advancedSettingsContent', 'settingsTabContent', 'settingsTab');
        }
    });
}
function toggleIgnoreOfKeyField() {
    // (<HTMLInputElement>document.getElementById("keyFieldIdentifier")).value.length > 0 ?
    //   (<HTMLFormElement>document.getElementById("ignoreFormatKeyFieldLabel")).style.display = ""
    //   : (<HTMLFormElement>document.getElementById("ignoreFormatKeyFieldLabel")).style.display = "none";
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
        if (tabcontent[i].type === "checkbox") {
            switch (tabcontent[i].id) {
                case "isReplaceChars":
                    toggleCheckboxChildElements(tabcontent[i].id, 'replaceChar');
                case "isSubfieldFields":
                    toggleCheckboxChildElements(tabcontent[i].id, 'subField');
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
        if (tabcontent[i].type === "select-one") {
            switch (tabcontent[i].id) {
                case "fieldAffixPosition":
                    toggleDropDownChildElements(tabcontent[i].id, 'fieldAffix');
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
    let checkboxElement = document.getElementById(pDropdownId);
    // Get all elements with class="tabcontent" and hide them
    let tabcontent = document.getElementsByClassName(pChildClassName);
    for (let i = 0; i < tabcontent.length; ++i) {
        if (checkboxElement.value !== "doNothing") {
            tabcontent[i].style.display = "inline";
        }
        else {
            tabcontent[i].style.display = "none";
        }
    }
}
/**
 * Shows/Hide the child elements of a checkbox. Child elements are anything that is "nested" below them.
 * @param pCheckboxId The parent's checkbox id. Used to check wheter to show or hide the content
 * @param pChildClassName The child's class name to find in the DOM.
 */
function toggleCheckboxChildElements(pCheckboxId, pChildClassName) {
    let checkboxElement = document.getElementById(pCheckboxId);
    // Get all elements with class="tabcontent" and hide them
    let tabcontent = document.getElementsByClassName(pChildClassName);
    for (let i = 0; i < tabcontent.length; ++i) {
        if (checkboxElement.checked) {
            tabcontent[i].style.display = "inline";
        }
        else {
            tabcontent[i].style.display = "none";
        }
    }
}
function formatFieldsAndCopyToClipboard() {
    try {
        const FORMATTED_OUTPUT = formatInputFields();
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
        const FORMATTED_OUTPUT = formatInputFields();
        // Assigns the outputted fields into the clipboard 
        previewFormatting(FORMATTED_OUTPUT);
    }
    catch (e) {
        console.error(e);
    }
}
function formatInputFields() {
    let fieldInfo = document.getElementById("fieldInfo").value;
    let loadStatement = "";
    const LOAD_STATEMENT_INDEX = fieldInfo.search(/\w*(?<!,\s*)Load/gsi);
    const LOAD_LABEL = 'Load';
    if (LOAD_STATEMENT_INDEX > -1) {
        loadStatement = fieldInfo.slice(0, LOAD_STATEMENT_INDEX + LOAD_LABEL.length); // Take everyting up to the Load word
        fieldInfo = fieldInfo.slice(LOAD_STATEMENT_INDEX + LOAD_LABEL.length); // Remove the Load and keep everything to the end of string
    }
    let fromTableStatement = "";
    // Check if the keywords Resident or From (case insensitive) are matched and not preceded directly by AS or a comma. This indicates it's a Table Load, not a field
    const SOURCE_TABLE_INDEX = fieldInfo.search(/\w*(?<!((as)|,)\s*)(?<!\["`)(From|Resident)\b(?![\w\s]*[\]"`])/gsi);
    if (SOURCE_TABLE_INDEX > -1) {
        fromTableStatement = fieldInfo.slice(SOURCE_TABLE_INDEX); // Take everyting up to the Load word
        fieldInfo = fieldInfo.slice(0, SOURCE_TABLE_INDEX); // Remove the Load and keep everything to the end of string
    }
    // Split the string into an array for each line break, trim records, then remove empty rows
    let fieldArray = fieldInfo
        .split(/[\r\n\\]+/)
        .map(s => s.trim())
        .filter(function (str) { return str; });
    let fieldArrayObject;
    fieldArray.forEach(e => {
        let myField = new Field();
        myField.fieldOriginalName = e;
        fieldArrayObject.push(myField);
    });
    fieldArray = cleanupFields(fieldArray); // Cleanup the input fields before formatting
    const MAX_ARRAY_FIELD_LENGTH = Math.max(...(fieldArray.map(el => el.length))); // Get the longest field name to align the aliases
    let sourceFieldName;
    let isKeyField;
    for (let i = 0; i < fieldArray.length; i++) {
        sourceFieldName = AddFieldDelimiter(fieldArray[i]); // Create the source field name by wrapping it with delimiters
        isKeyField = fieldIsAKeyField(fieldArray[i]); // Check if the key field is a key Identifier using the configuration
        if (!isKeyField || (isKeyField && !userSettings.isIgnoreFormatOnKeyField)) {
            if (userSettings.isSubfieldFieldName) {
                fieldArray[i] = applySubField(fieldArray[i]);
            }
            ;
            if (userSettings.isReplaceChars) {
                fieldArray[i] = replaceChars(fieldArray[i]);
            }
            // Add spaces then add the prefix or suffix and finally wrap with double quotes ot square brackets
            if (userSettings.isSpaceOutCapitals) {
                fieldArray[i] = spaceOutCapitals(fieldArray[i], isKeyField);
            }
            fieldArray[i] = addAffix(fieldArray[i], isKeyField);
            fieldArray[i] = setFieldCase(fieldArray[i]);
        }
        fieldArray[i] = AddFieldDelimiter(fieldArray[i]);
        // Align the "AS" used in aliasing so that all the aliases start at the same character index
        if (userSettings.isAlignAliases) {
            sourceFieldName = sourceFieldName.padEnd(MAX_ARRAY_FIELD_LENGTH + 2, ' ');
        }
        ;
        fieldArray[i] = assembleFieldAndAlias(sourceFieldName, fieldArray[i]);
    }
    fieldArray = sortArray(fieldArray);
    // Add commas to each row in the array
    // Formats the fields according to the user settings 
    // then transforms the array into a string with linebreaks between each record
    const newLocal = fieldArray.map((elem, i) => {
        return insertCommaIntoArrayValue(elem, fieldArray.length, i);
    }).join("\r\n");
    return newLocal;
}
function cleanupFields(fieldArray) {
    for (let i = 0; i < fieldArray.length; i++) {
        if (userSettings.useAliasAsSourceName) {
            fieldArray[i] = fieldArray[i].replace(/(.+\sAS\s+)/i, '');
        } // (.+\sAS\s+) matches everything up to the AS part of the alias
        else if (fieldArray[i].search(/(?<!\["`)\bAS\b(?![\w\s]*[\]"`])/gmi) !== -1) { // (?<!\["`)\bAS\b(?![\w\s]*[\]"`]) Finds an AS that is not between delimiters
            fieldArray[i] = fieldArray[i].substring(0, fieldArray[i].search(/(?<!\["`)\bAS\b(?![\w\s]*[\]"`])/gmi));
        }
        fieldArray[i] = removeDelimiter(fieldArray[i]);
    }
    return fieldArray;
}
function sortArray(pFieldArray) {
    // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
    if (userSettings.fieldSortOrder === "key") {
        const KEY_FIELDS_ARRAY = pFieldArray.filter(e => e.startsWith(userSettings.fieldDelimiter + userSettings.keyFieldIdentifier)).sort();
        const REGULAR_FIELDS_ARRAY = pFieldArray.filter(e => !e.startsWith(userSettings.fieldDelimiter + userSettings.keyFieldIdentifier));
        pFieldArray = KEY_FIELDS_ARRAY.concat(REGULAR_FIELDS_ARRAY);
    }
    else if (userSettings.fieldSortOrder === "all") {
        pFieldArray = pFieldArray.sort();
    }
    return pFieldArray;
}
function assembleFieldAndAlias(pSourceFieldName, pAliasField) {
    return userSettings.isAliasOnly ? pSourceFieldName : pSourceFieldName + " AS " + pAliasField;
}
function previewFormatting(formatOutput) {
    document.getElementById("formattingOutput").value = formatOutput;
    changeTab(document.getElementById("outputTab"), 'outputText', 'tabcontent', 'settingsTab');
}
function coalesce([]) {
    return [].find.call(arguments, x => x !== null && x !== undefined);
}
function storeOutputToClipboard(newClip) {
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
function displayMessageInHTMLElement(pElementId, pMessage, pTimeoutDuration) {
    let status = document.getElementById(pElementId);
    status.textContent = pMessage;
    setTimeout(function () {
        status.textContent = '';
    }, pTimeoutDuration);
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
    const IS_LEADING_COMMA = userSettings.commaPosition === 'lc' ? true : false;
    const IS_FINAL_ROW = pArraySize - 1 === pArrayIndex ? true : false;
    const IS_FIRST_ROW = pArrayIndex === 0 ? true : false;
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
    let isCharacterFound = "false";
    if (left(pFieldValue, 1) === pCharToRemove) {
        pFieldValue = pFieldValue.slice(1).trim();
        isCharacterFound = "true";
    }
    if (right(pFieldValue, 1) === pCharToRemove) {
        pFieldValue = pFieldValue.slice(0, -1).trim();
        isCharacterFound = "true";
    }
    let returnInformation = [pFieldValue, isCharacterFound];
    return returnInformation;
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
function addAffix(pFieldValue, pIsKeyField) {
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
function removeDelimiter(pFieldValue) {
    let returnInfo;
    let fieldDelimiterList = ['[', ']', '"', ",", '`'];
    for (let j = 0; j < fieldDelimiterList.length; j++) {
        returnInfo = removeCharacter(pFieldValue, fieldDelimiterList[j]);
        pFieldValue = returnInfo[0]; // Getting the string information of the transformed string
        // Special case: Because we iterate over the list in a specific order, it's possible the comma may happen before the other characters.
        // If one of the character is found, start the field delimiter loop over to make sure we didn't miss a character that was not first or last.
        // e.g. ,"my field" will need to start over to make sure we don't miss the double quote right after the comma
        if (JSON.parse(returnInfo[1])) {
            j = -1;
        }
    }
    return pFieldValue;
}
function fieldIsAKeyField(pInputString) {
    return pInputString.startsWith(userSettings.keyFieldIdentifier) && userSettings.keyFieldIdentifier.length > 0 ? true : false;
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
function spaceOutCapitals(pInputString, pIsKeyField) {
    return userSettings.isSpaceOutCapitals && !pIsKeyField
        ? pInputString.replace(/(?<![A-Z])([A-Z])/g, ' $1').trim().replace(/\s\s+/g, ' ')
        : pInputString;
}
/**
 * Changes which tab is active in the page, showing the active one's content and hidding the inactive's.
 * @param {HTMLInputElement} event The HTML Dom that triggered the action
 * @param {string} tabName The tab to set active
 */
function changeTab(event, tabName, tabContentName, pTabName) {
    // Get all elements with class="tabcontent" and hide them
    let tabcontent = document.getElementsByClassName(tabContentName);
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    let tablinks = document.getElementsByClassName(pTabName);
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    event.className += " active";
}
function replaceChars(pInputString) {
    const FIND_WHAT_ARRAY = userSettings.charsToReplace.split('');
    const REPLACE_WITH = userSettings.replaceWith;
    FIND_WHAT_ARRAY.forEach(element => pInputString = pInputString.replace(element, REPLACE_WITH));
    return pInputString;
}
function setFieldCase(pInputString) {
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
    }
    ;
    return fieldString;
}
function applySubField(pIntputString) {
    let str = pIntputString;
    if (userSettings.subfieldSeparator.length > 0 || !isNaN(userSettings.subfieldNo)) {
        const SUB_FIELD_ARRAY = pIntputString.split(userSettings.subfieldSeparator);
        if (userSettings.subfieldNo - 1 > SUB_FIELD_ARRAY.length || userSettings.subfieldNo - 1 === SUB_FIELD_ARRAY.length) {
            str = SUB_FIELD_ARRAY[0];
        }
        else {
            str = SUB_FIELD_ARRAY[userSettings.subfieldNo - 1];
        }
    }
    return str;
}
function toggleTheme() {
    if (userSettings.isDarkModeTheme) {
        document.getElementById("toggleTheme").value = "dark";
        document.getElementById("toggleTheme").innerText = "Toggle Light Mode";
    }
    else {
        document.getElementById("toggleTheme").value = "light";
        document.getElementById("toggleTheme").innerText = "Toggle Dark Mode";
    }
    let tabElements = document.getElementsByClassName("tab");
    for (let i = 0; i < tabElements.length; i++) {
        tabElements[i].classList.toggle("tablight");
    }
    let flexSectElements = document.getElementsByClassName("flex-sect");
    for (let i = 0; i < flexSectElements.length; i++) {
        flexSectElements[i].classList.toggle("flex-sect-light");
    }
    let fieldTextInputs = document.getElementsByClassName("fieldTextInput");
    for (let i = 0; i < fieldTextInputs.length; i++) {
        fieldTextInputs[i].classList.toggle("fieldTextInput-light");
    }
    let smallFieldTextInputs = document.getElementsByClassName("smallInput");
    for (let i = 0; i < smallFieldTextInputs.length; i++) {
        smallFieldTextInputs[i].classList.toggle("smallInput-light");
    }
    let labels = document.getElementsByClassName("label");
    for (let i = 0; i < labels.length; i++) {
        labels[i].classList.toggle("label-light");
    }
    let optionLabels = document.getElementsByClassName("option-label");
    for (let i = 0; i < optionLabels.length; i++) {
        optionLabels[i].classList.toggle("option-label-light");
    }
    let dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.toggle("dropdown-light");
    }
    let headers = document.getElementsByTagName("header");
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
        }
        else {
            saveUserSettings();
        }
        setUserSettingsHTMLFields();
        toggleDisplayOfElements();
        initializeTheme();
        listenForClicks();
    });
}
catch (e) {
    console.log(e.message);
}
