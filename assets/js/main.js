(async function () {
    urlCountry = 'https://restcountries.eu/rest/v2/all';
    urlNBU = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    let dataCountry = await fetch(urlCountry);
    let dataNBU = await fetch(urlNBU);
    dataCountry = await dataCountry.json();
    dataNBU = await dataNBU.json();
    let data = new Array();
    
    //create new array whith objects whit need information
    for (let i = 0; i < dataCountry.length; i++) {
        for (let j = 0; j < dataNBU.length; j++) {
            //console.log(j,dataNBU[j].cc);
            //console.log(i,dataCountry[i].currencies.code)
            for (let k = 0; k < dataCountry[i].currencies.length; k++) { 
                if (dataNBU[j].cc == dataCountry[i].currencies[k].code) {
                    let info = new Object();
                    info.name = dataCountry[i].name;
                    info.code = dataCountry[i].currencies[k].code;
                    info.flag = dataCountry[i].flag;
                    info.cc = dataNBU[j].cc;
                    info.txt = dataNBU[j].txt;
                    info.rate = dataNBU[j].rate;
                    info.exchangedate = dataNBU[j].exchangedate;
                    
                    console.log(info);
                    data.push(info); 
                    j = dataNBU.length;
                    k = dataCountry[i].currencies.length;
                }
            }              
        }
    }

    //create HTML code use data from us array 
    let box = document.querySelector('.listCountry');
    box.innerHTML = data.map(item => 
        `<div class="border">
        <img class="border" src="${item.flag}" alt="flag">
        <span> ${item.name} (${item.code} - ${item.txt})</span>
        <span>Курс ${item.rate} на ${item.exchangedate}</span>
        </div>`
        )

    console.log(dataCountry);
    console.log(dataNBU);
    console.log(data);
})()