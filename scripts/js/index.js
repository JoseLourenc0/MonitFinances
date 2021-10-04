const addExpense = () => {
    
    let description = document.getElementById('description').value
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

            console.log(e)

            if(e===1){
                buildModal('Success','New Reg created','btn-success')
                document.getElementById('description').value = ''
                document.getElementById('value').value = ''
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
                    <option value = "${element.table}">
                        ${element.tab}
                    </option>
                `
            })
            
        }

    })

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
})