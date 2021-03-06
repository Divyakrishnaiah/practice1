$(document).ready(function() {
    $("#compare").click(function(event) {
        $.ajax({
            data : {
                include : $("#incSyx").val(),
                exclude : $("#exSyx").val()
            },
            type : 'POST',
            url : '/compare',
            success : function(data) {
                data = JSON.parse(data)
                $('#result').val(data.result)
                $('#result').css('height','90%')
            }
        })
    });

    $("#fmissing").click(function(event) {
        $.ajax({
            data : {
                dockeys : $('#docKwds').val(),
                modelsyx : $('#msSyx').val()
            },
            type : 'POST',
            url : '/getmissingkeys',
            success : function(data) {
                data = JSON.parse(data);
                $('#mresult').val(data.result)
                $('#mresult').css('height', '90%')
            }
        })
    });

    $("#asinmissing").click(function(event) {
        $.ajax({
            data : {
                doc : $('#docAsin').val(),
                mod : $('#msAsin').val()
            },
            type : 'POST',
            url : '/findasin',
            success : function(data) {
                data = JSON.parse(data);
                const res = data.result.toString().replace(/,/g,'\n');
                $('#missres').val(res);
            }
        })
    });

    $('#checksp').click(function(event) {
        $.ajax({
            data : {
                syntax : $('#spSyx').val()
            },
            type : 'POST',
            url : '/syntaxcheck',
            success :function(data) {
                data = JSON.parse(data);
                $('#spresult').html(data.result)
            }
        })
    });

    $('#replacep').click(function(event) {
        $.ajax({
            data : {
                syntax : $('#spSyx1').val()
            },
            type : 'POST',
            url : '/replace',
            success :function(data) {
                data = JSON.parse(data);
                $('#spresult1').html(data.result)
            }
        })
    });


    $('#attrscheck').click(function(event) {
        $.ajax({
            data : {
                attributes : $('#attrs').val(),
                attrsyx : $('#attrSyx').val()
            },
            type : 'POST',
            url : '/spellcheck',
            success : function(data){
                data = JSON.parse(data)
                //console.log(data.result)
                dstring = ""
                for(let i = 0 ; i<data.result.length;i++){
                    key = Object.keys(data.result[i])[0];
                    dstring+= key + " : <span style='background-color: yellow'>" + data.result[i][key] + "</span><br /><br />";
                }
                $('#attrresult').html(dstring)
            }
        })
    });

    

    $(document).ready(function(){
        $.ajax({
            type:'GET',
            url: '/loadattrs',
            success: function(data){
                $('#attrs').val(data);
                $('#attrs').attr("readonly", true)
            }
        })
    });
});