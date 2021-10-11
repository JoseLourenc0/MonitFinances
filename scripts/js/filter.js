const arrPtOcorr = ['MERCADO','PIX','UBER']
const arrMonthsUC = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]

const arrPtMonthsUC = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"]

const buildSelectMonth = () => {
    let filterByMonth = document.getElementById('filterByMonth')

    filterByMonth.innerHTML = '<option value = "null" selected disabled>Mês</option>'

    arrPtMonths.map( e => {
        filterByMonth.innerHTML +=
        `
            <option value = "${e}">${e}</option>
        `
    })

}

const buildSelectOcorr = () => {
    let filterByOcor = document.getElementById('filterByOcor')

    filterByOcor.innerHTML = '<option value = "null" selected disabled>Ocorrência</option>'

    arrPtOcorr.map( e => {
        filterByOcor.innerHTML +=
        `
            <option value = "${e}">${e}</option>
        `
    })

}

const filter = () => {
    
    let month = document.getElementById('filterByMonth').value
    let ocorr = document.getElementById('filterByOcor').value
    let description = document.getElementById('filterByDescription')

    let expensesFiltered

    if(!month || month=='null' || month == 'NULL'){
        month = null
    }else{
        month = month.toUpperCase()
        expensesFiltered = Expenses.filter( e => {
            return e.descriptionUC.includes(month) || e.descriptionUC.includes(arrMonthsUC[arrPtMonthsUC.indexOf(month)])
        })
    } 

    if(!ocorr || ocorr=='null' || ocorr == 'NULL'){
        ocorr = null
    }else{
        expensesFiltered = Expenses.filter( e => {
            return e.descriptionUC.includes(ocorr)
        })
    }

    description = description.value ? description.value.toUpperCase() :  null

    if(!description || description=='null' || description == 'NULL'){
        description = null
    }else{
        expensesFiltered = Expenses.filter( e => {
            return e.descriptionUC.includes(description)
        })
    }

    buildHistory(expensesFiltered)    

    buildChartwithData(expensesFiltered.reverse())

}

const buildHistory = e => {

    let list = document.getElementById('list')

    if(e){

        let total = 0

        list.innerHTML = ''

        e.forEach( u => {

            let row = list.insertRow()

            row.insertCell(0).innerHTML = u.description
            row.insertCell(1).innerHTML = 
                                            `
                                            <p class='${u.value>=0?'greenp':'redp'}'>    
                                               R$ ${u.value}
                                            </p>
                                            `
            row.insertCell(2).innerHTML = u.date

            let btn = document.createElement('button')
            btn.className = 'btn btn-danger'
            btn.innerHTML = '<i class="fa fa-times"  ></i>'
            btn.onclick = function(){
                removeReg(u.date)
            }
            row.insertCell(3).append(btn)
            
            total += parseFloat(u.value)

        })

        let row = list.insertRow()
        row.insertCell(0).innerHTML = '<strong style="text-align:right">Total:</strong>'
        row.insertCell(1).innerHTML = 
                                            `
                                            <p class='${total>=0?'greenp':'redp'}'>    
                                               R$ ${String(total).includes('.') ? String(total.toFixed(2)).replace('.',',') : total+',00'}
                                            </p>
                                            `
        row.insertCell(2).innerHTML = ''
        row.insertCell(3).innerHTML = ''

    }

}

const buildChartwithData = (e) => {

        if(e && e.length>=1){
            let arr = []
            let tval = 0

            e.forEach( (u,i) => {

                tval += parseFloat(u.value)
                arr[i] = new Array
                arr[i][0] = u.date
                arr[i][1] = tval

            })

            let arr1 = [['DATE','Wallet']]
            let arrt = arr1.concat(arr)

            let data = google.visualization.arrayToDataTable(arrt)
            let options = {
                title: 'DATE x Wallet',
                legend: { position: 'right'}
            }
            let chart = new google.visualization.LineChart(document.getElementById('chart'))

            chart.draw(data,options)
        }
}

$(document).ready(function(){

    buildSelectMonth()
    buildSelectOcorr()

})