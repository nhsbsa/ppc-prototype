var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

//import the person constructor
var person = require("./person.js");

module.exports = router

//create an applicant
var applicant = person.createPerson(
  this.age = undefined,
  this.need = undefined,
  this.country = "england",
  this.gp = undefined,
  this.highlands = undefined,
  this.education = undefined,
  this.namedOnTaxCredits = undefined,
  this.claimsTaxCredits = false,
  this.incomeSupport = false,
  this.isPregnant = false,
  this.hasMatexCard = false,
  this.hasMedexCard = false,
  this.hasHealthCondition = false
);

var thisYear = 2016;
var parentTc = false;
var pregnancy = false;
var medicalEx = false;
var warPension = false;

var variText = {
    sightText : "sight test",
    setSightText : function() {
      if(applicant.country === "scotland") {
        this.sightText = "eye exam";
      }
    }
};


//partner question variable
 var setPartnerText = function (partner) {
    if (applicant.partner === false) {
      partnerBothText = 'you';
      partnerCommaText = 'you';
      partnerOrText = 'you';
      partnerAndText = 'you';
      partnerAndTextDo = 'Do you';
      partnersText = 'your';
      partnersAndText = "your";
      parentText = "Does your parent or guardian";
      iWe = 'I';
      jointOrText = 'your';
      combinedOrText = 'your';
      partnerPlustext = 'your';
      singleJointUC = 'Was your take-home pay for your last Universal Credit period £935 or less?';
    } else {
      partnerBothText = 'you, your partner or both of you';
      partnerCommaText = 'you, your partner';
      partnerOrText = 'you or your partner';
      partnerAndText = 'you and your partner';
      partnerAndTextDo = 'Do you and your partner';
      partnersText = "your or your partner's";
      partnersAndText = "your and your partner's";
      parentText = "Does your parent or guardian";
      parentOrText = "your or your parents";
      iWe = 'we';
      jointOrText = 'your joint';
      combinedOrText = "your and your partner's combined";
      partnerPlustext = "yours plus your partner's";
      singleJointUC = 'Did you and your partner have a combined take-home pay of £935 or less in your last Universal Credit period?'
    }
  };

