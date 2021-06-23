
// cách chọn 1 element để viết hàm onlick chứ không phải viết trực tiếp onclick="app.deleteIncom" trên thẻ i



var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
var add_description = $('.add-description')
var value = $('.value')
var btnAdd = $('.btnAdd')
var list_income = $('.list-income')
var select_feature = $('.select-feature')


const app = {

    isFeature: true,
    
    list_income_data: [

    ],

    list_expense_data: [
    ],


    handleEvents: function () {
        const _this = this

        
        select_feature.onclick = function () {
            if(select_feature.value == '+'){
                _this.isFeature = true
            }else{
                _this.isFeature = false
            }
            
        }

        btnAdd.onclick = function () {
            if (add_description.value == '' || value.value == ''){
                alert('Bạn chưa nhập thông tin !!!')
            }else{
                var flagInt = Number.isInteger(Number.parseFloat(value.value)) 
                var stringValue = value.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")// Thêm dấu phẩy ngăn cách
                if (flagInt){
                    stringValue = stringValue + ".00"
                }else{
                    stringValue = stringValue
                }
    
                if (_this.isFeature == true) {
                    _this.addIncome(add_description.value, stringValue)
                    _this.renderListIncome()
                    _this.renderShowIncome()
                    _this.renderShowExpense()
                    
                }else {
                    _this.addExpense(add_description.value, stringValue)
                    _this.renderListExpense()
                    _this.renderShowExpense()
                }

                add_description.value = ''
                value.value = ''
                _this.renderBudget()
            }
            

        }
    },

    addIncome: function (title,monney) {
        var data = {
            title: title, 
            monney: monney,
        }
        this.list_income_data.push(data)
        
    },

    addExpense: function (title,monney) {
        var data = {
            title: title, 
            monney: monney,
        }
        this.list_expense_data.push(data)
        
    },

    deleteIncome: function (ind) { // xóa danh sách
        this.list_income_data.splice(ind, 1)
        this.renderListIncome()
        this.renderShowIncome()
        this.renderBudget()
        this.renderShowExpense()
    },

    deleteExpense: function (ind) { // xóa danh sách
        this.list_expense_data.splice(ind, 1)
        this.renderListExpense()
        this.renderShowExpense()
        this.renderBudget()
    },

    totalIncome: function(){
        
        let totalNumber =  this.list_income_data.reduce((totalIncome, data) =>{
            return totalIncome + Number.parseFloat(data.monney.replace(/,/g, '')) // Chuyên chuỗi đã cho thành dạng số
        },0)

        return totalNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    },
    renderShowIncome: function() {
        $('.income').innerHTML =  `${this.totalIncome()}`
    },

    totalExpense: function(){

        
        let totalNumber =  this.list_expense_data.reduce((totalExpense, data) =>{
            return totalExpense + Number.parseFloat(data.monney.replace(/,/g, '')) // Chuyên chuỗi đã cho thành dạng số
        },0)
        return totalNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    },

    // percentExpense: function(){
    //     let totalIncome = Number.parseFloat(this.totalIncome().replace(/,/g, ''))  
    //     let totalExpense = Number.parseFloat(this.totalExpense().replace(/,/g, ''))  
    //     if (totalIncome == 0){
    //         return 0
    //     }else{
    //         return Math.round(totalExpense / totalIncome * 100) 
    //     }   
    // },

    percentExpense: function(){
        this.renderListIncome()
        this.renderListExpense()
        result = 0
        for (var i = 0 ; i< this.list_expense_data.length ; i++){       
            result +=this.percentExpenseList(i)
            // console.log(this.percentExpenseList(i))
        }
        return result
    },

    // 
    percentExpenseList: function (ind){
       let totalIncome = Number.parseFloat(this.totalIncome().replace(/,/g, ''))  
       let totalExpenseList = Number.parseFloat(this.list_expense_data[ind].monney.replace(/,/g, '')) 
        if (totalIncome == 0){
            return 0
        }else{
            return Math.round(totalExpenseList / totalIncome * 100) 
        }
    },




    renderShowExpense: function() {
        $('.expense').innerHTML =  `
            ${this.totalExpense()}
            <i class="percent">${this.percentExpense()}%</i>
        `
    },


    totalBudget: function () {
        let totalIncome = Number.parseFloat(this.totalIncome().replace(/,/g, ''))  
        let totalExpense = Number.parseFloat(this.totalExpense().replace(/,/g, ''))  
        let totalBudget = totalIncome - totalExpense
        return totalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    renderBudget: function() {
        $('.budget').innerHTML =  `${this.totalBudget()}`
    },

    renderListIncome: function () {
        const htmls  = this.list_income_data.map((data,index) => {
            return ` 
            <div class="list-child-income" data-index ='${index}' >
                <p class="list-title" >
                     ${data.title}
                </p>
                <p class="list-number-income ">
                    + ${data.monney}
                    <i  onclick="app.deleteIncome(${index})" id = "testID" class="ti-close close-icon-income"></i>
                </p>
            </div>
            `
        }) 
        $('.list-income').innerHTML =  htmls.join('')
        
    },


    renderListExpense: function () {
        const htmls  = this.list_expense_data.map((data,index) => {
            return ` 
            <div class="list-child-expense" data-index ='${index}'>
                <p class="list-title" >
                     ${data.title}
                </p>
                <p class="list-number-expense">
                    - ${data.monney}
                    <i class="percentListExpense">${this.percentExpenseList(index)}%</i>
                    <i onclick="app.deleteExpense(${index})" class="ti-close close-icon-expense"></i>
                </p>
            </div>
            `
        }) 
        $('.list-expense').innerHTML = htmls.join('')
    },

    start: function() {
        this.handleEvents()

    },


}
app.start()

