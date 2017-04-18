function Person(
  age,
  need,
  country, 
  education,
  namedOnTaxCredits,
  claimsTaxCredits,
  incomeSupport,
  isPregnant,
  hasMatexCard,
  hasMedexCard,
  hasHealthCondition
  // LIS questions
  // ppc
) {
  this.age = age,
  this.need = need,
  this.country = country, 
  this.education = education,
  this.namedOnTaxCredits = namedOnTaxCredits,
  this.claimsTaxCredits = claimsTaxCredits,
  this.incomeSupport = incomeSupport,
  this.isPregnant = isPregnant,
  this.hasMatexCard = hasMatexCard,
  this.hasMedexCard = hasMedexCard,
  this.hasHealthCondition = hasHealthCondition
}
// work out age


//Person.prototype.printPerson = function () {
//  console.log(
//    "dob Year = " + this.age + " \n" +
//    "need = " + this.need = need +
//    "country = " + this.country = country + 
//    "education = " + this.education = education +
//    "named on tax credits = " + this.namedOnTaxCredits = namedOnTaxCredits +
//    "claimsTaxCredits = " + this.claimsTaxCredits = claimsTaxCredits +
//    "income support = " + this.incomeSupport = incomeSupport +
//    "pregnant = " + this.isPregnant = isPregnant +
//    "matex card = " + this.hasMatexCard = hasMatexCard +
//    "medex card = " + this.hasMedexCard = hasMedexCard +
//    "Health Condition = " + this.hasHealthCondition = hasHealthCondition
//  );
//};

Person.prototype.resetPerson = function () {
  this.age = null;
  this.age = null;
  this.need = null;
  this.country = null; 
  this.education = null;
  this.namedOnTaxCredits = null;
  this.claimsTaxCredits = null;
  this.incomeSupport = null;
  this.isPregnant = null;
  this.hasMatexCard = null;
  this.hasMedexCard = null;
  this.hasHealthCondition = null;
  console.log('resetting person...');
};

Person.prototype.benefitChecker = function (benefits) {
  if (typeof benefits === "string") {
    if (benefits === "dla") {
      this.disabilityLivingAllowance = true;
      console.log("dla");
      return "dla";
    } else if (benefits === "pip") {
      this.personalIndependence = true;
      console.log("pip");
      return "pip";
    } else {
      console.log("none");
      return "none";
    }
  } else if (typeof benefits === "object") {
    firstBenefit = null;
    for (i = 0; i < benefits.length; i += 1) {
      if (benefits[i] === 'dla') {
        this.disabilityLivingAllowance = true;
        console.log("dla");
        if (firstBenefit === null) {
          firstBenefit =  "dla";
        }
      } else if (benefits[i] === 'pip') {
        this.personalIndependence = true;
        console.log("pip");
        if (firstBenefit === null) {
          firstBenefit = "pip";
        }
      } else if (benefits[i] === 'none') {
        console.log("none");
        if (firstBenefit === null) {
          firstBenefit = "none";
        }
      }
    }
    return firstBenefit;
  }
};

function createPerson() {
  return new Person();
}

module.exports.createPerson = createPerson;