var querystring = require('querystring');

    //foogle search
    router.get(/go-handler/, function (req, res) {
      var term = req.query.search;
      if(term === 'LIS' || term === 'low income scheme' || term === 'HC2' || term === 'hc2') {
        res.render('checker/1/google/prescription-result', {
          term : term
        });
        console.log(term);
      } else {
        res.render('checker/1/google/result', {
          term : term
        });
      }
    });


     // partner handler v2
    router.get(/p2-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        //aboutPartnerStatus = "Started";
        //aboutPartnerLink = continueText;
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        //aboutPartnerStatus = completedText;
        //aboutPartnerLink = changeText;
      }
      setPartnerText(applicant.partner);
        if(applicant.age >= 20) {
          res.render('checker/1/tax-credits-over20', {
            'partnerortext' : partnerOrText,
              'iwe' : iWe
            });
        } else {
            res.render('checker/1/tax-credits-under20', {
                'partnerortext' : partnerOrText,
                'iwe' : iWe
            });
        }
    });


 	// country-handler with scotland and wales added
      router.get(/country-b4-handler/, function (req, res) {
      if (req.query.countryBeta  === 'englandBeta'){
        res.redirect('gp-country');
      } else if (req.query.countryBeta  === 'scotlandBeta') {
        applicant.country = "scotland";
    	res.redirect('highlands-islands');
      } else if (req.query.countryBeta  === 'walesBeta') {
        res.redirect('date-of-birth');
      } else {
        res.redirect('results/country-kickout-ni');
      }
    });

	// GP in Scotland or Wales
      router.get(/gp-handler/, function (req, res) {
      if (req.query.gpScot === 'yes') {
      	applicant.gp = "scotWales";
	  	res.redirect('date-of-birth');
      } else {
        res.redirect('date-of-birth');
      }
    });

   	// highlands or islands
      router.get(/higlands-handler/, function (req, res) {
      if (req.query.highIslands === 'yes') {
      	applicant.highlands = "highlands";
	  	res.redirect('date-of-birth');
      } else {
        res.redirect('date-of-birth');
      }
    });

    // dob-handler
    router.get(/dateofbirth-handler/, function (req, res) {
      applicant.age = (thisYear - req.query.dobyearBeta);
      console.log(applicant.age);
      if (applicant.age >= 20) {
        setPartnerText(applicant.partner);
        res.render('checker/1/partner', {
            'iwe' : iWe
        });
      } else if (applicant.age == 19) {
        res.redirect('partner');
      } else if (applicant.age >= 16) {
        res.redirect('full-time-education');
      } else if (applicant.age <= 15) {
        res.redirect('results/full-exemption-under-16');
      }
    });

     

    // full time higher education handler
      router.get(/fte-higher-handler/, function (req, res) {

      if (req.query.ftehigher  === 'yes'){
      res.redirect('results/full-exemption-fte');
      } else {
        res.redirect('partner');
      }
    });

	     // tax credits claim yes or no under 20
	  router.get(/taxcredits-under20/, function (req, res) {
	  applicant.namedOnTaxCredits = req.query.taxcredits;
	  if (applicant.namedOnTaxCredits === 'yes' || applicant.namedOnTaxCredits === 'nk' ) {
	    setPartnerText(applicant.partner);
	    res.render('checker/1/tax-credits-income', {
	    'partnerandtextdo' : partnerAndTextDo
	  });
	  } else {
	    res.redirect('tax-credits-under20-parents');
	  }
	}); 


          // tax credits claim under 20 parents
      router.get(/taxcredits-parents/, function (req, res) {
      if (req.query.taxcreditsParents  === 'yes'){
        parentTc = true;
        setPartnerText(applicant.partner);
        res.render('sprints/b4/tax-credits-income', {
        'parenttext' : parentText
      });
      } else {
        parentTc = false;
        res.redirect('passported-benefits-under20');
      }
    });

          // tax credits claim yes or no
      router.get(/taxcredits-over20/, function (req, res) {
      applicant.namedOnTaxCredits = req.query.taxcredits;
      if (applicant.namedOnTaxCredits === 'yes' || applicant.namedOnTaxCredits === 'nk' ) {
        res.redirect('tax-credits-income');
      } else {
        res.redirect('passported-benefits');
      }
    });


    // tax credits income handler
    router.get(/taxcredit-income-handler/, function (req, res) {
        if (applicant.age < 20 ) {
            if (req.query.taxcreditsIncome === 'no') {
                res.redirect('passported-benefits-under20');
            } else { //yes
                if (parentTc === true) {
                    res.render('checker/1/results/full-exemption-tc', {
                    'tctype' : tcType
            });
                } else {
                    setPartnerText(applicant.partner);
                    res.render('checker/1/tax-credits-claim-type', {
                        'partnerortext' : partnerOrText
                    });
                }
            }
        } else { //over 20
            if (req.query.taxcreditsIncome === 'no') {
                res.redirect('passported-benefits');
            } else {
                    res.render('checker/1/results/full-exemption-tc', {
                    'tctype' : tcType
            });
            }
          }
    });

      //new tax credits type handler
    var tcType;
      router.get(/taxcredit-type-handler/, function (req, res) {
        if (req.query.taxcreditsType ==="wtcctc") {
          tcType = 'Working Tax Credit and Child Tax Credit together';
        } else if (req.query.taxcreditsType ==="ctcdis") {
          tcType = 'Working Tax Credit including a disability element';
        } else if (req.query.taxcreditsType ==="ctc") {
          tcType = 'Child Tax Credit';
        } else {
          tcType = 'none';
          setPartnerText(applicant.partner);
        }
        if (applicant.age >= 20) {
          if (tcType === 'none') {
            res.render('checker/1/passported-benefits', {
              'partnerortext' : partnerOrText,
                'iwe' : iWe
            });
          } else {
            res.render('checker/1/tax-credits-income', {
                'partnerandtextdo' : partnerAndTextDo
            });
          }
        } else {
          if (tcType === 'none') {
            setPartnerText(applicant.partner);
            res.render('checker/1/passported-benefits-under20', {
              'partnercommatext' : partnerCommaText
            });
          } else {
            res.render('checker/1/results/full-exemption-tc', {
              'tctype' : tcType
            });
          }
        }
      });

