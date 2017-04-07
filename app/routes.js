var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

module.exports = router;

///ppc

var today = new Date();
var thisDay = today.getDate();
var thisMonth = today.getMonth();
var thisYear = today.getFullYear();

var payDateOne = "2 April 2017";
var payDateTwo = "15 April 2017";
var payDateThree = "28 April 2017";

// return a date 1 month ago
// returna  date 1 month ahead
  // make monthcheck a stand alone function

console.log('day = ' + thisDay);
console.log('month = ' + monthToText(thisMonth));
console.log('year = ' + thisYear);

var ppc = {
  duration : null,
  startDay : null,
  startMonth : null,
  startYear : null,
  startDate : null,
  endDay : null,
  endMonth : null,
  endYear : null,
  endDate : null,  
  autoRenew : null,
  createEnd : function() {
    //set the end year to the start year and convert to a number:
    this.endDay = parseInt(this.startDay) -1;
    this.endMonth = parseInt(this.startMonth);
    this.endYear = parseInt(this.startYear);
    //if the user selects 12 months - add a year to their end date
    if(ppc.duration === 'dd' || ppc.duration === 'twelve') {
      this.endYear += 1; 
    } else {
    //if the user selects 3 months - add three months to their end date
      this.endMonth += 3;
      this.monthCheck();  
    }
    // if 0
    this.dayCheck();
    this.monthCheck();
    this.endDate = dateStringCreator(this.endDay, this.endMonth, this.endYear);
    console.log(this.endDay + ',' + this.endMonth + ',' + this.endYear);
  },
  dayCheck : function() {
    if (this.endDay === 0) {
      this.endMonth -= 1;
      // 30 days
      if (this.endMonth === 4 || this.endMonth === 6 || this.endMonth === 9 || this.endMonth === 11) {
        this.endDay = 30;
      //feb
      } else if (this.endMonth == 2){
        this.endDay = 28;
      //31 days
      } else {
        this.endDay = 31;
      }
    }
  },
  monthCheck : function() {
    if (this.endMonth > 12) {
      this.endMonth -= 12;
      this.endYear += 1;
    } else if (this.endMonth === 0) {
      this.endMonth = 12;
      this.endYear -= 1;
    }
  }
};

var variText = {
    paymentMethod : "10 payments of £10.40 by Direct debit",
    cost : "£104",
    cardPaymentInfo : '12 month prescription prepayment',
    length : "12 months",
    format : "account",
    contactText : "They will be sent to 1 Street, place, town, NE1 567",
    setPaymentText : function(x) {
      if(x === "dd") {
        this.paymentMethod = "10 payments of £10.40 by Direct debit";
        this.cost = "£104";
        this.length = "12 months";
        this.format = "account";
        this.doneText = "Done";
      } else if(x === "three") {
        this.paymentMethod = "Card payment";
        this.cost = "£29.10";
        this.cardPaymentInfo = '3 month prescription prepayment';
        this.length = "3 months";
        this.format = "card";
      } else if(x === "twelve") {
        this.paymentMethod = "Card payment";
        this.cost = "£104";
        this.cardPaymentInfo = '12 month prescription prepayment';
        this.length = "12 months";
        this.format = "card";
      }
    },
    setContactText : function() {
      if(applicant.contactPref === "email") {
        this.contactText = "They have been emailed to " + applicant.email;
      } else if(applicant.contactPref === "text") {
        this.contactText = "They have been sent by text to " + applicant.mobile;
      } else {
        this.contactText = "They will be sent to " + applicant.address;
      }
      console.log("Contact pref = " + applicant.contactPref);
    }
};

//applicant
var applicant = {
  firstName : "Jane",
  lastName : "Doe",
  fullName : "Jane Doe",
  dobDay : null,
  dobMonth : null,
  dobYear : null,
  postCode : null,
  hasMobile : false,
  hasEmail : false,
  mobile : null,
  email : null,
  contactPref : 'post',
  email : null,
  address : null,
  age : null,
  renewing : false,
  checkAge : function (age) {
    if (age < 60) {
      return true;
    }
  },
  setFullName : function() {
    this.fullName = this.firstName + " " + this.lastName;
  },
  setContactPref : function() {
    if (applicant.hasMobile === true) {
      applicant.contactPref = 'text';
    } else if (applicant.hasEmail === true) {
      applicant.contactPref = 'email';
    } else {
      applicant.contactPref = 'post';
    }
  }
};

