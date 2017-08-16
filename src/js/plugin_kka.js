(function($) {



console.log('진입22');




var for_ieUA = Class.create({
    "init" : function (attrStr) {
        console.log('진입');
        var userAgent = navigator.userAgent.toLowerCase();

                    var $objInp = $("input[type=text]"),
                        ieAddClass = 'forieip',
                        //attrStr = 'placeholder';
                        this.attrStr = attrStr;
                        this.testaa();


},
"testaa" : function(){
    if (userAgent.indexOf('msie') != -1){
        var tUA = userAgent,
                version = 0;

            tUA = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(tUA);
            varsion =  parseInt(tUA[1]);
            console.log(varsion);

                if(varsion <= 9) {
                this.injie9();
                };

    }else{
        return;
    }

},
"injie9" : function(){

    // value에 palceholder class와 string 삽입.
    if ($objInp.length > 0 ) {
        console.info('ie9를 위한 placeholder.');
        $objInp.each(function(index,element){
            var p;

            if(p = $(this).attr(attrStr)){
                $(this).val(p).addClass(ieAddClass);
            };
        });

    } else {
        return;
    }

},
"setFocs" : function () {

},
"hasTagnode" : function () {

}
});
var cat = new for_ieUA('placeholder');
cat.testaa();






    //
    //
    //
    //
    // function injie911(){
    //
    //
    //
    // };
    // //end ie 9
    //
    //
    //
    // function textinput_st(){
    //
    //
    // };
    //





})(jQuery);
