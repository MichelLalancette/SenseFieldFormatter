# Sense Field Formatter.

<p align="center">
<a href="https://addons.mozilla.org/en-US/firefox/addon/sensefieldformatter/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get Sense Field Formatter for Firefox"></a>
<a href="https://chrome.google.com/webstore/detail/sensefieldformatter/eemcdboengmokjdklikamefkocdiakho"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get Sense Field Formatter for Chromium"></a>
</p>

# What it does #

![Alt Text](https://media.giphy.com/media/OczSymFXKg4y5Yoxv5/giphy.gif)

Allows a user to format a list of fields, delimited by commas, into an alias and standardized format.

The user has multiple configuration options to choose from.

When the extension icon is clicked, a popup menu is displayed where the formatting takes place and is pasted into the clipboard.

# User Settings #
### **Use Alias as field's source name** ###
Will use the alias name (at the right of "AS") from your source fields as your new source fields.

*e.g. [SourceField] AS [SourceAlias] -> [SourceAlias] AS [OutputAlias]*

### **Key Prefix** ###

The character(s) used to identify the key fields in Qlik. Formatting will be handled differently here as the Prefixing will be done AFTER (the right) the key prefix to avoid breaking the key formatting.
    
*e.g. Prefixing a key field with "Customer." will generate this: **[%MyKeyField] AS [%Customer.MyKeyField]***

***Ignore formatting on Key Fields?***
    
Fields starting with the identified key will NOT be formatted.

## **Comma Position** ##

Places the comma either at the start or end of line.

## **Field Delimiter** ##

Should the field delimiters be double quotes or square brackets.

## **Replace characters** ##

***Find what**: The character(s) you are looking to replace. Multiple characters can be replaced at once.*

***Replace with*: Replace all occurences of the character(s) in the fields.**

## **Insert a space before capitals** ##

Will insert a space before each capital letter in the fields, except for the first character.

*e.g. [MyNewField] -> [My New Field]*

## **Change Case** ##

Applies a case change to all the fields.

***Uppercase**: Replaces each lowercase letter with a corresponding uppercase char.*

***Lowercase**: Replaces each uppercase letter with a corresponding lowercase char.*

***Capitalize**: The first letter of each word will be in uppercase.*

## **Subfield the field names?** ##

Extract substring components from a parent string field, where the original record fields consist of two or more parts separated by a delimiter.

The function can be used, for example, to extract the column name in a specific language if the field is multilingual.

*e.g. Applying a subfield of 3 with a delimiter of '/'
**[Client/Cliente/Customer] -> [Customer]**
    
***Delimiter**: A character within the input text that divides the string into component parts.*

***Field no**: Specifies which of the substrings of the parent string text is to be returned. Use the value 1 to return the first substring, 2 to return the second substring, and so on.*

## **Add Suffix/Prefix?** ##

Adds an affix, either placed before the field (prefix) or at the end (suffix).
Useful when reusing the same dimension over and over for multiple scenarios.

e.g. Using the customer dimension where a customer may be a Ship To or Bill To customer.

*Prefix :*
**[Customer Name] -> [ShipTo.Customer Name]**

*Suffix :*
**[Customer Name] -> [Customer Name.ShipTo]**

***Affix:** The text that will be used as an affix. Make sure to add a spaceto your affix if you'd like the new string to remain spaced out.*


## License

[GPLv3](https://github.com/MichelLalancette/SenseFieldFormatter/blob/main/README.md).

## ***If you like my content and would like to support its development, feel free to buy me a beer/coffee.***

<a href="https://www.paypal.com/donate/?hosted_button_id=C8B7EZ44BM3NU"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" alt="Paypal Donation Button"></a>