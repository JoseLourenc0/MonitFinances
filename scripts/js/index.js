const addExpense = () => {
    
    let description = getMonth() + ': ' + document.getElementById('description').value
    let val = document.getElementById('value').value
    let table = document.getElementById('listtables').value
    
    if(description && val && table){
        val = val.replace('U$','')
        val = val.replaceAll('.','')
        val = val.trim()

        $.ajax(
            {
                url:'scripts/php/insertData/newreg.php',
                method: 'POST',
                data:
                {
                    description,
                    val,
                    table
                },
                dataType:'json'
            }
        ).done( e => {

            if(e===1){
                buildModal('Success','New Reg created','btn-success')
                document.getElementById('description').value = ''
                document.getElementById('value').value = ''
                getExpenses()
                buildChart()
            }

        })
    }


}

const getTablesList = () => {
    let listtables = document.getElementById('listtables')

    $.ajax({

        url : 'scripts/php/indexPage/getTables.php',
        method : 'GET',
        dataType : 'json'

    }).done( e => {

        if(e){

            e.forEach(element => {
                listtables.innerHTML = 
                `
                    <option value = "${element.tab}">
                        ${element.tab}
                    </option>
                `
            })

        }

    })

}

const getExpenses = () => {
    let list = document.getElementById('list')

    $.ajax({
        
        url : 'scripts/php/indexPage/getExpenses.php',
        method : 'GET',
        dataType : 'json'

    }).done( e => {

        if(e){

            let total = 0

			list.innerHTML = ''

            e.reverse().forEach( u => {

                let row = list.insertRow()

				row.insertCell(0).innerHTML = u.description
				row.insertCell(1).innerHTML = 
                                                `
                                                <p class='${u.exp.replace(',','.')>=0?'greenp':'redp'}'>    
                                                   U$ ${u.exp}
                                                </p>
                                                `
				row.insertCell(2).innerHTML = u.datereg

                let btn = document.createElement('button')
				btn.className = 'btn btn-danger'
				btn.innerHTML = '<i class="fa fa-times"  ></i>'
				btn.onclick = function(){
					removeReg(u.datereg)
				}
				row.insertCell(3).append(btn)
                
                total += parseFloat(u.exp.replace(',','.'))

            })

            let row = list.insertRow()
            row.insertCell(0).innerHTML = '<strong style="text-align:right">Total:</strong>'
			row.insertCell(1).innerHTML = 
                                                `
                                                <p class='${total>=0?'greenp':'redp'}'>    
                                                   U$ ${String(total).includes('.') ? String(total.toFixed(2)).replace('.',',') : total+',00'}
                                                </p>
                                                `
			row.insertCell(2).innerHTML = ''
            row.insertCell(3).innerHTML = ''

        }

    })


}

const removeReg = d => {

    let table = document.getElementById('listtables').value

    if(d){
        $.ajax(
            {
                url : 'scripts/php/indexPage/removeReg.php',
                data : 
                    {
                        d,
                        table
                    },
                method : 'POST',
                dataType : 'json'
            }
        ).done( e => {

            if(e===1){
                getExpenses()
                buildModal('Success','Reg removed','btn-success')
            }

        })
    }
}

const buildChart = () => {

    $.ajax({
        
        url : 'scripts/php/indexPage/getExpenses.php',
        method : 'GET',
        dataType : 'json'

    }).done( e => {

        if(e && e.length>=1){
            let arr = []
            let tval = 0

            e.forEach( (u,i) => {

                tval += parseFloat(u.exp.replace(',','.'))
                arr[i] = new Array
                arr[i][0] = u.datereg
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
        

    })
    
    

}

const getMonth = (a = '') => {

    const arrMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    if(!a){

        const dt = new Date();
        return arrMonths[dt.getMonth()]

    }else{

        return arrMonths[++a]

    }
}

function buildModal(mtitle='Modal Title',mmsg='No message for you :3',mcolor='btn-primary'){
    let title = document.getElementById('ModalTitle')
    let body = document.getElementById('ModalBody')
    let btn = document.getElementById('ButtonModal')

    title.innerHTML = mtitle
    body.innerHTML = mmsg
    btn.classList.add(mcolor)

    $(document).ready( () => {
        $("#myModal").modal('show')
    })
    
}

$(document).ready(function(){
    getTablesList()
    getExpenses()

    google.charts.load('current',{'packages':['corechart']})
    google.charts.setOnLoadCallback(buildChart)
})