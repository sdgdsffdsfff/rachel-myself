define(['app/lib/validate', 'module', 'require', 'exports','zepto.temp'], function(formValidator, module, require, exports, temp){

    var validator = new FormValidator('example_form', [{
        name: 'req',
        display: 'required',
        rules: 'required'
    }, {
        name: 'alphanumeric',
        rules: 'alpha_numeric|required'
    }, {
        name: 'password',
        rules: 'required'
    }, {
        name: 'password_confirm',
        display: 'password confirmation',
        rules: 'required|matches[password]'
    }, {
        name: 'email',
        rules: 'valid_email'
    }, {
        name: 'minlength',
        display: 'min length',
        rules: 'min_length[8]'
    }], function(errors) {
        if (errors.length > 0) {
            // Show the errors
            console.log(errors);
        }
    });

//    console.log(temp('test_tmpl', {users: [{
//        name: 'name1', url: 'url1'
//    },{
//        name: 'name2', url: 'url2'
//    }]}));

    console.log(temp("<%=user%>", {user: 'test'}));

});

