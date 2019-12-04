module.exports = {
  wrapSingleTermsWithDoubleQuotes: (query) => {
    // Output variable
    var output = "";

    // Keep track of whether to ignore the current word due to the negation operator (-minus)
    var ignoreCurrentWord = false;

    // Keep track of whether we're inside a custom phrase in the query ("exact match")
    var withinCustomPhrase = false;

    // Keep track of whether we need to close a double quote that we opened for the current word
    var openedDoubleQuote = false;

    // Remove all double spacing from the query (we may need a few iterations for this to work)
    while (query.indexOf('  ') != -1) {
      // Replace all occurrences of double spacing with single spacing
      query = query.replace(/  /g, ' ');
    }

    // Trim leading and trailing spaces from the query to normalize the input
    query = query.trim();

    // Start traversing query characters
    for (var i = 0; i < query.length; i++) {
      // Comfort variable
      var char = query[i];

      // Not yet wrapping a term with double quotes?
      if (!openedDoubleQuote) {
          // Not ignoring the current word already (due to an operator) and not within a custom phrase?
          if (!ignoreCurrentWord && !withinCustomPhrase) {
            // Char is not a quote or negation operator?
            if (char != '"' && char != '-') {
              // This is most likely a single term, let's insert an opening double quote
              output += '"';

              // Mark this as true so we remember to close the double-quote when the word's done
              openedDoubleQuote = true;
            }
            else {
              // Char is a quote
              if (char == '"') {
                // Avoid adding quotes until we encounter the phrase's closing quote
                withinCustomPhrase = !withinCustomPhrase;
              }
              // Char is a negation operator
              else if (char == '-') {                    
                // Ignore the current word (don't try to wrap it with double quotes)
                ignoreCurrentWord = true;
              }
            }
          }
          else {
            // Ignoring the current word or phrase -- check if we reached the end of the current word (space)
            if (char == ' ') {
              // In case this was a negative word, it's over now
              ignoreCurrentWord = false;

              // Were we inside a custom phrase, the current char is a space, and the previous char was a double quote?
              if (withinCustomPhrase && i > 0 && query[i - 1] == '"') {
                  // No longer inside a the custom phrase (since we encountered a closing double-quote)
                  withinCustomPhrase = false;
              }
            }
          }
      }
      else {
        // Within a single term currently -- is current char a space, indicating the end of the single term?
        if (char == ' ') {
          // Add a closing double quote to finish wrapping the single term
          output += '"';

          // We closed our own double-quote
          openedDoubleQuote = false;
        }
      }

      // Add current char to output (we never omit any query chars, only append double-quotes where necessary)
      output += char;
    }

    // Reached the end of the string but still got a quote to close?
    if (openedDoubleQuote) {
      // Add the final double quote
      output += '"';
    }

    // Return algorithm output
    return output;
  }
};