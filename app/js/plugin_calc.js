(function($) {

    $.fn.calc = function(){        
    // css  
    $('head').append('<link rel="stylesheet" href="css/plugin-styles.css" type="text/css" />');   
        var selectClass = "."+$(this).attr("class"); 
        //alert(selectClass);
        $(this).append(
            '<div class="calculator"></div>'            
        );
        
        $(".calculator").html(  //так можна???
            '<div class="scoreboard"> </div>' +
            '<div class="adOperators"> </div>' +
            '<div class="buttonBar"> </div>'
            
        );
        // ajaj
        $.getJSON('json_buttons.json', function (data) {
            console.log(data);
            $.each(data.inputs, function (key, input) {
                var result = "<input id=" + input.id + ">"
                $(selectClass+ " .scoreboard").append(result);
                
            });

            $.each(data.operatorButtons, function (key, button) {
                var result = "<button type=button value="+button.value +" id=" + button.id + ">" + button.value + "</button>"
                
                $(selectClass + " .adOperators").append(result);
            });

            $.each(data.buttons, function (key, button) {
                var result = "<button type=button value="+button.value +" id=" + button.id + ">" + button.value + "</button>"
                $(selectClass+ " .buttonBar").append(result);
            });

        });
                
        return this.each( function() {  
            var ths = $(this);
            ths
            .css({
                // написати якісь стилі  
            })
            
            function CalcInit(){ //весь функціонал                 
                //var bla = $('#txt_name').val();
            var input = $(selectClass+ " #scoreboard");               
            var topBar = $(selectClass+ " #top-bar");
          
            var Calc = {
                result   : 0,
                memory   : 0,
                firstNum : 0,
                lastOper : "",
                secondNum: 0,

                add : function(){
                    Calc.calculate();
                    Calc.lastOper = "+";
                    Calc.printResult();       
                },

                sub : function() {
                    Calc.calculate();  
                    Calc.lastOper = "-";
                    Calc.printResult(); 
                },

                mult: function() {
                    Calc.calculate(); 
                    Calc.lastOper = "*";
                    Calc.printResult();   
                },

                divide: function() {
                    Calc.calculate();
                    Calc.lastOper = "/";
                    Calc.printResult();     
                },

                pow: function() {
                    Calc.result = +input.val() * +input.val();
                    Calc.lastOper = "²"; 
                    Calc.printResult(); 
                },

                sqrt: function() {
                    Calc.result = Math.sqrt(+input.val(),2);
                    Calc.lastOper = "√";
                    Calc.printResult(); 
                },
                perc: function() {
  
                },

                calculate : function(){
                    Calc.secondNum = +input.val();    
                    switch (Calc.lastOper){
                        case "" : Calc.result = +input.val();    break; 
                        case "+": Calc.result += +Calc.secondNum;  break;
                        case "-": Calc.result -= Calc.secondNum;  break;
                        case "*": Calc.result *= Calc.secondNum;  break;
                        case "/": Calc.result /= Calc.secondNum;  break;                        
                    }   
                    console.log("res "+Calc.result);
                    console.log("sec "+Calc.secondNum);
                },

                printResult: function(){
                    input.val(""); 
                    if( Calc.lastOper == "²" || Calc.lastOper == "√"){
                    topBar.val(Calc.result);
                    }
                    else 
                    topBar.val(Calc.result + Calc.lastOper);
                    
                },

                equal : function(){
                    switch (Calc.lastOper){
                        case "+": Calc.add(); break;
                        case "-": Calc.sub(); break;
                        case "*": Calc.mult(); break;
                        case "/": Calc.divide(); break;
                        case "²": Calc.pow(); break;
                        case "√": Calc.sqrt(); break;              
                        default : input.val("ERROR");
                    }
                    Calc.lastOper = ""; 
                    topBar.val("");
                    input.val( Calc.result );//
                },

                backspace : function(){
                    input.val(input.val().slice(0, -1));
                },

                sign : function(){
                    input.val(input.val() * -1);    
                },

                clean : function(){
                    topBar.val("");
                    input.val("");
                    Calc.firstNum = 0;
                    Calc.result = 0;
                    Calc.lastOper = "";
                }
            };

            console.log("result " + Calc.result);

            for (var i = 0; i < 10; i++) {
                    $(selectClass+ " #num"+i).on("click",function() {
                    var newInput = input.val() + $(this).attr("value"); 
                    input.val(newInput);
                });
            }
                
            $(selectClass+ " #dot").on("click", function(){
                    input.val(input.val()+".");
            });
            $(selectClass + " #clean").on("click", Calc.clean);
            $(selectClass + " #sign").on("click", Calc.sign);
            $(selectClass + " #backspace").on("click", Calc.backspace);

            $(selectClass + " #plus").on("click", Calc.add);  
            $(selectClass + " #sub").on("click", Calc.sub); 
            $(selectClass + " #mult").on("click", Calc.mult);
            $(selectClass + " #divide").on("click", Calc.divide);
            $(selectClass + " #pow").on("click", Calc.pow); 
            $(selectClass + " #perc").on("click", Calc.perc); 
            $(selectClass + " #sqrt").on("click", Calc.sqrt); 

            $(selectClass + " #equal").on("click", Calc.equal);
                
            }            
                $(window).on('load', function() {
                    CalcInit();
                });              
                $("*").on('resize', function() {
                    CalcInit(); //ініціалізація при перевороті екрану
                });
            });    
    };

})(jQuery);
 