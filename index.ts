#! /usr/bin/env node

import ora from "ora";
import inquirer from "inquirer";
// import Choice from "inquirer/lib/objects/choice.js";
// import Choices from "inquirer/lib/objects/choices.js";
import validator from "validator";
let decision: boolean = true;
let user_name: string = "abdularham";
let pass_code: number = 12345;
let balance : number = 100000;
let new_balance;
// module 1 (id,password,heading in end formatting)
  
let duration = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
};

let initial = async () => {
  for (let index = 0; index < 4; index++) {
    let user_input: { name_of_user: string; pass_code: number } =
      await inquirer.prompt([
        {
          type: "string",
          name: "name_of_user",
          message: "Enter your correct user name(abdularham) : ",
        },
        {
          type: "password",
          name: "pass_code",
          message: "Enter your correct password(12345) : ",
        },
      ]);
    if (
      !validator.default.isAlpha(user_input.name_of_user) ||
      !validator.default.isNumeric(user_input.pass_code as any) ||
      ((user_name != user_input.name_of_user ||
        pass_code != user_input.pass_code) &&
        index <= 3)
    ) {
      console.log("Invalid user Credential enter check username and password");
      if (index == 3) {
        console.log("Sorry ! Try after some moments ");
      }
    }
    if (
      user_name == user_input.name_of_user &&
      pass_code == user_input.pass_code
    ) {
      await welcoming();
      await secondary();
    }

  }
};
let welcoming =async () => {
  console.log("Thank you for log-in to our system ");
  await duration();
  console.log("Your presence is kindly be appreciated");
  await duration();
  console.log("We are providing following services ");
  await duration();
}

let secondary = async () => {
  let services = await inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select any one of the following",
      choices: ["Cash withdraw", "Loan", "Check current Balance","card out"],
    }
  ]);
  if (services.options == "Cash withdraw") {
    await cash_withdraw_module();
    await secondary()
  }
  if (services.options == "Loan") {
    await loan_interest_policy();
    await loan_amount();
    
  }
  if (services.options == "Check current Balance") {
      await current_balance_();
      await secondary();
    
  }
  if(services.options == "card out"){
    await terminate();
  }
};

let cash_withdraw_module =async () => {
  
    let amount = await inquirer.prompt([
      {
        type : "string",
        name : "required_amount",
        message : "Enter amount : "
      }
    ]);

    let withdraw_calculation = async () => {
      if (amount.required_amount > 25000 || amount.required_amount < 6000 ){
        console.log("Amount should be less than 25000 and greater than 6000");
        await secondary()
      }
      if (balance <= 500) {
        console.log("You account balance is at minimum range kindly add funds");
        await secondary();
      }
      if(balance < amount.required_amount ){
        console.log("Insufficient Fund");
        console.log("Current Balance is : " + balance);
        await secondary();
      }
      if(balance > amount.required_amount){
        balance = balance - amount.required_amount;
        await loading_for_withdraw();
        await duration();
        console.log("Your current balance is : " + balance );
        await secondary();
      
      }
    
    }  
    

    if (validator.default.isNumeric(amount.required_amount)) {
      await withdraw_calculation();
    }
    if(validator.default.isAlphanumeric(amount.required_amount) ||
      validator.default.isAlpha(amount.required_amount)){
      console.log("entre valid amount");
      await cash_withdraw_module();
    }
    
  
} 
let current_balance_ =async () => {
  await loading_for_current_balance();
  await duration();
}

