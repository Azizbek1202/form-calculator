// var metodSelect = document.getElementById("metod");
// var yurLitso = document.getElementById("yurlitso");
// var schotInput = document.getElementById("schot");
// var com=document.getElementById("komissiya").value/100;
// var gob_group = document.getElementById("gobgroup")
// var nalog = 0
// let fakt_sabes = null
// metodSelect.addEventListener("change", function() {
//     if (metodSelect.value === "kombi") {
        
//         schotInput.disabled = false;
//     } else {
        
//         schotInput.disabled = true;
//     }
// });

// yurLitso.addEventListener("change", function(){
//     if(yurLitso.value==="ip"){
//         fakt_sabes = price;
//         nalog = 0.02;
//     }else{
//         switch(metodSelect.value){
//             case "nalicha":
//                 fakt_sabes = price / 0.985 * 1.12
//                 break;
//             case "kombi":
//                 fakt_sabes = schotInput.value
//                 break;
//             case "1_k":
//                 fakt_sabes =  price/0.99
//                 break
//         }
//         nalog = 0.06
//     }
// })

// var fullCommision = nalog + com;

// let prices_commission = {
//     sebes_narx: sebes_narx,
//     min_cost_0 : fakt_sabes / (1-fullCommision),
//     min_cost_2 : fakt_sabes * 1.02 / (1-fullCommision),
//     real_cost : fakt_sabes * 1.08 /(1-fullCommision),
// }

// let prices_commission_logistic = {
//     sebes_narx: sebes_narx,
//     min_cost_0 : prices_commission.min_cost_0 + get_logistic_cost(gob_group.value, prices_commission.min_cost_0),
//     min_cost_2 : prices_commission.min_cost_2 + get_logistic_cost(gob_group.value, prices_commission.min_cost_2),
//     real_cost : prices_commission.real_cost + get_logistic_cost(gob_group.value, prices_commission.real_cost),
//     high_cost : ( prices_commission.real_cost + get_logistic_cost(gob_group.value, prices_commission.real_cost)) / 0.55
// }




// gob_group.addEventListener("change", function(){
//     if(gob_group.value === "mgt"){
//         if(price < 8000){
//             gob_price = price + 2000;
            
//         }else if(8000<price<96000){
//             gob_price = price + 4000;
            
//         } else if(price > 96000){
//             gob_price = price + 6000;
            
//         }
//     }else if(gob_group.value === "sgt"){
//         gob_price = price + 8000
//     }else if(gob_group.value === "kgt"){
//         gob_price = price + 12000;    
//     }
// })

// function get_logistic_cost(gb_gr, sell_price){
//     let logistic_cost  = null
//     if(gb_gr === "mgt"){
//         if(sell_price < 8000){
//             logistic_cost =  2000;
            
//         }else if(sell_price < 96000){
//             logistic_cost =  4000;
            
//         } else{
//             logistic_cost = 6000;
            
//         }
//     }else if(gb_gr === "sgt"){
//         logistic_cost = 8000
//     }else if(gb_gr === "kgt"){
//         logistic_cost = 20000;    
//     }

//     return logistic_cost
// }



// yurLitso.addEventListener("change", function(){
    // console.log(yurLitso.value)
    // if(yurLitso.value==="ip"){
    //     fakt_sabes = price;
    //     nalog = 0.02;
    // }else{
    //     switch(metodSelect.value){
    //         case "nalicha":
    //             fakt_sabes = price / 0.985 * 1.12
    //             break;
    //         case "kombi":
    //             fakt_sabes = schotInput.value
    //             break;
    //         case "1_k":
    //             fakt_sabes =  price/0.99
    //             break
    //     }
    //     nalog = 0.06
    // }
// })

let yurLitsoElement = document.getElementById("yurlitso");
var metodSelect = document.getElementById("metod");
var schotInputElement = document.getElementById("schot");
var komissiyaInputElement = document.getElementById("komissiya");
var gob_groupElement = document.getElementById("gobgroup");
var priceInputElement = document.getElementById("price");
var marginDiscountInputElement = document.getElementById("margin_discount");
var marginBeforeInputElement = document.getElementById("margin_before");
var nalog = 0;

function formatInput(input) {
    var numbers = input.value.replace(/\D/g, '');
    var formatted = numbers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    input.value = formatted;
}

metodSelect.addEventListener("change", function() {
    
    if (metodSelect.value === "kombi") {
        
        schotInputElement.disabled = false;
    } else {
        
        schotInputElement.disabled = true;
    }
});



