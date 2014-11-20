define(['jquery',
    'backbone',
    'underscore',
    'js/admin/forms/aAddWSRecordForm'
    ],function($,Backbone,_,aAddWSRecordForm){

        "use strict"

        var aAddWSRecordView = Backbone.View.extend({
            initialize:function(options){
                this.form = options.form || undefined 
                _.bindAll(this,'render','formSubmit')
                this.render() // Render on initialization to define the form variable
                this.formSubmit() // Render the event
            },

            events:{
                'click button#submit': 'formSubmit',
            },


            formSubmit: function(){
                    var that = this;
                    // Form validations
                    that.form.on('submit', function(event) {
                        event.preventDefault();
                        var errors = that.form.validate()
                                // Remove error classes
                                if (errors) { // Show the errors
                                    $.each(errors, function(error) {
                                        $("#" + error).attr('placeholder',errors[error].message)
                                        .parent().addClass('has-error')
                                    });
                                }
                                // If no errors. Do form commit which saves the
                                else {  
                                    var data = that.form.getValue()
                                    $.ajax({
                                        type:'POST',
                                        url: contextUrl2+'/admin/inventory/addWholeSaleRecord',
                                        data: "beanList=" + that.convertData(data),
                                        success:function(message){
                                            if(message){
                                                $('#form-messages').css('display','block').html('<div class="alert alert-success" style="font-weight:bold;margin: 10px 65px 0px;font-size: 12px;">New Record added successfully!</div>').delay(5000).fadeOut('slow');
                                                setTimeout(function(){admin.navigate('wholesale/orders',true)},2000)
                                            }else{
                                                $('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;font-weight:bold;">Adding new record failed!</div>').delay(5000).fadeOut('slow');
                                            }
                                        }
                                    })
                                }

                            })
            },
            convertData: function(data) {
                var that = this;
                var c = {};
                c.beanList = [];
                var p = {};
                p.productName = data.productName;
                p.qtySent = data.qtySent || 0;
                p.qtySold = data.qtySold  || 0;
                p.sellingPrice = data.sellingPrice  || 0;
                c.beanList.push(p);
                return JSON.stringify(c.beanList[0]);
            },

            render:function(){
                this.form = new aAddWSRecordForm.aAddWSRecordForm() // Render form on success
                return this
            }


        })

return {
    aAddWSRecordView: aAddWSRecordView
}
})