let loan_interest_policy = async () => {
    let repay_calculation_of_loan_of_1_year = (balance * 5) / 100;
    let repay_calculation_of_loan_of_2_year = (balance * 10) / 100;
    let repay_calculation_of_loan_of_3_year = (balance * 15) / 100;
    let repay_calculation_of_loan_of_4_year = (balance * 10) / 100;
    let repay_calculation_of_loan_of_5_year = (balance * 25) / 100;
    console.log("According to the loan policy 5% interest would be added to the current loan amount if the return plan is of 1 year");
    console.log();
    console.log("Total amount of interest would be " + (repay_calculation_of_loan_of_1_year) + " on the current account balance could fluctuate by current balance ");  
    console.log();
    console.log("According to the loan policy 10% interest would be added to the current loan amount if the return plan is of 2 year");
    console.log();
    console.log("Total amount of interest would be " + (repay_calculation_of_loan_of_2_year) + " on the current account balance could fluctuate by current balance ");  
    console.log();
    console.log("According to the loan policy 15% interest would be added to the current loan amount if the return plan is of 3 year");
    console.log();
    console.log("Total amount of interest would be " + (repay_calculation_of_loan_of_3_year) + " on the current account balance could fluctuate by current balance "); 
    console.log();
    console.log("According to the loan policy 20% interest would be added to the current loan amount if the return plan is of 4 year");
    console.log(); 
    console.log("Total amount of interest would be " + (repay_calculation_of_loan_of_4_year) + " on the current account balance could fluctuate by current balance ");  
    console.log();
    console.log("According to the loan policy 25% interest would be added to the current loan amount if the return plan is of 5 year");
    console.log();
    console.log("Total amount of interest would be " + (repay_calculation_of_loan_of_5_year) + " on the current account balance could fluctuate by current balance ");  
  console.log();
}
let loan_amount =async () => {
  let require = await inquirer.prompt([
    {
      name : "user_loan_amount",
      type : "number",
      message : "Enter the amount of loan you want : "
    }
  ]);
  let restriction = (balance * 50) / 100 ;
  if (restriction <= require.user_loan_amount) {
    console.log("Sorry ! you can only get the loan under " + restriction + " amount ");
    await loan_amount()
  }
  else {
    balance = balance + require.user_loan_amount;
    await repay_plan()
    await secondary();
  } 
}
let repay_plan =async () => {
  let selection = await inquirer.prompt([
    {
      name : "repay_plan",
      type : "list",
      message : "Select the repay plan",
      choices : ["1 year","2 years","3 years","4 years","5 years"]
    }
  ]);
  if (selection.repay_plan === "1 year") {
    let interest_calculation_1 = (balance * 5) / 100;
    balance = balance + interest_calculation_1;
    await loading_for_loan();
    await duration();
    await secondary();
  }
  if (selection.repay_plan === "2 years") {
    let interest_calculation_2 = (balance * 10) / 100;
    balance = balance + interest_calculation_2;
    console.log("Amount transfer successfully . . . ");

    await secondary();
  }
  if (selection.repay_plan === "3 years") {
    let interest_calculation_3 = (balance * 15) / 100;
    balance = balance + interest_calculation_3;
    console.log("Amount transfer successfully . . . ");
    await loading_for_loan();
    await duration();
    await secondary();
  }
  if (selection.repay_plan === "4 years") {
    let interest_calculation_4 = (balance * 20) / 100;
    balance = balance + interest_calculation_4;
    console.log("Amount transfer successfully . . . ");
    await loading_for_loan();
    await duration();
    await secondary();
  }
  if (selection.repay_plan === "5 years") {
    let interest_calculation_5 = (balance * 25) / 100;
    balance = balance + interest_calculation_5;
    console.log("Amount transfer successfully . . . ");
    await loading_for_loan();
    await duration();
    await secondary();
  }
}

let terminate =async () => {
  console.log("Thankyou for using our service");
  await duration();
  console.log();
  console.log("Glad to have you");
  console.log();
  await duration();
  await loading();  
  await  duration();
  process.exit();
  
}


let loading = async () => {
  const spinner = ora('Loading').start();
  setTimeout(() => {
  spinner.succeed('Card out Successfully');
},1500);

}

let loading_for_withdraw = async () => {
  const spinner = ora('Cash withdraw in progress').start();
  setTimeout(() => {
  spinner.succeed('Cash withdraw Successfully');
},1500);

}
let loading_for_loan = async () => {
  const spinner = ora('Loan amount transfer in progress').start();
  setTimeout(() => {
  spinner.succeed('Loan amount transfer Successfully');
},1500);

}
let loading_for_current_balance = async () => {
  const spinner = ora('Validating balance').start();
  setTimeout(() => {
  spinner.succeed("Current balance is : " + balance);
},1500);

}

initial();