//card details
var card = {
  cardNumber : '************7470',
  exMonth : 11,
  exYear : 16,
  exDate : '11/16',
  holderName : 'Mr Smith',
  holderAddress : '3 Street, town',
  holderPostCode : 'NE2 468',
  setExdate : function() {
    this.exDate = this.exMonth + '/' + this.exYear;
  },
  setCardNumber : function() {
    var tempString = this.cardNumber.toString();
    var lastFour = tempString.substr(tempString.length - 4);
    this.cardNumber = "************" + lastFour;
    console.log(this.cardNumber);
  }
};

function checkApplicant (firstname, lastname, postcode) {
  if(firstname === 'Bill' && 
    lastname === 'Smith' &&
    postcode === 'NE1 234') {
    return true;
  }
}

function capitaliseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetAll() {
  applicant.renewing = false;
  ppc.duration = null;
  //card reset
  card.cardNumber = '************7470';
  card.exMonth = 11;
  card.exYear = 16;
  card.exDate = '11/16';
  card.holderName = 'Mr Smith';
  card.holderAddress = '3 Street, town';
}

//bool to text
function boolToText (boo) {
  if(boo === true){
    return 'Yes';
  } else {
    return 'No';
  }
}

//convert date to a string
function dateStringCreator (day, month, year) {
  return (day + " " + monthToText(month) + " " + year);
}

