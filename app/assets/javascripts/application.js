/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

//ppc

//review table one
  if(document.getElementById("review-table-one")) {
    var runout = document.getElementById("runout");
    var hasNhsno = document.getElementById("has-nhsno").innerHTML;
    var nhsno = document.getElementById("nhsno");
    var codeRow = document.getElementById("postcode-row");
    var contactRow = document.getElementById("contact-row");
    var hasMobile = document.getElementById("has-mobile").innerHTML;
    var hasEmail = document.getElementById("has-email").innerHTML;
    var mobileValue = document.getElementById("mobile-value");
    var emailValue = document.getElementById("email-value");
    //payments
    var method = document.getElementById("method").innerHTML;
    var paymentRow = document.getElementById("payments");
    var amountRow = document.getElementById("amount");
    var firstPayRow = document.getElementById("fp");
    var lastPayRow = document.getElementById("lp");

    var changemobile = document.getElementById("changemobile").innerHTML;
    var addorchange = document.getElementById("addorchange");
    //hide contact where none given
    if (hasMobile === 'No') {
      mobileValue.className += " hidden";
    }
    if (hasNhsno === 'No') {
      nhsno.className += " hidden";
    }
    if (hasEmail === 'No') {
      emailValue.className += " hidden";
    }
    if (changemobile === '') {
      addorchange += "Add";
    }

    //if card payment hide dd details
    if(method === 'Card payment') {
      paymentRow.className += " hidden";
      amountRow.className += " hidden";
      firstPayRow.className += " hidden";
      lastPayRow.className += " hidden";
    }
  }

if (document.getElementById("has_dd")) {
  var ddContent = document.getElementById("dd_content");
  var hasDD = document.getElementById("has_dd").innerHTML;
  if (hasDD != "dd") {
    ddContent.className += " hidden";
  }
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()


  //checkbox contact
  if (document.getElementById("contact-boxes")) {
    var textBox = document.getElementById("text");
    var emailBox = document.getElementById("email");
    var postBox = document.getElementById("post");
    postBox.addEventListener('change', cancelPrefs);
    function cancelPrefs() {
       emailBox.checked = false;
       textBox.checked = false;
    }
    emailBox.addEventListener('change', changePrefs);
    textBox.addEventListener('change', changePrefs);
    function changePrefs() {
       postBox.checked = false;
    }
  }

  if(document.getElementById("runout")) {
    var edate = document.getElementById("Edate").innerHTML.trim();

    if (edate == "29 September 2017") {

      document.getElementById('runout').classList.remove("hidden");
    } else {
      console.log("no");

    };
  }


})
