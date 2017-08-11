//TextHelper
var textHelper = {
  paymentMethod : "card",
  cost : "card",
  cardPaymentInfo : "card",
  length : "card",
  format : "card",
  contactText : "card",
  method : "card",
  reminderText : "card",
  setContactText : function (text, email) {
  var tempString = "We have sent the following prepayment details to";
  if (text === null && email === null) {
    tempString = "You should make a note of the following:";
  } else if (text != null && email === null) {
    tempString = tempString + " " + text;
  } else if (text === null && email != null) {
    tempString = tempString + " " + email;
  } else {
    tempString = tempString + " " + text + " and " + email;
  }
  this.contactText = tempString;
  },
  setMethod : function (email) {
    if (email != null) {
      this.method = "an email"
    }
  },
  setReminderText : function (text, email) {
    var tempStringTwo = "write to ";
    if (text != null && email === null) {
      tempStringTwo = "text";
    } else if (text === null && email != null) {
      tempStringTwo = "email";
    } else if (text != null && email != null) {
      tempStringTwo = "text and email";
    }
    this.reminderText = "We will " + tempStringTwo + " you again in August to remind you when your prepayment will end.";
  },
    setPaymentText : function (duration) {
  if (duration === "dd") {
    this.paymentMethod = "10 payments of £10.40 by Direct debit";
    this.cost = "£104";
    this.length = "12 months";
    this.format = "account";
    this.doneText = "Done";
  } else if (duration === "three") {
    this.paymentMethod = "Card payment";
    this.cost = "£29.10";
    this.cardPaymentInfo = '3 month prescription prepayment';
    this.length = "3 months";
    this.format = "card";
  } else if (duration === "twelve") {
    this.paymentMethod = "Card payment";
    this.cost = "£104";
    this.cardPaymentInfo = '12 month prescription prepayment';
    this.length = "12 months";
    this.format = "card";
  }
}
};

function createTextHelper() {
  return textHelper;
};

module.exports.createTextHelper = createTextHelper;