var benType;
// passported benefits under 20 handler
      router.get(/passportedBen-u20/, function (req, res) {
        if (req.query.benefits ==="incomeSupport") {
          benType = 'Income Support';
          res.render('checker/1/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits ==="uniCredit") {
          benType = 'Universal Credit';
          setPartnerText(applicant.partner);
          res.render('checker/1/uc-claim-type-v2', {
            'bentype' : benType,
            'parenttext' : parentText
      });
        } else if (req.query.benefits ==="jsa") {
          benType = 'income based Job Seekers Allowance (JSA)';
          res.render('checker/1/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits ==="esa") {
          benType = 'income related Employment and Support Allowance (ESA)';
          res.render('checker/1/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits ==="penCredit") {
          benType = 'Pension Credit (Guarantee Credit)';
          res.render('checker/1/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits === 'continue') {
            if (applicant.age > 60) {
                res.redirect('../war-pension');
            } else {
                res.redirect('../pregnancy');
            }
      }
    });
      

    // passported benefits handler
      router.get(/passportedBen-handler/, function (req, res) {
        if (req.query.benefits ==="incomeSupport") {
          benType = 'Income Support';
          res.render('sprints/b3/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits ==="uniCredit") {
          benType = 'Universal Credit';
          setPartnerText(applicant.partner);
          res.render('sprints/b4/uc-claim-type-v2', {
            'bentype' : benType,
            'partnerortext' : partnerOrText
      });
        } else if (req.query.benefits ==="jsa") {
          benType = 'income based Job Seekers Allowance (JSA)';
          res.render('sprints/b3/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits ==="esa") {
          benType = 'income related Employment and Support Allowance (ESA)';
          res.render('sprints/b3/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits ==="penCredit") {
          benType = 'Pension Credit (Guarantee Credit)';
          res.render('sprints/b3/results/full-exemption-benefits', {
            'bentype' : benType
          });
        } else if (req.query.benefits === 'continue') {
            if (applicant.age > 60) {
                res.redirect('../war-pension');
            } else {
                res.redirect('../pregnancy');
            }
      }
    });

          // universal credits income handler
      router.get(/uc-type-handler/, function (req, res) {
      if (req.query.ucElement === 'yes') {
        res.redirect('../uc-income-with-element-v3');
      } else {
        res.redirect('../uc-income-without-element-v2');
      }
    });
                // universal credits without element handler (£435)
      router.get(/uc-element-income-handle/, function (req, res) {
      if (req.query.ucelementIncome === 'yes') {
        res.redirect('../results/full-exemption-uc');
            } else {
                res.redirect('../pregnancy');
      }
    });

                      // universal credits with element handler(£935)
            router.get(/uc-without-elements-handler/, function (req, res) {
      if (req.query.ucIncome === 'yes') {
        res.redirect('../results/full-exemption-uc');
      } else {
        res.redirect('../pregnancy');
      }
    });



      router.get(/guarantee-credit-handler/, function (req, res) {
        if (req.query.gcredit ==="yes") {
          var benType = 'Pension Credit Guarantee Credit';
          res.render('sprints/8/full-exemption-benefits', {
            'bentype' : benType
          });
        } else {
        res.redirect('../care-home');
      }
    });

                // pregnancy b4 router
      router.get(/preg-b4handler/, function (req, res) {
      if (req.query.pregnancy === 'yes') {
          pregnancy = true;
      res.redirect('../war-pension');
      } else {
          pregnancy = false;
        res.redirect('../war-pension');
      }
    });

          // pregnancy b2 router
      router.get(/preg-all-handler/, function (req, res) {
      if (req.query.pregnancy === 'yes') {
      res.redirect('../results/all-preg');
      } else {
        res.redirect('../war-pension');
      }
    });

          // war pensioner handler
      router.get(/war-b4handler/, function (req, res) {
      if (req.query.warPension === 'yes') {
        warPension = true;
        res.redirect('../medical-exemption');
      } else {
        warPension = false;
        res.redirect('../medical-exemption');
      }
    });

    // war pensioner handler
      router.get(/war-pension-handler/, function (req, res) {
      if (req.query.warPension === 'yes') {
        res.redirect('../results/prescription-war-pension');
      } else {
        res.redirect('../do-you-have-a-medical-exemption');
      }
    });

    // medex card yes or no router
      router.get(/medex-handler/, function (req, res) {
      if (req.query.medex === 'yes') {
      applicant.hasMedexCard = true;
      res.redirect('../care-home');
      } else {
        res.redirect('../medical-exemption');
      }
    });


// long term illness
router.get(/illness-b4/, function (req, res) {
  if (req.query.illness === 'yes') {
    medicalEx = true;
    setPartnerText(applicant.partner);
    res.render('sprints/b4/care-home', {
      'partnerortext' : partnerOrText
    });
  } else {
    medicalEx = false;
    res.render('sprints/b4/care-home', {
      'partnerortext' : partnerOrText
    });
  }
});

    // long term illness
//      router.get(/illness-handler/, function (req, res) {
//      if (req.query.illness === 'yes') {
//        res.redirect('../results/medex-apply');
//      } else {
//        res.redirect('../care-home');
//      }
//    });


//    // long term condition
//      router.get(/longterm-illness-handler/, function (req, res) {
//      if (req.query.longtermIllness === 'yes') {
//      res.redirect('../results/prescription-medex');
//      } else {
//        res.redirect('../care-home');
//      }
//    });

    // carehome router
      router.get(/care-home-handler/, function (req, res) {
      if (req.query.carehome === 'yes') {
           setPartnerText(applicant.partner);
          res.render('sprints/b4/sc/authority-assessed', {
            'partnerortext' : partnerOrText
      });
  } else {
    res.render('sprints/b4/savings1', {
      'partnerortext' : partnerOrText
    });
  }
});


//      // saving-handler
//      router.get(/saving-handler/, function (req, res) {
//        //scotland
//          if (applicant.country === 'scotland'){
//                if (req.query.savings === 'yes') {
//           if (pregnancy === true) {
//                res.redirect('../answers-preg-nolis');
//           } else if (warPension === true) {
//              res.redirect ('../answers-warpension-nolis');
//           } else if (medicalEx === true) {
//              res.redirect ('../answers-medex-nolis');
//           } else {
//              res.redirect ('../savings-kickout');
//           }
//        } else if (req.query.savings === 'no') {
//            if (pregnancy === true) {
//                res.redirect('../answers-preg-lis-v2');
//            } else if (warPension === true) {
//                res.redirect ('../answers-warpension-lis-v2');
//            } else if (medicalEx === true) {
//                res.redirect ('../answers-medex-lis-v3');
//            } else {
//                res.redirect ('../answers-lis-scot');
//            }
//        }
//        // wales
//         if (applicant.country === 'wales'){
//                if (req.query.savings === 'yes') {
//           if (pregnancy === true) {
//                res.redirect('../answers-preg-nolis');
//           } else if (warPension === true) {
//              res.redirect ('../answers-warpension-nolis');
//           } else if (medicalEx === true) {
//              res.redirect ('../answers-medex-nolis');
//           } else {
//              res.redirect ('../savings-kickout');
//           }
//        } else if (req.query.savings === 'no') {
//            if (pregnancy === true) {
//                res.redirect('../answers-preg-lis-v2');
//            } else if (warPension === true) {
//                res.redirect ('../answers-warpension-lis-v2');
//            } else if (medicalEx === true) {
//                res.redirect ('../answers-medex-lis-v3');
//            } else {
//                res.redirect ('../answers-lis-scot');
//            }
//
//        }
//              } if (applicant.country === 'england'){
//        if (req.query.savings === 'yes') {
//           if (pregnancy === true) {
//                res.redirect('../answers-preg-nolis');
//           } else if (warPension === true) {
//              res.redirect ('../answers-warpension-nolis');
//           } else if (medicalEx === true) {
//              res.redirect ('../answers-medex-nolis');
//           } else {
//              res.redirect ('../savings-kickout');
//           }
//        } else if (req.query.savings === 'no') {
//            if (pregnancy === true) {
//                res.redirect('../answers-preg-lis-v2');
//            } else if (warPension === true) {
//                res.redirect ('../answers-warpension-lis-v2');
//            } else if (medicalEx === true) {
//                res.redirect ('../answers-medex-lis-v3');
//            } else {
//                res.redirect ('../lis-v3');
//            }
//        }//end scot
//        }//else wales
//        }
//    });
        
// saving-handler
      router.get(/saving-handler/, function (req, res) {
        //england
                if (req.query.savings === 'yes') {
           if (pregnancy === true) {
                res.redirect('../answers-preg-nolis');
           } else if (warPension === true) {
              res.redirect ('../answers-warpension-nolis');
           } else if (medicalEx === true) {
              res.redirect ('../answers-medex-nolis');
           } else {
              res.redirect ('../savings-kickout');
           }
        } else if (req.query.savings === 'no') {
            if (pregnancy === true) {
                res.redirect('../answers-preg-lis-v2');
            } else if (warPension === true) {
                res.redirect ('../answers-warpension-lis-v2');
            } else if (medicalEx === true) {
                res.redirect ('../answers-medex-lis-v3');
            } else {
                setPartnerText(applicant.partner);
          res.render('sprints/b4/lis-v3', {
            'partnerortext' : partnerOrText,
            });
        }
        }
    });

    // authority assessment handler
    router.get(/authority-assessed-handler/, function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('../sc/lis-application');
      } else {
           setPartnerText(applicant.partner);
          res.render('sprints/b4/sc/savings', {
            'partnerortext' : partnerAndText,
      });
      }
    });
      
    // savings kickout handler
    router.get(/savings-ko-handler/, function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('../savings-kickout');
      } else {
        res.redirect('../guarantee-credit');
      }
    });

    // carehome savings kickout handler
    router.get(/carehome-savings-handler/, function (req, res) {
      if (req.query.savings === 'no') {
        res.redirect('../lis-v2');
      } else {
        res.redirect('../savings-kickout');
      }
    });
      