function calculateAndDisplayResults() {
    let yurLitso = yurLitsoElement.value
    let schotInput = schotInputElement.value
    let komissiyaInput = komissiyaInputElement.value
    let gob_group = gob_groupElement.value
    let priceInput = priceInputElement.value.replaceAll(' ', '')
    let marginDiscountInput = marginDiscountInputElement.value
    
    
    var fakt_sabes = null;

    if(yurLitso === "ip") {
        fakt_sabes = priceInput;
        nalog = 0.06;
    } else {
        switch(metodSelect.value) {
            case "nalicha":
                fakt_sabes = priceInput / 0.985 * 1.12;
                break;
            case "kombi":
                schotInput = String(schotInput).replace(/[\s,]/g, '')
        
                
                schotInput = parseFloat(schotInput);
                
                schotInput = Math.round(schotInput); 
        
                if (!schotInput) { break };
        
                if (schotInput > priceInput) {
                  let dok_sebes_narx = schotInput / 1.12
                  let dok_nds = schotInput - dok_sebes_narx
                  let fakt_sebes_narx = price / 1.12
        
                  fakt_sabes = dok_nds + fakt_sebes_narx
                  break
                } else {
                  let nal_pay = priceInput - schotInput
                  let nal_pay_with_nalog = nal_pay / 0.85 / 0.95 / 0.99 * 1.12
                  fakt_sabes = price - nal_pay + nal_pay_with_nalog;
                  console.log("price_with_tax in func")
                  console.log(price_with_tax)
                  break
        
                }
                
            case "1_k":
                fakt_sabes =  priceInput / 0.99;
                break;
        }
        nalog = 0.02;
    }


    var gob_price = 0;
    if(gob_group === "mgt") {
        if(priceInput < 8000) {
            gob_price = parseFloat(priceInput) + 2000;
        } else if(8000 < priceInput && priceInput < 96000) {
            gob_price = parseFloat(priceInput) + 4000;
        } else if(priceInput > 96000) {
            gob_price = parseFloat(priceInput) + 6000;
        }
    } else if(gob_group === "sgt") {
        gob_price = parseFloat(priceInput) + 8000;
    } else if(gob_group === "kgt") {
        gob_price = parseFloat(priceInput) + 12000;    
    }

    var fullCommission = parseFloat(komissiyaInput) / 100 + nalog;

    var pricesCommission = {
        sebes_narx: fakt_sabes,
        min_cost_0 : fakt_sabes / (1 - fullCommission),
        min_cost_2 : fakt_sabes * 1.02 / (1 - fullCommission),
        real_cost : fakt_sabes * marginDiscountInput / (1 - fullCommission),
        high_cost : (fakt_sabes * 1.08 / (1 - fullCommission)) / 0.55
    };

    var pricesCommissionLogistic = {
        sebes_narx: fakt_sabes.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '),
        min_cost_0 : (pricesCommission.min_cost_0 + getLogisticCost(gob_group, pricesCommission.min_cost_0)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '),
        min_cost_2 : (pricesCommission.min_cost_2 + getLogisticCost(gob_group, pricesCommission.min_cost_2)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '),
        real_cost : (pricesCommission.real_cost + getLogisticCost(gob_group, pricesCommission.real_cost)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '),
        high_cost : ((pricesCommission.real_cost + getLogisticCost(gob_group, pricesCommission.real_cost)) / 0.55).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    };
    
    // document.getElementById("p1p").innerHTML=pricesCommissionLogistic["фактический приход (Цена)"];
   document.getElementById("sebs").innerHTML = pricesCommissionLogistic.sebes_narx + " sum"
   document.getElementById("minmin").innerHTML = pricesCommissionLogistic.min_cost_0 + " sum"
   document.getElementById("min").innerHTML = pricesCommissionLogistic.min_cost_2  + " sum"
   document.getElementById("real_price").innerHTML = pricesCommissionLogistic.real_cost  + " sum"
   document.getElementById("suggested_price").innerHTML = pricesCommissionLogistic.high_cost  + " sum"
}

function getLogisticCost(gb_gr, sell_price) {
    var logistic_cost  = null;
    if(gb_gr === "mgt") {
        if(sell_price < 8000) {
            logistic_cost = 2000;  
        } else if(sell_price < 96000) {
            logistic_cost = 4000; 
        } else {
            logistic_cost = 6000;
        }
    } else if(gb_gr === "sgt") {
        logistic_cost = 8000;
    } else if(gb_gr === "kgt") {
        logistic_cost = 20000;    
    }
    return logistic_cost;
}