// convert the month to text
function monthToText(month) {
  month = month.toString();
  if (month.length > 1) {
    if (month.charAt(0) === '0') {
      month = month.substring(1);
    }
  }
  switch (month) {
      case '0':
          return "January";
      case '1':
          return "January";
      case '2':
          return "February";
      case '3':
          return "March";
      case '4':
          return "April";
      case '5':
          return "May";
      case '6':
          return "June";
      case '7':
          return "July";
      case '8':
          return "August";
      case '9':
          return "September";
      case '10':
          return "October";
      case '11':
          return "November";
      case '12':
          return "December";
  }
}
var querystring = require('querystring');

    
    router.get('/', function (req, res) {
      resetAll();
      res.render('index');
    });
    
    //foogle search
    router.get(/go-handler/, function (req, res) {
      var term = req.query.search;
      if(term === 'PPC' || term === 'ppc') {
        res.render('google/result', {
          term : term
        });
        console.log(term);
      } else {
        res.render('google/prescription-result', {
          term : term
        });
      }
    });
    
    //dob-handler
    router.get(/birth-handler/, function (req, res) {
      if(req.query.day != '') {
        applicant.dobDay = req.query.day;
      }
      if(req.query.month != '') {
        applicant.dobMonth = req.query.month;
      }
      if(req.query.year != '') {
        applicant.dobYear = req.query.year;
        applicant.age = (2016 - applicant.dobYear);
      }
      console.log(applicant.age);
      if (applicant.age <= 16 || applicant.age >= 60) {
        res.redirect('60');
      } else {
        res.redirect('name');
      }
//      if (applicant.age === 59) {
//        res.redirect('../59');
//      } else if (applicant.age >= 60) {
//        res.redirect('../60');
//      } else {
//        res.redirect('../name');
//      }
    });    
    
    //DOB
    router.get(/dob/, function (req, res) {
      if (req.query.renew === "true") {
        applicant.renewing = true;
      }
      res.render('ppc/dob');
    });
    
    //Name
    router.get(/details-handler/, function (req, res) {
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      applicant.setFullName();
      res.redirect('post-address');
    });
        
    //address
    router.get(/address-c-handler/, function (req, res) {
      applicant.postCode = req.query.postcode;
      if(req.query.linetwo != '') {
        applicant.address = req.query.lineone + ', ' + req.query.linetwo + ', ' + applicant.postCode;
      } else {
        applicant.address = req.query.lineone + ', ' + applicant.postCode;
      }
      console.log(applicant.address);
      variText.setContactText();
      if (checkApplicant(applicant.firstName, applicant.lastName, applicant.postCode) === true) {
        res.redirect('existing');
      } else if (applicant.renewing === true) {
        res.redirect('return-view');
      } else {
        res.redirect('mobile-question');
      }
    });
    
    //Mobile question
    router.get(/mobile-q-handler/, function (req, res) {
      if(req.query.mobile === 'yes') {
        applicant.hasMobile = true;
        applicant.setContactPref();
        res.redirect('mobile-number');
      } else if (req.query.mobile === 'no') {
        applicant.hasMobile = false;
        applicant.setContactPref();
        variText.setContactText();
        res.redirect('email-question');
      }
    });
    
    //Mobile capture
    router.get(/mobile-c-handler/, function (req, res) {
        applicant.mobile = req.query.mobile;
        variText.setContactText();
        res.redirect('email-question');
    });
    
    //Email question
    router.get(/email-q-handler/, function (req, res) {
      if(req.query.email === 'yes') {
        applicant.hasEmail = true;
        applicant.setContactPref();
        res.redirect('email-address');
      } else if(req.query.email === 'no') {
        applicant.hasEmail = false;
        applicant.setContactPref();
        variText.setContactText();
        res.redirect('duration');
      }
    });
    
    //Email capture
    router.get(/email-c-handler/, function (req, res) {
        applicant.email = req.query.email;
        console.log(applicant.email);
        variText.setContactText();
        res.redirect('duration');
    });
                
    //Duration and payment
    router.get(/duration-handler/, function (req, res) {
      ppc.duration = req.query.duration;
      variText.setPaymentText(ppc.duration);
      console.log(ppc.duration);
      res.redirect('start-date');
    });
       
    //start-date
    router.get(/start-date/, function (req, res) {
      res.render('ppc/start-date', {
        todayday : thisDay,
        todaymonth : thisMonth + 1,
        todayyear : thisYear,
        firstday : thisDay,
        firstmonth : monthToText(thisMonth),
        firstyear : thisYear
      });
    });
    
    //Start date handler
    router.get(/start-handler/, function (req, res) {
      ppc.startDay = req.query.day;
      ppc.startMonth = req.query.month;
      ppc.startYear = req.query.year;
      console.log(ppc.startDay + '  '+ ppc.startMonth + ' ' + ppc.startYear);
      ppc.startDate = dateStringCreator(ppc.startDay, ppc.startMonth, ppc.startYear);
      ppc.createEnd();
      res.redirect('check');
    });

    //Check your answers
    router.get(/check/, function (req, res) {
      var myDobMonth;
      var hasEmail = 'No';
      var hasMobile = 'No';
      if (applicant.dobMonth === null) {
        myDobMonth = 'May';
      } else {
        myDobMonth = monthToText(applicant.dobMonth);
      }
      if (applicant.mobile != null) {
        hasMobile = 'Yes';
      }
      if (applicant.email != null) {
        hasEmail = 'Yes';
      }
      console.log(boolToText(ppc.autoRenew));
      res.render('ppc/check', {
      name : applicant.firstName + ' ' + applicant.lastName,
      dobday : applicant.dobDay,
      dobmonth : myDobMonth,
      dobyear : applicant.dobYear,
      address : applicant.address,
      hasmobile : hasMobile,
      mobilenumber : applicant.mobile,
      hasemail :  hasEmail,
      emailaddress : applicant.email,
      length : variText.length,
      startdate : ppc.startDate,
      enddate : ppc.endDate,
      cost : variText.cost,
      method : variText.paymentMethod
      });
    });
        
    //card holder address holder
    router.get(/holder-handler/, function (req, res) {
      card.postCode = req.query.postcode;
      if(req.query.linetwo != '') {
        card.holderAddress = req.query.lineone + ', ' + req.query.linetwo + ', ' + card.postCode;
      } else {
        card.holderAddress = req.query.lineone + ', ' + card.postCode;
      }
      if (ppc.duration === "dd") {
        res.redirect('pay-date');
      } else {
        res.redirect('cp-confirm');
      }
    });
    
    //pay-date
    router.get(/pay-date/, function (req, res) {
        res.render('ppc/pay-date', {
        paydateone : payDateOne,
        paydatetwo : payDateTwo,
        paydatethree : payDateThree
      });
    });
    
    //dd-handler
    router.get(/dd-handler/, function (req, res) {
        res.redirect('payment-prompt');
    });
    
    //pay-handler
    router.get(/payment-add/, function (req, res) {
      res.render('ppc/payment-add', {
        format : capitaliseFirst(variText.format)
      });
    });
    
    //pay-handler
    router.get(/pay-handler/, function (req, res) {
      res.redirect('auto-renew');
    });
    
    //pay-handler
    router.get(/c-handler/, function (req, res) {
      console.log(ppc.duration);
      if (ppc.duration === 'dd') {
        res.redirect('ddpay');
      } else {
        res.redirect('payment-details');
      }      
    });
    
    //auto-handler
    router.get(/auto-handler/, function (req, res) {
      if(req.query.renew === 'yes') {
        ppc.autoRenew = true;
      } else {
        ppc.autoRenew = false;
      }
      res.redirect('dd-confirm');
    });

    //done-v3
    router.get(/done-v3/, function (req, res) {
      res.render('ppc/done-v3', {
        contacttext : variText.contactText,
        duration : variText.length,
        name : applicant.fullName,
        startdate : ppc.startDate,
        enddate : ppc.endDate,
        reminder : monthToText(ppc.endMonth -1) + ppc.endYear
      });
    });
    
    //payment
    router.get(/payment-details/, function (req, res) {
      res.render('ppc/payment-details', {
      cardpaymentinfo : variText.cardPaymentInfo,
      cost : variText.cost
      });
    });
    
    //confirm direct debit details
    router.get(/dd-confirm/, function (req, res) {
      res.render('ppc/dd-confirm', {
        cardnumber : card.cardNumber,
        exdate : card.exDate,
        holdername : card.holderName,
        holderaddress : card.holderAddress,
        cardpaymentinfo : variText.cardPaymentInfo,
        cost : variText.cost,
        startdate : ppc.startDate,
        enddate : ppc.endDate,
        autorenew : boolToText(ppc.autoRenew)
      });
    });
    
    //confirm card details
    router.get(/cp-confirm/, function (req, res) {
      res.render('ppc/cp-confirm', {
        cardnumber : card.cardNumber,
        exdate : card.exDate,
        holdername : card.holderName,
        holderaddress : card.holderAddress,
        cardpaymentinfo : variText.cardPaymentInfo,
        cost : variText.cost
      });
    });
        
    //card handler
    router.get(/card-handler/, function (req, res) {
      if (req.query.cardnumber != '') {
        card.cardNumber = req.query.cardnumber;
        card.setCardNumber();
      }
      if (req.query.exmonth != '') {
        card.exMonth = req.query.exmonth;
      }
      if (req.query.exyear != '') {
        card.exYear = req.query.exyear;
        card.setExdate();
      }
      if (req.query.holdername != '') {
        card.holderName = req.query.holdername;
      }
      res.redirect('cp-confirm');
    });
    
    //Card / account holders address the same
    router.get(/payment-prompt/, function (req, res) {
      res.render('ppc/payment-prompt', {
        format : variText.format
      });
    });
    
    //return-view
    router.get(/return-view/, function (req, res) {
      res.render('ppc/return-view', {
      name : applicant.firstName + ' ' + applicant.lastName
      });
    });
    
    //auto-handler
    router.get(/prompt-handler/, function (req, res) {
      if(req.query.prompt === 'yes') {
        card.holderAddress = applicant.address;
        if (ppc.duration === "dd") {
          res.redirect('pay-date');
        } else {
          res.redirect('cp-confirm');
        }
      } else {
        res.redirect('payment-add');
      }
    });
 