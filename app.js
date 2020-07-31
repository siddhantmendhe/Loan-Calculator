document.getElementById('loan-form').addEventListener('submit',function(e){

document.getElementById('loading').style.display='block'

//calculate function after 2 sec
setTimeout(calculateResults,2000);
e.preventDefault();
    
});

//calculate result

function calculateResults(){
    
    //UI vars
    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    const monthlyPayment=document.getElementById('monthly-payment');
    const totalPlayment=document.getElementById('total-payment');
    const totalInterest=document.getElementById('total-interest');

    const principal=parseFloat(amount.value);
    const calculatedInterest=parseFloat(interest.value)/100/12;
    const calculatedPayments=parseFloat(years.value)*12;
    //calculate monthly payment
    const x=Math.pow(1+calculatedInterest,-calculatedPayments);
    const monthly=(principal*calculatedInterest)/(1-x);

    if(isFinite(monthly)){
        monthlyPayment.value=monthly.toFixed(2);
        totalPlayment.value=(monthly*calculatedPayments).toFixed(2);
        totalInterest.value=((monthly*calculatedPayments)-principal).toFixed(2);
        document.getElementById('loading').style.display='none';
        document.getElementById('results').style.display='block'


    }
    else{
        showError('Please Check you numbers');
    }

   
}

function showError(error){
    //Create a div
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');
    const errorDiv=document.createElement('div');
    errorDiv.className='alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading 
    card.insertBefore(errorDiv,heading);
    document.getElementById('loading').style.display='none';

    //Insert error above heading 
    setTimeout(clearError,3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}

