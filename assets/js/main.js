(async function () {
    urlCountry = 'https://restcountries.com/v3.1/all';
    urlNBU = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    let dataCountry = await fetch(urlCountry);
    let dataNBU = await fetch(urlNBU);
    dataCountry = await dataCountry.json();
    dataNBU = await dataNBU.json();
    let data = new Array();
    console.log(dataCountry);
    console.log(dataNBU);
    
    //create new array whith objects whit need information
    for (let i = 0; i < dataCountry.length; i++) {
        console.log(dataCountry.length,i);
        let ccMoney
        if ("currencies" in dataCountry[i]) {
            ccMoney = Object.keys(dataCountry[i].currencies);
            console.log("good");
        }else{
            ccMoney = [0];
            console.log("bad");
        }
        for (let j = 0; j < dataNBU.length; j++) {
            //console.log(j,dataNBU[j].cc);
            //console.log(i,dataCountry[i].currencies.code)
            //console.log(ccMoney);
            //console.log(j,dataNBU[j].cc);
            //console.log(i,ccMoney[0]);
            for (let k = 0; k < ccMoney.length; k++) { 
                //console.log
                if (dataNBU[j].cc == ccMoney[k]) {
                    //console.log("good");
                    let info = new Object();
                    info.name = dataCountry[i].name.common;
                    info.code = ccMoney[0];
                    info.flag = dataCountry[i].flags.png;
                    //console.log(info.flag);
                    info.cc = dataNBU[j].cc;
                    info.txt = dataNBU[j].txt;
                    info.rate = dataNBU[j].rate;
                    info.exchangedate = dataNBU[j].exchangedate;
                    
                    console.log(info);
                    data.push(info); 
                    //j = dataNBU.length;
                    //k = ccMoney.length;
                }
            }              
        }
        console.log(data);
    }
    console.log(data);
    //create HTML code use data from us array 
    let box = document.querySelector('.listCountry');
    box.innerHTML = data.map(item => 
        `<div class="border mb-2">
        <img class="border" src="${item.flag}" alt="flag">
        <span> ${item.name} (${item.cc} - ${item.txt})</span>
        <span>Курс ${item.rate} на ${item.exchangedate}</span>
        </div>`
        ).join('');

    console.log(dataCountry);
    console.log(dataNBU);
    console.log(data);
})()